import dns from "node:dns";
import { MongoClient } from "mongodb";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const url = process.env.MONGODB_URL || process.env.MONGODB_URI;
console.log("Using:", url ? url.replace(/:([^@]+)@/, ":****@") : "NOTHING FOUND");

try {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
  await client.connect();
  await client.db().command({ ping: 1 });
  console.log("SUCCESS: MongoDB connected");
  await client.close();
} catch (e) {
  console.log("FAILED:", e.message);
}