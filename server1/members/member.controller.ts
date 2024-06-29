import { RequestHandler } from "express";

import { MemberModel } from "./memberSchema";


export const get_members: RequestHandler<unknown, unknown, unknown, { residentID: string; }> = async (req, res, next) => {
    try {
        const { residentID } = req.query;
        if (residentID) {
            const response = await MemberModel.find({ residentID });
            res.json(response);
        } else {
            const response = await MemberModel.find({});
            if (response) {
                res.json(response);
            }

        }


    } catch (error) {
        console.log("Server error", error);
    }
};

export const post_members: RequestHandler<unknown, unknown,
    { firstname: string, lastname: string, residentID: string, phone: string, email: string; address: string; },
    unknown> = async (req, res, next) => {
        try {
            const { firstname, lastname, residentID, phone, email, address } = req.body;
            const response = await MemberModel.create({ firstname, lastname, residentID, phone, email, address });
            if (response) {
                res.json(response);
            }

        } catch (error) {
            console.log("Server Error", error);
        }
    };

export const get_member: RequestHandler<{ member_id: string; }, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const { member_id } = req.params;

        const response = await MemberModel.find({ _id: member_id });
        if (response) {
            res.json(response);
        }


    } catch (error) {
        console.log("Server Error", error);
    }
};

export const edit_member: RequestHandler<{ member_id: string; }, unknown,
    { residentID: string, firstname: string, lastname: string, phone: string, email: string; address: string; },
    unknown> = async (req, res, next) => {
        try {
            const { member_id } = req.params;
            const { firstname, lastname, phone, email, address } = req.body;
            const response = await MemberModel.updateOne({ _id: member_id }, { $set: { firstname, lastname, phone, email, address } });
            if (response.modifiedCount) {
                res.json(response);
            }

        } catch (error) {
            console.log("Server Error", error);
        }
    };

export const delete_member: RequestHandler<{ member_id: string; }, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const { member_id } = req.params;
        const response = await MemberModel.deleteOne({ _id: member_id });
        if (response.deletedCount) {
            res.json(response.deletedCount);
        }


    } catch (error) {
        console.log("Server Error", error);
    }
};
