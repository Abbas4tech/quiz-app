import mongoose from "mongoose";

import { env } from "@/lib/env";

type conntectionObj = {
  isConnected?: number;
};

const connection: conntectionObj = {};

const dbConnect = async (): Promise<void> => {
  if (connection.isConnected) {
    console.warn("Already Connected to Database!!");
    return;
  }
  try {
    const db = await mongoose.connect(env.MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
    console.warn("Conntected to Database!");
  } catch (error) {
    console.error("Error occured in connecting database : ", error);
    process.exit(1);
  }
};

export default dbConnect;
