import express from 'express';
import { delete_catalog, edit_catalog, get_catalog, get_catalogs, post_catalogs } from './catalog.controller';

export const catalogsRouter = express.Router();

catalogsRouter.get('/', get_catalogs);
catalogsRouter.post('/', express.json(), post_catalogs);
catalogsRouter.get('/:catalog_id', get_catalog);
catalogsRouter.put("/:catalog_id", express.json(), edit_catalog);
catalogsRouter.delete("/:catalog_id", delete_catalog);