import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
  if (process.env.DATABASE_URL === undefined) {
    throw new Error("DATABASE_URL is not set");
  }

  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL, { dbName: "coporatehub" });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
