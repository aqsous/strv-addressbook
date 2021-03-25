# Create model file

function createModelFile {
  local modelFile=./src/api/v1/models/$lowerModelName.model.js
  if [[ -f "$modelFile" ]]; then
    while true; do
      read -p "$modelFile file already exists do you want to replace it?(yes/no)" yn
      case $yn in
          [Yy]* ) break;;
          [Nn]* ) return;;
          * ) echo "Please answer yes or no.";;
      esac
    done
  fi
  getAttributes
  touch $modelFile
  echo "const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     $modelName:
 *       type: object
 *       properties:
 *         _id:
 *           type: string${cleanAttributesDocumentation}
 *         createdAt:
 *           type: date
 */
const ${lowerModelName}Schema = new mongoose.Schema({${cleanAttributes}
  deletedAt: {
    type: Date,
  },
}, {
  collection: '${modelName}',
  timestamps: true,
  toJSON: { virtuals: true },
});

${lowerModelName}Schema.statics = {

};

/**
* @typedef ${modelName}
*/
const ${modelName} = mongoose.model('${modelName}', ${lowerModelName}Schema);
module.exports = ${modelName};" > $modelFile
}

function getAttributes {
  cleanAttributes=""
  cleanAttributesDocumentation=""
  for value in ${attributes[@]}
  do
      cleanAttributes+="
  ${value}: {
    type: String,
  },"
      cleanAttributesDocumentation+="
 *         ${value}:
 *           type: string"
  done
}
