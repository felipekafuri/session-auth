import Joi from 'joi';

const registerSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  name: Joi.string().min(3).required(),
  password: Joi.string().min(5).required(),
  passwordConfirmation: Joi.valid(Joi.ref('password')).required(),
}) 

export default registerSchema;