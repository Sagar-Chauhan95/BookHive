
import { Schema, InferSchemaType, model } from "mongoose";

const CatalogSchema = new Schema({
    bookId: { type: String, required: true },
    numberOfCopies: { type: Number, required: true },
    availableCopies: { type: Number, required: true }
});

export type CatalogType = InferSchemaType<typeof CatalogSchema>;

export const CatalogModel = model<CatalogType>('catalog', CatalogSchema);