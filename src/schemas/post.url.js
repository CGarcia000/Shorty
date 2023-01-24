import Joi from 'joi';

const postUrlSchema = Joi.object({
    url: Joi.string().uri().required().trim(),
});

export default postUrlSchema;