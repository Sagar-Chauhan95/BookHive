import { Schema, model, InferSchemaType } from "mongoose";

const MemberSchema = new Schema({
    residentID: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, requiredL: true },
    email: { type: String, required: true }

});


export type MemberType = InferSchemaType<typeof MemberSchema>;
export const MemberModel = model<MemberType>('member', MemberSchema);