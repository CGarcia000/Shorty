import express from "express";

import * as loginControllers from '../controllers/login.controller.js'
import Validation from "../middleware/schemaValidation.middleware.js";

// Schemas
import postNewAccountSchema from "../schemas/post.newAccount.js";
import postLoginSchema from "../schemas/post.login.js";


const loginRouter = express.Router();

loginRouter.post("/sign-up",
    Validation.validateSchema(postNewAccountSchema),
    loginControllers.signUp
);

loginRouter.post("/login",
    Validation.validateSchema(postLoginSchema),
    loginControllers.signIn
);


export default loginRouter;