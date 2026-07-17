const path = require("path");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: path.resolve(__dirname, "../.env"),
  });
}

const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

const dbUrl = process.env.ATLASDB_URL;

if (!dbUrl) {
  throw new Error("ATLASDB_URL is missing. Check the .env file.");
}

async function main() {
  await mongoose.connect(dbUrl);
  console.log(`Connected to DB: ${mongoose.connection.name}`);

  await initDB();
  await mongoose.connection.close();
}

const initDB = async () => {
  await Listing.deleteMany({});

  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6a57c572ac6d69fab565c008",
  }));

  await Listing.insertMany(initData.data);
  console.log("Data was inserted");
};

main().catch(console.log);
