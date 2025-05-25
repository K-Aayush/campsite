export const dynamic = "force-dynamic";
import mongoose from "mongoose";

const MONGODB_URI: string =
  process.env.MONGO_URI || "your-default-fallback-uri";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connected");
    return cached.conn;
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err;
  }
}

export default dbConnect;

// export const dynamic = "force-dynamic";
// import mongoose from "mongoose";

// const MONGODB_URI: string =
//   process.env.MONGO_URI ||
//   "mongodb+srv://root123:root123@cluster0.dkcytdr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable");
// }

// /**
//  * Simple database connection function
//  * Creates a new connection on each call
//  */
// async function dbConnect() {
//   try {
//     const connection = await mongoose.connect(MONGODB_URI, {
//       bufferCommands: false,
//       serverSelectionTimeoutMS: 5000,
//       socketTimeoutMS: 45000,
//       maxPoolSize: 10,
//       minPoolSize: 5,
//     });

//     console.log("MongoDB connected successfully");
//     return connection;
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     throw error;
//   }
// }

// export default dbConnect;
