import nano from "../utils/nanoid.js";
import dotenv from "dotenv";
dotenv.config();

import urlRepository from "../repositories/url.repository.js";
import isValidObjectId from "../helper/functions/isValidObjectId.js";

// TODO - Apagar console logs

export async function urlShortener(req, res) {
    const { validation, userId } = res.locals;

    try {
        const urlId = nano(12);

        let url;
        if (userId && isValidObjectId(userId)) {
            url = await urlRepository.insertUrlWithUserId({
                url: validation.value.url,
                identifier: urlId,
                userId
            });
        } else {
            url = await urlRepository.insertAnonUrl({
                url: validation.value.url,
                identifier: urlId,
            })
        }

        if (url.acknowledged) {
            const newUrl = process.env.APP_HOST + `/url/${urlId}`;
            return res.status(201).send({url: "http://" + newUrl});
        }
        return;
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export async function redirectUrl(req, res) {
    const { id } = req.params;

    try {
        const urlResp = await urlRepository.getUrlByIdentifier({
            identifier: id
        });
        if (!urlResp || Object.keys(urlResp).length === 0) {
            return res.sendStatus(404);
        }

        if (Object.keys(urlResp).includes("user_id")) {
            await urlRepository.updateUrlVisitsByIdentifier({urlId: String(urlResp._id)})
        }
        return res.redirect(urlResp.url);
    }catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function deleteUrl(req, res) {
    const { id } = req.params;
    const { userId } = res.locals;

    try {
        const resp = await urlRepository.deleteUrlByUrlIdAndUserId({
            identifier: id,
            userId
        })
        if (resp.value !== null && resp.value?.identifier === id) {
            return res.sendStatus(200);
        }
        return res.sendStatus(401);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

// TODO - add createdAt para ordernar por mais recente
export async function getAccountUrl(req, res) {
    const { userId } = res.locals;

    try {
        const cursor = urlRepository.getUrlsByUser({userId});
        const resp = [];
        await cursor.forEach(element => {
            resp.push(element);
        });
        if (!Array.isArray(resp)) {
            return res.sendStatus(500);
        }
        return res.status(200).send(resp);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}