import joi from "joi";

const gamesSchema = joi.object({
  name: joi.string().min(1).required(),
  image: joi.string().uri().required(),
  stockTotal: joi.number().integer().min(1).required(),
  categoryId: joi.number().integer().min(1).required(),
  pricePerDay:joi.number().integer().min(1).required(),
});

export function gamesValidation(req, res, next) {

  const validation = gamesSchema.validate(req.body);

  if (validation.error) {
    console.log(validation.error.details);
    return res.sendStatus(400);
  }
  next();
}
