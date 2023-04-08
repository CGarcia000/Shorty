import mongo from "../db/db.js"
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

let db = await mongo();

function insertAnonUrl({url, identifier}) {
    db.collection("urls").createIndex( { "expireAt": 1 }, { expireAfterSeconds: 0 } ) // TODO - mudar dps para um arq de seed, ou encontrar uma outra solucao
    return  db.collection("urls").insertOne({
        url,
        identifier,
        visits: null,
        // "expireAt": dayjs().add(10, 'second').toDate(), // testes
        "expireAt": dayjs().add(7, 'day').toDate(),
    })
}

function insertUrlWithUserId({url, identifier, userId}) {
    return  db.collection("urls").insertOne({
        user_id: ObjectId(userId),
        url,
        identifier,
        visits: 0,
    })
}

function getUrlByIdentifier({identifier}) {
    return db.collection("urls").findOne(
        { identifier },
        {
            projection: { identifier: 0, visits: 0 }
        }
    )
}

function updateUrlVisitsByIdentifier({urlId}) {
    return db.collection("urls").updateOne(
        { _id: ObjectId(urlId) },
        {
            $inc: { visits: 1 },
        }
    )
}

function getUrlAndAddVisitByIdentifier({identifier}) {
    return db.collection("urls").findOneAndUpdate(
        { identifier },
        // {
        //     $set: {

        //             $cond: {
        //                 if: [{
        //                     userId: {$exists: true}
        //                 }],
        //                 then: {$inc: {"visits": 1}},
        //                 else: {"visits": null},
        //             }
        //         }
        // },
        {
            projection: { _id: 0, identifier: 0, visits: 0 }
        }
    )
}

function deleteUrlByUrlIdAndUserId({identifier, userId}) {
    return db.collection("urls").findOneAndDelete(
        { identifier, user_id: ObjectId(userId) },
    )
}

function getUrlsByUser({userId}) {
    return db.collection("urls").find(
        { user_id: { $in: [ObjectId(userId)] } },
        {
            projection: { _id: 0, user_id: 0 }
        }
    );
}

const urlRepository = {
    insertAnonUrl,
    insertUrlWithUserId,
    getUrlByIdentifier,
    updateUrlVisitsByIdentifier,
    getUrlAndAddVisitByIdentifier,
    deleteUrlByUrlIdAndUserId,
    getUrlsByUser,
};

export default urlRepository;