import mongoose from "mongoose";

const url =
  process.env.MONGO_URI || "mongodb://localhost:27017/question-service-api";

console.log(`Connecting to ${url}`);
try {
  mongoose.connect(url);
  console.log(`Connected to MongoDB at ${url}`);
} catch (error) {
  console.error(`Failed to connect to MongoDB: ${error}`);
}
