import { RequestHandler } from "express";
import { BookModel } from "./bookSchema";


export const post_books: RequestHandler<unknown, unknown,
    { title: string, genre: string, category: string; },
    unknown> = async (req, res, next) => {
        try {

            const { title, genre, category } = req.body;
            const response = await BookModel.create({
                title, genre, category, authorIDs: [], publisherId: ''
            });


            if (response) {
                console.log(response);
                res.json(response);
            }
        } catch (error) {
            console.log("Connection Error", error);
        }
    };

export const get_books: RequestHandler<unknown, unknown, unknown, { title: string; }> = async (req, res, next) => {
    try {
        const { title } = req.query;
        if (title) {
            const response = await BookModel.find({ title });
            res.json(response);
        } else {
            const response = await BookModel.find({});
            if (response) {
                res.json(response);
            }
        }

    } catch (error) {
        console.log("Connection error", error);
    }
};

export const get_book: RequestHandler<{ book_id: string; }, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const { book_id } = req.params;
        const response = await BookModel.findOne({ _id: book_id });
        if (response) {
            res.json(response);
        }

    } catch (error) {
        console.log("Server Error", error);
    }
};

export const edit_book: RequestHandler<{ book_id: string; }, unknown,
    { title: string, genre: string, category: string, authorIDs: string[], publisherId: string; }, unknown> = async (req, res, next) => {
        try {
            const { book_id } = req.params;
            const { title, genre, category, authorIDs, publisherId } = req.body;
            const response = await BookModel.updateOne({ _id: book_id }, {
                $set: { title, genre, category, authorIDs, publisherId }
            });

            if (response.modifiedCount) {
                res.json(response);
            }

        } catch (error) {
            console.log("Server Error", error);
        }
    };


export const delete_book: RequestHandler<{ book_id: string; }, unknown,
    unknown, unknown> = async (req, res, next) => {
        try {
            const { book_id } = req.params;
            const response = await BookModel.deleteOne({ _id: book_id });
            if (response.deletedCount) {
                res.json(response);
            }

        } catch (error) {
            console.log("Server Error", error);
        }

    };