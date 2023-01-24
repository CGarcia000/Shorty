import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const MongoClientInstantiation = new MongoClient(process.env.MONGO_URL);

export default async function mongo() {
    let db;

    try {
        db = await MongoClientInstantiation.db('shorter_db');
        return db;
    } catch(err) {
        console.log(err.message);
    }
}