import { checkAccountToken } from "../utils/jwt.js";

export async function authenticateToken(req, res, next) {
    const authHeader = req.headers?.authorization;
    // TODO - implementar funcao q lida com as respostas de erro
    if (!authHeader) {
        next();
        return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.sendStatus(400).send({
            message: "no token"
        })
    }

    try {
        const { userId } = checkAccountToken(token);
        res.locals.userId = userId;
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}
