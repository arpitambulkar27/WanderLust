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
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://images.pexels.com/photos/46160/field-clouds-sky-earth-46160.jpeg",
      set: (v) =>
        v === "" || v == null
          ? "https://images.pexels.com/photos/46160/field-clouds-sky-earth-46160.jpeg"
          : v,
    },
  },

  price: Number,
  location: String,
  country: String,

  review: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.review } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
