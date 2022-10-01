import joi from "joi";

const gamesSchema = joi.object({
  name: joi.string().min(1),
  image: joi.string().uri(),
  stockTotal: joi.number().integer().min(1),
  categoryId: joi.number().integer().min(1),
  pricePerDay:joi.number().integer().min(1),
});

export function gamesValidation(req, res, next) {

  const validation = gamesSchema.validate(req.body);

  if (validation.error) {
    console.log(validation.error.details);
    return res.sendStatus(400);
  }
  next();
}
