import mongoose from "mongoose";

const mongodbUri = process.env.MONGODB_URI;

console.log(`Connecting to ${mongodbUri}`);
mongoose.connect(mongodbUri);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));
