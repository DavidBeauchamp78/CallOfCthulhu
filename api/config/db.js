const mongoose = require('mongoose');
//allows use of values stored in the default.json.
const config = require('config');
//gets the URL value stored in default.json.
const db = config.get('mongoURI');

//async function for connecting to DB.
const connectDB = async () => {
  try {
    //options for deprication warnings.
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error.message);
    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;