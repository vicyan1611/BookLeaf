import mongoose, { Document, Schema } from "mongoose";

export interface IVerification extends Document {
    email: string;
    OTP: string;
    createDate: string;
    expireDate: string;
    used: boolean;
}

export const VerificationSchema = {
    email: {type: String, required: true},
    OTP: {type: String, required: true},
    createDate: {type: String, required: true},
    expireDate: {type: String, required: true},
    used: {type: Boolean, required: true, default: false},
}

const VerificationSchemaInstance = new Schema<IVerification>(VerificationSchema)

export const Verification = mongoose.model<IVerification>('verification', VerificationSchemaInstance)