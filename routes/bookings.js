const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookings.js");
const { isLoggedIn } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");

router.get("/", isLoggedIn, wrapAsync(bookingController.showBookings));

router.delete(
  "/:bookingId",
  isLoggedIn,
  wrapAsync(bookingController.deleteBooking),
);

module.exports = router;
