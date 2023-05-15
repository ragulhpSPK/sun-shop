import mongoose from "mongoose";
// const MONGODB_URL = process.env.MONGODB_URL;

export default async function dbconnect() {
  try {
    await mongoose.connect(
      "mongodb+srv://ragulhp:ragulhp2704@cluster0.h4z31tf.mongodb.net/sun?retryWrites=true&w=majority"
    );
  } catch (err) {
    console.log(err);
    return err;
  }
}
