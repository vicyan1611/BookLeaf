import mongoose from "mongoose";
import { Verification } from "../models/Verification";
import { config } from "dotenv";
config();

export async function setupVerification() {
	try {
		await mongoose.connect(process.env.MONGODB_URI as string);
		console.log("Connected to MongoDB successfully");
        if ((await mongoose.connection.listCollections()).some((collection) => collection.name === "verifications")) {
            console.log("Verification collection already exists");
        }
		await Verification.createCollection();
		console.log("Created verification collection");
		await mongoose.disconnect();
	} catch (err) {
		console.log(err);
	}
}
