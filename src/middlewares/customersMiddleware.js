import joi from "joi";
import JoiDateFactory from "@joi/date";

const joiDate = joi.extend(JoiDateFactory);

const customersSchema = joi.object({
    name: joi.string().min(1).required(),
    phone: joi.string().min(10).max(11).required(),
    cpf: joi.string().length(11).required(),
    birthday: joiDate.date().format("YYYY-MM-DD").required()   
  });
  
  export function customerValidation(req, res, next) {
  
    const validation = customersSchema.validate(req.body);
  
    if (validation.error) {
      console.log(validation.error.details);
      return res.sendStatus(400);
    }
    next();
  }
  