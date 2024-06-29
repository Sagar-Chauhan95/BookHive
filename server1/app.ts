import express, { NextFunction, Request, Response } from "express";
import helmet from 'helmet';
import cors from "cors";

import connect_DB from "./database/connectDB";
import { booksRouter } from "./books/books.router";
import { ErrorWithStatus } from "./types/error";
import { usersRouter } from "./login/login.router";
import { authorsRouter } from "./authors/authors.router";
import { publishersRouter } from "./publishers/publisher.router";
import { membersRouter } from "./members/member.router";
import { catalogsRouter } from "./catalogs/catalog.router";
import { transactionsRouter } from "./transactions/transactions.router";

const app = express();
connect_DB();

app.use(helmet());
app.use(cors());

app.use('/books', booksRouter);
app.use('/users', usersRouter);
app.use('/authors', authorsRouter);
app.use('/publishers', publishersRouter);
app.use('/members', membersRouter);
app.use('/catalogs', catalogsRouter);
app.use("/transactions", transactionsRouter);


app.all("*", (req, res, next) => { throw new ErrorWithStatus("Routes Not Found", 404); });

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ErrorWithStatus) {
        res.status(error.status).send(error.message);
    } else if (error instanceof Error) {
        res.status(500).send(error.message);
    } else {
        res.status(500).send("Unknown Error Encountered");
    }
});


app.listen(8000, () => console.log("Server running at port 8000"));