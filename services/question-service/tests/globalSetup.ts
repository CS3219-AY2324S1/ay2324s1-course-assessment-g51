import { MongoMemoryServer } from "mongodb-memory-server";
import * as mongoose from "mongoose";

import { config } from "./utils/config";

const globalSetup = async () => {
  if (config.Memory) {
    // Config to decided if an mongodb-memory-server instance should be used
    // it's needed in global space, because we don't want to create a new instance every test-suite
    const instance = await MongoMemoryServer.create();
    const uri = instance.getUri();
    (global as any).__MONGOINSTANCE = instance;
    process.env.MONGODB_URI = uri.slice(0, uri.lastIndexOf("/"));
  } else {
    process.env.MONGODB_URI = `mongodb://${config.IP}:${config.Port}`;
  }

  // The following is to make sure the database is clean before an test starts
  const connection = await mongoose
    .createConnection(`${process.env.MONGODB_URI}/${config.Database}`)
    .asPromise();
  await connection.db.dropDatabase();
  await connection.close();
};

export default globalSetup;
