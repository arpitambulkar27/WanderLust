const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  image: {
    url: String,
    filename: String,
  },

  price: Number,
  location: String,
  country: String,
  category: {
    type: String,
    enum: [
      "trending",
      "beach",
      "castles",
      "mountains",
      "farms",
      "cabins",
      "treehouses",
      "camping",
      "lakefront",
      "islands",
      "desert",
      "snow",
      "luxury",
      "historic",
      "amazing-views",
    ],
  },

  review: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.review } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
