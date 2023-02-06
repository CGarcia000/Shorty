import jwt from "jsonwebtoken";

export function getAccountToken(userId) {
    return jwt.sign(
        { userId },
        process.env.SECRET_TOKEN,
        { expiresIn: "7d" }
    );
}

export function checkAccountToken(token) {
    return jwt.verify(token, process.env.SECRET_TOKEN)
}