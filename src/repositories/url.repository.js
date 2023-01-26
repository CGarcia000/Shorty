import mongo from "../db/db.js"
import dayjs from "dayjs";

let db = await mongo();

function insertUrl({url, identifier}) {
    db.collection("urls").createIndex( { "expireAt": 1 }, { expireAfterSeconds: 0 } ) // TODO - mudar dps para um arq de seed, ou encontrar uma outra solucao
    return  db.collection("urls").insertOne({
        url,
        identifier,
        visits: 0,
        // "expireAt": dayjs().add(10, 'second').toDate(), // testes
        "expireAt": dayjs().add(7, 'day').toDate(),
    })
}

function insertUrlWithUserId({url, identifier, userId}) {
    return  db.collection("urls").insertOne({
        // userId: ,
        url,
        identifier,
        visits: 0,
    })
}

function getUrlByIdentifier({identifier}) {
    return db.collection("urls").findOne(
        { identifier },
        {
            projection: { _id: 0, identifier: 0, visits: 0 }
        }
    )
}

function getUrlAndAddVisitByIdentifier({identifier}) {
    return db.collection("urls").findOneAndUpdate(
        { identifier },
        {
            $inc: { "visits" : 1 },
        },
        {
            projection: { _id: 0, identifier: 0, visits: 0 }
        }
    )
}

function deleteUrlByUrlIdAndUserId({identifier, userId}) {
    return db.collection("urls").findOneAndDelete(
        { identifier },
    )
}

const urlRepository = {
    insertUrl,
    insertUrlWithUserId,
    getUrlByIdentifier,
    getUrlAndAddVisitByIdentifier,
    deleteUrlByUrlIdAndUserId,
};

export default urlRepository;