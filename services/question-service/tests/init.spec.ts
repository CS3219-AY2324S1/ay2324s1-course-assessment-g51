import mongoUnit from "mongo-unit";
import mongoose from "mongoose";

mongoUnit.start().then(async () => {
  console.log(`MongoDB in memory server started: ${mongoUnit.getUrl()}`);
  process.env.MONGODB_URI = mongoUnit.getUrl();
  await mongoUnit.drop();
  await mongoose.connect(process.env.MONGODB_URI);
  run();
});

after(async () => {
  console.log("Stopping MongoDB in memory server");
  await mongoose.disconnect();
  return mongoUnit.stop();
});
