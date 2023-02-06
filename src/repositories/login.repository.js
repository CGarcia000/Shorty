import mongo from "../db/db.js"

let db = await mongo();

export function getAccount({email, username}) {
    return db.collection("accounts").findOne(
        { $or: [{email}, {username}] },
        {
            projection: { _id: 0, password: 0 },
        }
    );
}

export function getAccountByEmail(email) {
    return db.collection("accounts").findOne(
        { email },
    );
}

export function insertAccount({email, username, passwdHash}) {
    return db.collection("accounts").insertOne(
        { email, username, password: passwdHash }
    );
}