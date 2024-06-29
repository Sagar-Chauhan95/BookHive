import express from "express";

import { delete_book, edit_book, get_book, get_books, post_books } from "./books.controller";
export const booksRouter = express.Router();


booksRouter.post('/', express.json(), post_books);
booksRouter.get('/', get_books);
booksRouter.get('/:book_id', get_book);
booksRouter.put('/:book_id', express.json(), edit_book);
booksRouter.delete('/:book_id', delete_book)


