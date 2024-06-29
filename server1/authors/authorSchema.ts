import { Schema, model, InferSchemaType } from "mongoose";


const AuthorSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
});


export type AuthorType = InferSchemaType<typeof AuthorSchema>;
export const AuthorModel = model<AuthorType>('author', AuthorSchema);