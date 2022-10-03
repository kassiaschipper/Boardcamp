import joi from "joi";

const rentalsSchema = joi.object({
    customerId: joi.number().integer().required(),
    gameId: joi.number().integer().required(),
    daysRented: joi.number().integer().required(),
  });

export function rentalsValidation(req, res, next) {

  const validation = rentalsSchema.validate(req.body);

  if (validation.error) {
    console.log(validation.error.details);
    return res.sendStatus(400);
  }
  next();
}
