declare namespace Express {
    interface Request {
        tokenInfo: JWTType;
    }
}