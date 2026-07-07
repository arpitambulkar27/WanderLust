if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

const dbUrl = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbUrl);
  console.log("Connected to DB");

  await initDB();
  mongoose.connection.close();
}

const initDB = async () => {
  await Listing.deleteMany({});

  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "69f0cb5d2cb6cc2593fd3fb5",
  }));

  await Listing.insertMany(initData.data);
  console.log("Data was inserted");
};

main().catch(console.log);
