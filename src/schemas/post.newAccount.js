import Joi from 'joi';

const postNewAccountSchema = Joi.object({
    email: Joi.string().email().required().trim(),
    username: Joi.string().required().trim(),
    password: Joi.string().required().trim(),
});

export default postNewAccountSchema;