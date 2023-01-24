import mongo from "../db/db.js"

let db = await mongo();

function insertUrl({url, identifier}) {
    return  db.collection('urls').insertOne({
        // userId: ,
        url,
        identifier,
        visits: 0,
    })

}


const urlRepository = {
    insertUrl,
};

export default urlRepository;