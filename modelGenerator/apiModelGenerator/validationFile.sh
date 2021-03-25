# 2- create validation file

function createValidationFile {
  local validationFile=./src/api/v1/validations/$lowerModelName.validation.js
  if [[ -f "$validationFile" ]]; then
    while true; do
      read -p "$validationFile file already exists do you want to replace it?(yes/no)" yn
      case $yn in
          [Yy]* ) break;;
          [Nn]* ) return;;
          * ) echo "Please answer yes or no.";;
      esac
    done
  fi
  touch $validationFile
  echo "const { Joi } = require('express-validation');

module.exports = {
  // GET /v1/$lowerModelNamePlural
  list${modelNamePlural}: {
    query: Joi.object({
      page: Joi.number().min(1),
      limit: Joi.number()
        .min(0)
        .max(100),
    }).unknown(true),
  },

  // POST /v1/$lowerModelNamePlural
  create${modelName}: {
    body: Joi.object({ }).unknown(true),
  },

  // PATCH /v1/${lowerModelNamePlural}/:${lowerModelName}Id
  update${modelName}: {
    body: Joi.object({ }).unknown(true),
    params: Joi.object({ }).unknown(true),
  },
};" > $validationFile
}
