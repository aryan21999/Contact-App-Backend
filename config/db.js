const mongoose = require('mongoose');
// const db = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Aryan:09876Arya@cluster0.h0l2c.mongodb.net/chat?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology:true
    });

    console.log('MongoDb connected !');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
