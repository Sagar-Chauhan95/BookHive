
import express from 'express';
import { delete_publisher, edit_publisher, get_publisher, get_publishers, post_publishers } from './publisher.controller';

export const publishersRouter = express.Router();

publishersRouter.get('/', get_publishers);
publishersRouter.post('/', express.json(), post_publishers);
publishersRouter.get('/:publisher_id', get_publisher);
publishersRouter.put("/:publisher_id", express.json(), edit_publisher);
publishersRouter.delete('/:publisher_id', delete_publisher);