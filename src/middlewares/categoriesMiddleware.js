import joi from "joi";

const categoriesSchema = joi.object({
  name: joi.string().min(1).required(),
});

export function categoriesNameValidation(req, res, next) {
  const name = req.body;

  const validation = categoriesSchema.validate(name);

  if (validation.error) {
    console.log(validation.error.details);
    return res.sendStatus(422);
  }
  next();
}
