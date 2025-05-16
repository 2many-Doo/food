import { connect } from "mongoose";

export const connecDatabase = async () => {
  try {
    const dbConnectString = process.env.MONGODB_CONNECT_STRING;

    // console.log("🔍 DB STRING:", dbConnectString); // шалгах log

    if (!dbConnectString) {
      throw new Error("❌ MONGODB_CONNECT_STRING is undefined");
    }

    await connect(dbConnectString);
    console.log("✅ Successfully connected to MongoDB");
  } catch (error) {
    console.error(
      "❌ MongoDB connection error:",
      error instanceof Error ? error.message : error
    );
  }
};
