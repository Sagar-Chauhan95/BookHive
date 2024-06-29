import { Schema, model, InferSchemaType } from "mongoose";

const BookSchema = new Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    category: { type: String, required: true },
    authorIDs: [ String ],
    publisherId: { type: String }

});

export type BookType = InferSchemaType<typeof BookSchema>;

export const BookModel = model<BookType>('book', BookSchema);