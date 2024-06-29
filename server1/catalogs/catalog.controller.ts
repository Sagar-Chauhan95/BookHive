import { RequestHandler } from "express";

import { CatalogModel } from "./catalogSchema";


export const get_catalogs: RequestHandler<unknown, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const response = await CatalogModel.find({});
        if (response) {
            res.json(response);
        }

    } catch (error) {
        console.log("Server error", error);
    }
};

export const post_catalogs: RequestHandler<unknown, unknown,
    { bookId: string, availableCopies: number, numberOfCopies: number; },
    unknown> = async (req, res, next) => {
        try {
            const { bookId, availableCopies, numberOfCopies } = req.body;
            const response = await CatalogModel.create({ bookId, availableCopies, numberOfCopies });
            if (response) {
                res.json(response);
            }

        } catch (error) {
            console.log("Server Error", error);
        }
    };

export const get_catalog: RequestHandler<{ catalog_id: string; }, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const { catalog_id } = req.params;

        const response = await CatalogModel.find({ _id: catalog_id });
        if (response) {
            res.json(response);
        }


    } catch (error) {
        console.log("Server Error", error);
    }
};

export const edit_catalog: RequestHandler<{ catalog_id: string; }, unknown,
    { bookId: string, availableCopies: number, numberOfCopies: number; },
    unknown> = async (req, res, next) => {
        try {
            const { catalog_id } = req.params;
            const { bookId, availableCopies, numberOfCopies } = req.body;
            const response = await CatalogModel.updateOne({ _id: catalog_id }, { $set: { bookId, availableCopies, numberOfCopies } });
            if (response.modifiedCount) {
                res.json(response);
            }

        } catch (error) {
            console.log("Server Error", error);
        }
    };

export const delete_catalog: RequestHandler<{ catalog_id: string; }, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const { catalog_id } = req.params;
        const response = await CatalogModel.deleteOne({ _id: catalog_id });
        if (response.deletedCount) {
            res.json(response.deletedCount);
        }


    } catch (error) {
        console.log("Server Error", error);
    }
};
