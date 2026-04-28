const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");
const { init } = require("../models/reviews.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
  console.log("Connected to DB");

  await initDB();
  mongoose.connection.close();
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "69de0323a039a955e5f71983",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data was inserted");
};

main().catch((err) => {
  console.log(err);
});
