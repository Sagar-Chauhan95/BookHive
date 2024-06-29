
import express from 'express';
import { delete_author, edit_author, get_author, get_authors, post_authors } from './authors.controller';

export const authorsRouter = express.Router();

authorsRouter.get('/', get_authors);
authorsRouter.post('/', express.json(), post_authors);
authorsRouter.get('/:author_id', get_author);
authorsRouter.put("/:author_id", express.json(), edit_author);
authorsRouter.delete("/:author_id", delete_author);
