import mongo from "../db/db.js"

let db = await mongo();

export function insertAccount({userId, token}) {
    return db.collection("session").insertOne(
        { user_id: userId, token }
    );
}