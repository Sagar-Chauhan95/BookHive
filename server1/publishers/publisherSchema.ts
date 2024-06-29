import { Schema, model, InferSchemaType } from "mongoose";

const PublisherSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true }
});

export type PublisherType = InferSchemaType<typeof PublisherSchema>;

export const PublisherModel = model<PublisherType>('publisher', PublisherSchema);