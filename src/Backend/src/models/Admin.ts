import {IUser, UserSchema} from './User'
import mongoose, {Schema} from 'mongoose'

interface IAdmin extends IUser {}
const AdminSchema = new Schema<IAdmin>(UserSchema)

export const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);