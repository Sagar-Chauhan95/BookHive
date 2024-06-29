import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";


export const checkAndVerifyToken: RequestHandler<unknown, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[ 1 ];
        if (!token) {
            res.status(404).json({ message: "Token not Found" });
        } else {
            const verification = verify(token, `${process.env.PRIVATE_KEY}`);

            if (!verification) {
                res.json(401).json({ message: "Token doesnot match" });
            } else {
                req.tokenInfo = verification;
                next();
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Error occured during authorization" });
    }
};