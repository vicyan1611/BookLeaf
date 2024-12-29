import {IUser, UserSchema} from './User'
import mongoose, {Schema} from 'mongoose'

export interface INormalUser extends IUser {}
const NormalUserSchema = new Schema<INormalUser>(UserSchema)
export const NormalUser = mongoose.model<INormalUser>('NormalUser', NormalUserSchema)