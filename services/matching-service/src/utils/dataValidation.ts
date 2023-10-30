import Joi from "joi";

const matchRequestSchema = Joi.object({
  userId: Joi.string().required(),
  complexity: Joi.string().required().valid("easy", "medium", "difficult"),
  languages: Joi.array()
    .required()
    .items(
      Joi.string()
        .valid("python", "javascript", "c++", "java", "c#")
        .lowercase()
    ),
});

const validateMatchRequestPromise = (data: any) =>
  matchRequestSchema.validateAsync(data);

export { validateMatchRequestPromise };
