import express from "express";

import * as urlControllers from '../controllers/url.controller.js'
import Validation from "../middleware/schemaValidation.middleware.js";
import { authenticateToken } from "../middleware/authentication.middleware.js";

// Schemas
import postUrlSchema from "../schemas/post.url.js";


// import { authenticateToken } from "../middleware/authorizations.middleware.js";

const urlRouter = express.Router();

urlRouter.post('/url/short',
    authenticateToken,
    Validation.validateSchema(postUrlSchema),
    urlControllers.urlShortener
);

urlRouter.get('/url/:id', urlControllers.redirectUrl);

// urlRouter.get('/urls/open/:shortUrl', urlControllers.redirectUrl);

// urlRouter.delete('/urls/:id', authenticateToken, urlControllers.deleteUrl); //authenticated
urlRouter.delete('/url/:id', urlControllers.deleteUrl); // TODO - alterar para ser rota autenticada


// criar rota get com as rotas do user

export default urlRouter;