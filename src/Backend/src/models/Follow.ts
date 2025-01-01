import mongoose, { Schema, Document, model} from "mongoose";

export interface IFollow extends Document {
    follower: string;
    followed: string;
    createDate: string;
}

export const FollowSchema = {
    follower: {type: String, required: true},
    followed: {type: String, required: true},
    createDate: {type: String, required: true},
}

const FollowSchemaInstance = new Schema<IFollow>(FollowSchema)
export const Follow = mongoose.model<IFollow>('follow', FollowSchemaInstance)