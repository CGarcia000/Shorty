import nano from "../utils/nanoid.js";
import dotenv from "dotenv";
dotenv.config();

import urlRepository from "../repositories/url.repository.js";

// TODO - Apagar console logs

export async function urlShortener(req, res) {
    const { validation } = res.locals;
    const authUser = {
        isLogged: false,
        userToken: null
    };

    try {
        const urlId = nano(12);

        let url;
        if (authUser.isLogged) {

        } else {
            url = await urlRepository.insertUrl({
                url: validation.value.url,
                identifier: urlId,
            })
        }

        if (url.acknowledged) {
            const newUrl = process.env.APP_HOST + `/url/${urlId}`;
            return res.status(201).send({url: newUrl});
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
        const urlResp = await urlRepository.getUrlAndAddVisitByIdentifier({
            identifier: id
        });
        if (urlResp.lastErrorObject.updatedExisting || urlResp.value !== null ) {
            return res.redirect(urlResp.value.url);
        }
        return res.sendStatus(404);
    }catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export async function deleteUrl(req, res) { // auth
    const { id } = req.params;
    
    try {
        const resp = await urlRepository.deleteUrlByUrlIdAndUserId({
            identifier: id,
            // userId: 
        })
        if (resp.value !== null && resp.value?.identifier === id) {
            return res.sendStatus(200);
        }
        return res.sendStatus(404);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}