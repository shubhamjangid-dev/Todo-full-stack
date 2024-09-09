import mongoose from "mongoose";
import DB_NAME from "../constants.js";

const connectToMongoBD = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URL}/${DB_NAME}`);
    console.log(`MongoDb is connected successfully --> ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDb connection failed :" + error);
  }
};
export default connectToMongoBD;
