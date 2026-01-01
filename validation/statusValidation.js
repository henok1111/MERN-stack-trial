import Joi from "joi";
export const statusSchema = Joi.object({
  status: Joi.string().min(3).required(),
});
