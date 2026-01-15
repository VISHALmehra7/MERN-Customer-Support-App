import mongoose from "mongoose";

const Database_Connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
    console.log(`MongoDb connected : ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to Database : ", error);
  }
};

export default Database_Connection;
