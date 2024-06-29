import { RequestHandler } from "express";

import { TransactionModel } from "./transactionSchema";


export const get_transactions: RequestHandler<unknown, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const response = await TransactionModel.find({});
        if (response) {
            res.json(response);
        }

    } catch (error) {
        console.log("Server error", error);
    }
};


export const post_transactions: RequestHandler<unknown, unknown,
    { bookId: string, memberId: string, borrowedDate: string, returnedDate: string; },
    unknown> = async (req, res, next) => {
        try {
            const { bookId, memberId, borrowedDate, returnedDate } = req.body;
            const response = await TransactionModel.create({ bookId, memberId, borrowedDate, returnedDate });
            if (response) {
                res.json(response);
            }

        } catch (error) {
            console.log("Server Error", error);
        }
    };

export const get_transaction: RequestHandler<{ transaction_id: string; }, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const { transaction_id } = req.params;

        const response = await TransactionModel.find({ _id: transaction_id });
        if (response) {
            res.json(response);
        }


    } catch (error) {
        console.log("Server Error", error);
    }
};

export const edit_transaction: RequestHandler<{ transaction_id: string; }, unknown,
    { bookId: string, memberId: string, borrowedDate: string, returnedDate: string; },
    unknown> = async (req, res, next) => {
        try {
            const { transaction_id } = req.params;
            const { bookId, memberId, borrowedDate, returnedDate } = req.body;
            const response = await TransactionModel.updateOne({ _id: transaction_id }, { $set: { bookId, memberId, borrowedDate, returnedDate } });
            if (response.modifiedCount) {
                res.json(response);
            }

        } catch (error) {
            console.log("Server Error", error);
        }
    };

export const delete_transaction: RequestHandler<{ transaction_id: string; }, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const { transaction_id } = req.params;
        const response = await TransactionModel.deleteOne({ _id: transaction_id });
        if (response.deletedCount) {
            res.json(response.deletedCount);
        }


    } catch (error) {
        console.log("Server Error", error);
    }
};
