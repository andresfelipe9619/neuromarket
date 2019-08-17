const { Seeder } = require('mongo-seeding');
const config = {
    database: {
      host: process.env.URLDB,
      port: 27017,
      name: 'neuromarket',
    },
    dropDatabase: false,
  };
const seeder = new Seeder(config);
const collections = require('')

const seedDB = () =>{
    try {
        await seeder.import(collections);
    } catch (err) {
        // Handle errors
    }
}

seedDB();