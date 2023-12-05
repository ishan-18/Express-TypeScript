import mongoose from "mongoose";
import logger from "../utils/common/logger";

export const connectDB = async () => {
    let MONGO_URI: string = process.env.MONGO_URI as string
    const conn = await mongoose.connect(MONGO_URI)

    logger.info(`MongoDB connected`.green.bold)
}