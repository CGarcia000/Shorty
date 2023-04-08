import express from "express";

import * as urlControllers from '../controllers/url.controller.js'
import Validation from "../middleware/schemaValidation.middleware.js";
import { authenticateToken, semiAuthenticateToken } from "../middleware/authentication.middleware.js";

// Schemas
import postUrlSchema from "../schemas/post.url.js";

const urlRouter = express.Router();

urlRouter.post('/url/short',
    semiAuthenticateToken,
    Validation.validateSchema(postUrlSchema),
    urlControllers.urlShortener
);

urlRouter.get('/url/:id', urlControllers.redirectUrl);

urlRouter.use(authenticateToken);

urlRouter.delete('/url/:id', urlControllers.deleteUrl);

urlRouter.get('/url', urlControllers.getAccountUrl);

export default urlRouter;