const { Seeder } = require("mongo-seeding");
const path = require("path");
const config = {
  database:
    "mongodb://superAdmin:superadmin123@ds347665.mlab.com:47665/neuromarket",
  dropDatabase: true
};
const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(path.resolve("./data"));

const seedDB = async () => {
  try {
    logCollections(collections);
    await seeder.import(collections);
  } catch (err) {
    console.log("Error Seeding ---->", err);
  }
  console.log("Seeders Completed");
};

const logCollections = collections =>
  console.log(
    "Start Seeding ---->",
    collections.map(
      ({ name, documents }) => `${name} have ${documents.length} docs.`
    )
  );

seedDB();
