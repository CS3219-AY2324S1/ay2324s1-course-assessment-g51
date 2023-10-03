import { MongoMemoryServer } from "mongodb-memory-server";
import { config } from "./utils/config";

const globalTeardown = async () => {
  if (config.Memory) {
    // Config to decided if an mongodb-memory-server instance should be used
    const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;
    await instance.stop();
  }
};

export default globalTeardown;
