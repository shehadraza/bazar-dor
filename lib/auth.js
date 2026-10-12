
import dns from "node:dns";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// Use public DNS resolvers for SRV lookups
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const url = process.env.MONGODB_URL || process.env.MONGODB_URI;

if (!url) {
  throw new Error("Missing MONGODB_URL or MONGODB_URI in .env");
}

const client = new MongoClient(url);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

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
