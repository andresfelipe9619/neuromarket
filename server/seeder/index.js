const { Seeder } = require("mongo-seeding");
const path = require("path");
const config = {
  database: "mongodb://localhost:27017/neuromarket",
  dropDatabase: false,
};
const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(path.resolve("./data"));

const seedDB = async () => {
  try {
    console.log("collections", collections);
    await seeder.import(collections);
  } catch (err) {
    // Handle errors
    console.log("err", err);
  }
  console.log("Seeders completed");
};

seedDB();
