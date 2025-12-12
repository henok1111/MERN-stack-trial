import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  age: Joi.number().min(1).required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3),
  age: Joi.number().min(1),
});
