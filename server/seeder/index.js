const { Seeder } = require("mongo-seeding");
const path = require("path");
const config = {
<<<<<<< HEAD
  database: "mongodb://localhost:27017/neuromarket",
  dropDatabase: false,
=======
  database: {
    protocol: "mongodb",
    host: "localhost",
    port: 27017,
    name: "neuromarket",
    username: undefined,
    password: undefined
  },
  dropDatabase: true
>>>>>>> 3ee096dc8a7d0554d765e175683e75f2f662e484
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
