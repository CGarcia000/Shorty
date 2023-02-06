import bcrypt from "bcrypt";
import isObjectEmpty from "../helper/functions/isObjectEmpty.js";
import isLoginValid from "../helper/functions/isLoginValid.js";
import { getAccountToken, checkAccountToken } from "../utils/jwt.js";
import { ObjectId } from "mongodb";


import * as loginRepository from "../repositories/login.repository.js";
import * as sessionRepository from "../repositories/session.repository.js";

// TODO - apagar console logs

export async function signUp(req, res) {
    const { validation } = res.locals;

    try {
        const user = await loginRepository.getAccount({email: validation.value.email, username: validation.value.username});

        if ( user && !isObjectEmpty(user)) {
            return res.status(400).send({
                message: user.username === validation.value.username ?
                    "Username not available." : "Email not available.",
            })
        }

        await loginRepository.insertAccount({
            email: validation.value.email,
            username: validation.value.username,
            passwdHash: bcrypt.hashSync(validation.value.password, 10),
        })

        return res.sendStatus(201);
    } catch {
        console.log(error);
        return res.sendStatus(400);
    }
}

export async function signIn(req, res) {
    const { validation } = res.locals;

    try {
        const user = await loginRepository.getAccountByEmail(validation.value.email);
        if (!isLoginValid({user, passwd: validation.value.password})){
            return res.status(400).send({
                message: "Email or password invalid",
            });
        }

        const token = getAccountToken(String(user._id));
        if (!token) {
            return res.sendStatus(500);
        }
        await sessionRepository.insertAccount({userId: user._id, token})

        return res.status(200).send({token});
    } catch {
        console.log(error);
        return res.sendStatus(400);
    }
}