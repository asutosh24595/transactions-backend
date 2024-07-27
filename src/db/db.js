import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/transactionsDb");
    console.log("Connected to database");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDb;
