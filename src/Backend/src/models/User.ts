import mongoose, { Schema, Document, model} from "mongoose";
export enum usertype {
    Admin, NormalUser
}
export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    createDate: string;
    avatar: string;
    verified: boolean;
}

export const UserSchema = {
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    createDate: {type: String, required: true},
    avatar: {type: String, required: false},
    verified: {type: Boolean, required: true, default: false},
}