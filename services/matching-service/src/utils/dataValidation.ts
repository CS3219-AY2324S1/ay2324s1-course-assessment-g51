import Joi from "joi";

const matchRequestSchema = Joi.object({
  userId: Joi.string().required(),
  complexity: Joi.string().required().valid("easy", "medium", "difficult"),
});

const validateMatchRequestPromise = (data: any) =>
  matchRequestSchema.validateAsync(data);

export { validateMatchRequestPromise };
