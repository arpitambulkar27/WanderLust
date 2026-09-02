const Listing = require("../models/listing");
const Booking = require("../models/booking");
const { acquireLock, releaseLock } = require("../utils/redis");

module.exports.createBooking = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/listings");
  }

  const checkIn = new Date(req.body.booking.checkIn);
  const checkOut = new Date(req.body.booking.checkOut);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Business Rule 1
  if (checkIn < today) {
    req.flash("error", "Check-in date cannot be in the past.");
    return res.redirect(`/listings/${req.params.id}`);
  }

  // Business Rule 2
  if (checkOut <= checkIn) {
    req.flash("error", "Check-out date must be after check-in date.");
    return res.redirect(`/listings/${req.params.id}`);
  }

  // Redis Distributed Lock for concurrency control (Atomic SET NX PX)
  const checkInStr = checkIn.toISOString().split("T")[0];
  const checkOutStr = checkOut.toISOString().split("T")[0];
  const lockKey = `lock:listing:${req.params.id}:dates:${checkInStr}_${checkOutStr}`;
  const lockVal = `${req.user ? req.user._id : "guest"}_${Date.now()}`;

  const lockAcquired = await acquireLock(lockKey, lockVal, 5000);

  if (!lockAcquired) {
    req.flash(
      "error",
      "Another reservation for these dates is currently being processed. Please try again in a moment."
    );
    return res.redirect(`/listings/${req.params.id}`);
  }

  try {
    // Business Rule 3
    const existingBooking = await Booking.findOne({
      listing: req.params.id,
      checkIn: { $lt: checkOut },
      checkOut: { $gt: checkIn },
    });

    if (existingBooking) {
      req.flash("error", "These dates are already booked.");
      return res.redirect(`/listings/${req.params.id}`);
    }

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const numberOfNights = Math.ceil((checkOut - checkIn) / MILLISECONDS_PER_DAY);

    const subtotal = numberOfNights * listing.price;
    const gstTax = Math.round(subtotal * 0.18);
    const totalPrice = subtotal + gstTax;

    const newBooking = new Booking({
      listing: listing._id,
      guest: req.user._id,
      checkIn,
      checkOut,
      guests: req.body.booking.guests || 1,
      totalPrice,
    });

    await newBooking.save();

    req.flash("success", "Reservation confirmed! Enjoy your trip.");
    res.redirect("/bookings");
  } finally {
    await releaseLock(lockKey, lockVal);
  }
};


module.exports.showBookings = async (req, res) => {
  const bookings = await Booking.find({ guest: req.user._id }).populate(
    "listing",
  );

  res.render("bookings/index.ejs", { bookings });
};

module.exports.deleteBooking = async (req,res)=>{
  const {bookingId} = req.params;

  const booking = await Booking.findById(bookingId);

  if(!booking){
    req.flash("error","Booking not found");
  }

  if(!booking.guest.equals(req.user._id)){
    req.flash("error","You are not authorized.");
    return res.redirect("/bookings");
  }

  await Booking.findByIdAndDelete(bookingId);
  req.flash("success","Booking canceled successfully");
  res.redirect("/bookings");
}