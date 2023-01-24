import nano from "../utils/nanoid.js";
import Joi from "joi";

import postUrlSchema from "../schemas/post.url.js";
import urlRepository from "../repositories/url.repository.js";

export async function urlShortener(req, res) {
    // colocar como middleware
    const validation = postUrlSchema.validate(req.body);

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        res.status(422).send(errors);
    }

    try {
        const urlId = nano(12);

        const url = await urlRepository.insertUrl({
            url: validation.value.url,
            identifier: urlId,
        })

        console.log(url);
        return res.status(url).send(201);
    } catch (error) {
        return console.log(error);
    }
}