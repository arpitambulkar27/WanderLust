const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
});


const Listing = mongoose.model("Listing",listingSchema);

module.exports=Listing;