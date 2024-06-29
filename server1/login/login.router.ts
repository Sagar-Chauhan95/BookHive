import express from 'express';

import { delete_user, get_user, get_users, post_users, sign_in, sign_up } from './login.controller';

export const usersRouter = express.Router();

usersRouter.post('/signup', express.json(), sign_up);
usersRouter.post('/signin', express.json(), sign_in);


// usersRouter.get('/', get_users);
// usersRouter.post('/', express.json(), post_users);
// usersRouter.get("/:user_id", get_user);
// usersRouter.delete('/:user_id', delete_user);