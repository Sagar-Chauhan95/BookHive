import { Schema, model, InferSchemaType } from "mongoose";


const LoginSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true }
});
export type LoginType = InferSchemaType<typeof LoginSchema>;

export const LoginModel = model<LoginType>('user', LoginSchema);