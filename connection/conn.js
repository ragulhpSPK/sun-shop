import mongoose from "mongoose";
const MONGODB_URL = process.env.MONGODB_URL;

export default async function dbconnect() {
  try {
    await mongoose.connect(MONGODB_URL);
  } catch (err) {
    console.log(err, "iygtkiuyt");
  }
}
