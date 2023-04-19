const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `MongoDB Successfully Connected: ${connect.connection.host}`.cyan
        .underline
    );
  } catch (error) {
    console.log(`Error is: ${error.message}`.red.bold);
    process.exit();
  }
};

module.exports = connectDB;
