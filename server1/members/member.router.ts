
import express from 'express';

import { delete_member, edit_member, get_member, get_members, post_members } from './member.controller';

export const membersRouter = express.Router();

membersRouter.get('/', get_members);
membersRouter.post('/', express.json(), post_members);
membersRouter.get('/:member_id', get_member);
membersRouter.put('/:member_id', express.json(), edit_member);
membersRouter.delete('/:member_id', delete_member);