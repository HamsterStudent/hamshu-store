import { MongoClient } from "mongodb";

let connectDB: any;
let globalWithMongo = global as typeof globalThis & {
  mongoClient: MongoClient;
};
const MOGO_DB_URL = "<URL>";

async function setMognoConnect() {
  if (process.env.NODE_ENV === "development") {
    if (!globalWithMongo.mongoClient) {
      globalWithMongo.mongoClient = await new MongoClient(
        MOGO_DB_URL,
      ).connect();
    }
    connectDB = globalWithMongo.mongoClient;
  } else {
    connectDB = await new MongoClient(MOGO_DB_URL).connect();
  }
  await setMognoConnect();
}

export { connectDB };
