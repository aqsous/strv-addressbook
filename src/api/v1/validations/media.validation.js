const { Joi } = require('express-validation');

module.exports = {
  // GET /v1/medias
  listMedias: {
    query: Joi.object({
      page: Joi.number().min(1),
      limit: Joi.number()
        .min(0)
        .max(100),
    }).unknown(true),
  },

  // POST /v1/medias
  createMedia: {
    body: Joi.object({}).unknown(true),
  },

  // PATCH /v1/medias/:mediaId
  updateMedia: {
    body: Joi.object({ }).unknown(true),
    params: Joi.object({ }).unknown(true),
  },
};
