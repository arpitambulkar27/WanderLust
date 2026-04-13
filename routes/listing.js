const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error.details.map((e) => e.message).join(", "));
  }
  next();
};

// INDEX
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listing/index.ejs", { allListing });
  }),
);

// NEW
router.get("/new", (req, res) => {
  res.render("listing/new.ejs");
});

// SHOW
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const hotel = await Listing.findById(id).populate("review");
    if (!hotel) {
      req.flash("error", "Listing does not exist!");
      return res.redirect("/listings");
    }
    res.render("listing/show.ejs", { hotel });
  }),
);

// CREATE
router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res) => {
    const listingData = req.body.listing;
    const newListing = new Listing({
      ...listingData,
      image: {
        url:
          listingData.image ||
          "https://images.pexels.com/photos/46160/field-clouds-sky-earth-46160.jpeg",
        filename: "listingimage",
      },
    });
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  }),
);

// EDIT
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const hotel = await Listing.findById(id);
    if (!hotel) {
      req.flash("error", "Listing does not exist!");
      return res.redirect("/listings");
    }
    res.render("listing/edit.ejs", { hotel });
  }),
);

// UPDATE
router.put(
  "/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listingData = req.body.listing;
    await Listing.findByIdAndUpdate(id, {
      ...listingData,
      image: {
        url: listingData.image,
        filename: "listingimage",
      },
    });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  }),
);

// DELETE
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  }),
);

module.exports = router;
