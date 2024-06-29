import { RequestHandler } from "express";

import { PublisherModel } from "./publisherSchema";

export const get_publishers: RequestHandler<unknown, unknown, unknown, { email: string; }> = async (req, res, next) => {
    try {
        const { email } = req.query;
        if (email) {
            const response = await PublisherModel.find({ email });
            res.json(response);
        } else {
            const response = await PublisherModel.find({});
            if (response) {
                res.json(response);
            }
        }

    } catch (error) {
        console.log("Server error", error);
    }
};

export const post_publishers: RequestHandler<unknown, unknown, { name: string, phone: string, email: string, address: string; },
    unknown> = async (req, res, next) => {
        try {
            const { name, phone, email, address } = req.body;
            const response = await PublisherModel.create({ name, phone, email, address });
            if (response) {
                res.json(response);
            }

        } catch (error) {
            console.log("Server Error", error);
        }
    };

export const get_publisher: RequestHandler<{ publisher_id: string; }, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const { publisher_id } = req.params;

        const response = await PublisherModel.find({ _id: publisher_id });
        if (response) {
            res.json(response);
        }


    } catch (error) {
        console.log("Server Error", error);
    }
};

export const edit_publisher: RequestHandler<{ publisher_id: string; }, unknown,
    { name: string, phone: string, email: string, address: string; },
    unknown> = async (req, res, next) => {
        try {
            const { publisher_id } = req.params;
            const { name, phone, email, address } = req.body;
            const response = await PublisherModel.updateOne({ _id: publisher_id }, { $set: { name, phone, email, address } });
            if (response.modifiedCount) {
                res.json(response);
            }

        } catch (error) {
            console.log("Server Error", error);
        }
    };

export const delete_publisher: RequestHandler<{ publisher_id: string; }, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const { publisher_id } = req.params;
        const response = await PublisherModel.deleteOne({ _id: publisher_id });
        if (response.deletedCount) {
            res.json(response.deletedCount);
        }


    } catch (error) {
        console.log("Server Error", error);
    }
};
