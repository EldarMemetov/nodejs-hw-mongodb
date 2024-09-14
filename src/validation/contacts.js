import Joi from 'joi';
import { contactList, numberList } from '../constants/contact.js';
// для POST запиту
export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().pattern(numberList).required(),
  email: Joi.string().email().allow(null, ''),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...contactList)
    .required(),
});

//для PATCH запиту
export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().pattern(numberList),
  email: Joi.string().email().allow(null, ''),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...contactList),
});
