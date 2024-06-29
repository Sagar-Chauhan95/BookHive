import { Schema, InferSchemaType, model } from "mongoose";

const TransactionSchema = new Schema({
    bookId: { type: String, required: true },
    memberId: { type: String, required: true },
    borrowedDate: { type: String, required: true },
    returnedDate: { type: String, required: true }

});


export type TransactionType = InferSchemaType<typeof TransactionSchema>;

export const TransactionModel = model<TransactionType>('transaction', TransactionSchema);