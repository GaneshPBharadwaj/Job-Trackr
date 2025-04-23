import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URL;

export const connectMongoose = async() => {

    console.log("Mongo URL:", url);

    try {
        await mongoose.connect(url);
        console.log("mongoDB has been connected")
    } catch (error) {
        console.log(error)
    }
}