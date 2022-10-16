import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

var mongoMemoryServer: MongoMemoryServer;

export const connect = async () => {
  mongoMemoryServer = await MongoMemoryServer.create();
  const uri = mongoMemoryServer.getUri();
  await mongoose.connect(uri);
};

export const closeDatabase = async () => {
  await clearDatabase();
  await mongoose.connection.close();
  await mongoMemoryServer.stop();
};

export const clearDatabase = async () => {
  for (const index in mongoose.connection.collections) {
    await mongoose.connection.collections[index].deleteMany({});
  }
};
