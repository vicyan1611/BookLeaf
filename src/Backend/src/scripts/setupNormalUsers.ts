import mongoose from "mongoose";
import { NormalUser } from '../models/NormalUser';

const MONGODB_URI = "mongodb://localhost:27017/bookleaf";

const sampleUser = [
    {
        username: 'ketamean',
        password: 'Hehehe@123!',
        email: 'tttoan22@clc.fitus.edu.vn',
        createDate: '11/12/2024',
        avatar: '/',
    },
    {
        username: 'roke',
        password: 'Jz3123hihi!',
        email: 'ptyquyen22@clc.fitus.edu.vn',
        createDate: '11/12/2024',
        avatar: '/',
    },
]

export async function setupNormalUsers() {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log("Connected to MongoDB successfully");

      // await mongoose.connection
      //   .collection('normalusers')
      //   .drop()
      //   .catch(() => {
      //     console.log("No existing users collection to drop");
      //   })
      
      const insertedUsers = await NormalUser.insertMany(sampleUser)
      console.log(`Successfully inserted ${insertedUsers} user(s).`)
      await mongoose.disconnect();
    } catch (err) {
        console.log(err)
        await mongoose.disconnect();
    }
}