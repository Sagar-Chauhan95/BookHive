import express from 'express';
import { delete_transaction, edit_transaction, get_transaction, get_transactions, post_transactions } from './transaction.controller';

export const transactionsRouter = express.Router();

transactionsRouter.get('/', get_transactions);
transactionsRouter.post('/', express.json(), post_transactions);
transactionsRouter.get('/:transaction_id', get_transaction);
transactionsRouter.put('/:transaction_id', express.json(), edit_transaction);
transactionsRouter.delete('/:transaction_id', delete_transaction);
