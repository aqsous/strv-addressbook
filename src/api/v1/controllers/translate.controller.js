const { Translate } = require('@google-cloud/translate').v2;

// Instantiates a client
const translate = new Translate({ keyFilename: 'we-skillz-dev-a094e0dc7d72.json' });

/**
 * Create new transaction
 * @public
 */
exports.translate = async (req, res, next) => {
  try {
    const translations = await translate.translate(req.body.text, req.body.locale);
    res.json({
      value: translations.length > 0 ? translations[0] : null,
      values: translations,
    });
  } catch (error) {
    next(error);
  }
};
