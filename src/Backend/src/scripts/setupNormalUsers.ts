import mongoose from "mongoose";
import { NormalUser } from "../models/NormalUser";
import { config } from "dotenv";
config();

const sampleUser = [
	{
		username: "ketamean",
		password: "Hehehe@123!",
		email: "tttoan22@clc.fitus.edu.vn",
		createDate: "11/12/2024",
		avatar: "/",
        verified: true
	},
	{
		username: "roke",
		password: "Jz3123hihi!",
		email: "ptyquyen22@clc.fitus.edu.vn",
		createDate: "11/12/2024",
		avatar: "/",
        verified: true
	},
];

export async function setupNormalUsers() {
	try {
		await mongoose.connect(process.env.MONGODB_URI as string);
		console.log("Connected to MongoDB successfully");
		const insertedUsers = await NormalUser.insertMany(sampleUser);
		console.log(`Successfully inserted ${insertedUsers} user(s).`);
		await mongoose.disconnect();
	} catch (err) {
		console.log(err);
		await mongoose.disconnect();
	}
}
