import express from "express";

import * as urlControllers from '../controllers/url.controller.js'
import Validation from "../middleware/schemaValidation.middleware.js";

// Schemas
import postUrlSchema from "../schemas/post.url.js";


// import { authenticateToken } from "../middleware/authorizations.middleware.js";

const urlRouter = express.Router();

urlRouter.post('/url/short',
    Validation.validateSchema(postUrlSchema),
    urlControllers.urlShortener); // TODO - pensar dps em como deixar a rota semi-autenticada(?) // talvez é melhor criar outra

urlRouter.get('/url/:id', urlControllers.redirectUrl);

// urlRouter.get('/urls/open/:shortUrl', urlControllers.redirectUrl);

// urlRouter.delete('/urls/:id', authenticateToken, urlControllers.deleteUrl); //authenticated
urlRouter.delete('/url/:id', urlControllers.deleteUrl); // TODO - alterar para ser rota autenticada


export default urlRouter;