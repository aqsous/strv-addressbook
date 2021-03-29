import { Joi } from 'express-validation';

const contactValidation = {
  // GET /v1/contacts
  listContacts: {
    query: Joi.object({
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
    }).unknown(true),
  },

  // POST /v1/contacts
  createContact: {
    body: Joi.object({
      firstName: Joi.string()
        .required(),
      lastName: Joi.string()
        .required(),
      phoneNumber: Joi.string(),
      address: Joi.string(),
    }).unknown(true),
  },

  // PATCH /v1/contacts/:contactId
  updateContact: {
    body: Joi.object({
      firstName: Joi.string(),
      lastName: Joi.string(),
      phoneNumber: Joi.string(),
      address: Joi.string(),
    }).unknown(true),
  },
};

export default contactValidation;
