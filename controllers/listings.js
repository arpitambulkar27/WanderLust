const Listing = require("../models/listing");
const Booking = require("../models/booking");

module.exports.index = async (req, res) => {
  const { category, search } = req.query;
  let filter = {};

  if (category) {
    filter.category = category;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
      { country: { $regex: search, $options: "i" } },
    ];
  }

  const allListing = await Listing.find(filter);
  res.render("listing/index.ejs", { allListing, category, search });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listing/new.ejs");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const hotel = await Listing.findById(id)
    .populate({
      path: "review",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!hotel) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }
  const bookings = await Booking.find({listing:id});
  res.render("listing/show.ejs", { hotel,bookings });
};

module.exports.createListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
  const { id } = req.params;
  const hotel = await Listing.findById(id);
  if (!hotel) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }
  res.render("listing/edit.ejs", { hotel });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  const listingData = req.body.listing;
  let listing = await Listing.findByIdAndUpdate(id, {
    ...listingData,
    image: {
      url: listingData.image,
      filename: "listingimage",
    },
  });
  if (typeof req.file != "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
