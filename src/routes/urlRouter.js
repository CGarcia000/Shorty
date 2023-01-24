import express from "express";

import * as urlControllers from '../controllers/url.controller.js'

// import { authenticateToken } from "../middleware/authorizations.middleware.js";

const urlRouter = express.Router();

urlRouter.post('/url/short', urlControllers.urlShortener); // pensar dps em como deixar a rota semi-autenticada(?) // talvez é melhor criar outra

// urlRouter.get('/urls/:id', urlControllers.returnUrl);

// urlRouter.get('/urls/open/:shortUrl', urlControllers.redirectUrl);

// urlRouter.delete('/urls/:id', authenticateToken, urlControllers.deleteUrl); //authenticated


export default urlRouter;