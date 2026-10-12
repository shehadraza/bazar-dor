import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// Fixes "querySrv ECONNREFUSED" on some networks
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const url = process.env.MONGODB_URL || process.env.MONGODB_URI;
const client = new MongoClient(url);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: { enabled: true, autoSignIn: false },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
});