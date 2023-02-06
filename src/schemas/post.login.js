import Joi from 'joi';

const postLoginSchema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().trim(),
});

export default postLoginSchema;