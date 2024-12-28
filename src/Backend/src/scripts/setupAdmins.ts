import mongoose from "mongoose";
import { Admin } from '../models/Admin';

const MONGODB_URI = "mongodb://localhost:27017/bookleaf";

const sampleUser = [
    {
        username: 'admin',
        password: 'KlkokE@dk2130!',
        email: 'truongthanhtoan2003@gmail.com',
        createDate: '11/12/2024',
        avatar: '/',
    }
]

export async function setupAdmins() {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log("Connected to MongoDB successfully");

      // await mongoose.connection
      //   .collection('normalusers')
      //   .drop()
      //   .catch(() => {
      //     console.log("No existing users collection to drop");
      //   })
      
      const insertedUsers = await Admin.insertMany(sampleUser)
      console.log(`Successfully inserted ${insertedUsers} user(s).`)
      await mongoose.disconnect();
    } catch (err) {
        console.log(err)
        await mongoose.disconnect();
    }
}