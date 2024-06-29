import { RequestHandler } from "express";
import { AuthorModel } from "./authorSchema";


export const get_authors: RequestHandler<unknown, unknown, unknown, { email: string; }> = async (req, res, next) => {
    try {
        const { email } = req.query;
        if (email) {
            const response = await AuthorModel.find({ email });
            res.json(response);
        } else {
            const response = await AuthorModel.find({});
            if (response) {
                res.json(response);
            }

        }


    } catch (error) {
        console.log("Server error", error);
    }
};

export const post_authors: RequestHandler<unknown, unknown, { name: string, phone: string, email: string; },
    unknown> = async (req, res, next) => {
        try {
            const { name, phone, email } = req.body;
            const response = await AuthorModel.create({ name, phone, email });
            if (response) {
                res.json(response);
            }

        } catch (error) {
            console.log("Server Error", error);
        }
    };

export const get_author: RequestHandler<{ author_id: string; }, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const { author_id } = req.params;
        const response = await AuthorModel.find({ _id: author_id });
        if (response) {
            res.json(response);
        }


    } catch (error) {
        console.log("Server Error", error);
    }
};

export const edit_author: RequestHandler<{ author_id: string; }, unknown,
    { name: string, phone: string, email: string; },
    unknown> = async (req, res, next) => {
        try {
            const { author_id } = req.params;
            const { name, phone, email } = req.body;
            const response = await AuthorModel.updateOne({ _id: author_id }, { $set: { name, phone, email } });
            if (response.modifiedCount) {
                res.json(response);
            }

        } catch (error) {
            console.log("Server Error", error);
        }
    };

export const delete_author: RequestHandler<{ author_id: string; }, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const { author_id } = req.params;
        const response = await AuthorModel.deleteOne({ _id: author_id });
        if (response.deletedCount) {
            res.json(response.deletedCount);
        }


    } catch (error) {
        console.log("Server Error", error);
    }
};
