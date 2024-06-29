import { RequestHandler } from "express";
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import 'dotenv/config';

import { LoginModel, LoginType } from "./loginSchema";
import IUser from "../../frontend/types/user";
import { ErrorWithStatus } from "../types/error";


export const get_users: RequestHandler<unknown, unknown, unknown, { email: string; }> = async (req, res, next) => {
    try {
        const { email } = req.query;
        if (email) {
            const response = await LoginModel.find({ email });
            res.json(response);
        } else {
            const response = await LoginModel.find({});
            if (response) {
                res.json(response);
            }
        }


    } catch (error) {
        console.log("Server Error", error);
    }
};

export const post_users: RequestHandler<unknown, unknown, { name: string, email: string; }, unknown> = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        const response = await LoginModel.create({
            name, email
        });

        if (response) {
            res.json(response);
        }

    } catch (error) {
        console.log("Server Error", error);
    }
};

export const sign_up: RequestHandler<unknown, unknown, { name: string, email: string; }, unknown> = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        const userExist = await LoginModel.findOne({ email });
        if (userExist) {
            res.status(400).send({ error: "User Already Exist in server, try with new email and name" });
            return;
        }

        const saltRound = 10;
        const hashedPassword = await hash(name, saltRound);
        const user_DB = await LoginModel.create({
            name: hashedPassword,
            email
        });
        res.status(201).json(user_DB);

    } catch (error) {

        res.status(500).json({ error: "Unknown error occured while signing up" });
    }
};

export const sign_in: RequestHandler<unknown, unknown, { name: string, email: string; }, unknown> = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        const user_DB: any = await LoginModel.findOne({ email });

        if (!user_DB) {
            return res.status(404).json({ message: "User doesn't exist" });
        }

        const matchedUserName = await compare(name, user_DB.name);
        if (!matchedUserName) {
            return res.status(401).json({ message: "User name doesn't match" });
        }

        if (!process.env.PRIVATE_KEY) {

            return res.status(50).json({ message: "Private key doesn't exist" });
        }


        const { _id, name: userName, email: userEmail } = user_DB;
        const token = sign({ user_id: _id, name: userName, email: userEmail }, process.env.PRIVATE_KEY);
        res.status(200).json(token);

    } catch (error) {
        res.status(500).json({ message: "Unable to sign in" });
    }
};


export const get_user: RequestHandler<unknown, unknown, unknown, { email: string; }> = async (req, res, next) => {
    try {
        const { email } = req.query;
        const response = await LoginModel.findOne({ email });

    } catch (error) {
        console.log("Server Error", error);
    }

};

export const delete_user: RequestHandler<{ user_id: string; }, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const response = await LoginModel.deleteOne({ _id: user_id });
        if (response.deletedCount) {
            res.json(response);
        }

    } catch (error) {
        console.log("Server Error", error);
    }
};


