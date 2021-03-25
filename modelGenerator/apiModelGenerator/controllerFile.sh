# Create controller file

function createControllerFile() {
  local controllerFile=./src/api/v1/controllers/$lowerModelName.controller.js
  if [[ -f "$controllerFile" ]]; then
    while true; do
      read -p "$controllerFile file already exists do you want to replace it?(yes/no)" yn
      case $yn in
      [Yy]*) break ;;
      [Nn]*) return ;;
      *) echo "Please answer yes or no." ;;
      esac
    done
  fi
  touch $controllerFile
  echo "const httpStatus = require('http-status');
const { omit } = require('lodash');
const $modelName = require('../models/${lowerModelName}.model');
const { handler: errorHandler } = require('../middlewares/error');

/**
 * Load $lowerModelName and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const $lowerModelName = await ${modelName}.findById(id).where({ deletedAt: { \$exists: false } });
    req.locals = { $lowerModelName };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Get $lowerModelName
 * @public
 */
 exports.get = async (req, res, next) => {
  try {
    res.json(req.locals.$lowerModelName);
  } catch (error) {
    next(error);
  }
};

/**
 * Create new $lowerModelName
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const $lowerModelName = new ${modelName}(req.body);
    const saved$modelName = await $lowerModelName.save();
    res.status(httpStatus.CREATED);
    res.json(saved$modelName);
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing $lowerModelName
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const updated$modelName = omit(req.body, ['deletedAt']);
    const $lowerModelName = Object.assign(req.locals.$lowerModelName, updated$modelName);
    const saved$modelName = await $lowerModelName.save();
    res.status(httpStatus.OK);
    res.json(saved$modelName);
  } catch (error) {
    next(error);
  }
};

/**
 * Get $lowerModelName list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const query = { deletedAt: { \$exists: false } };
    const totalNotFiltered = await ${modelName}.estimatedDocumentCount(query);
    // set query params
    let ${lowerModelNamePlural}Count = 0;
    const limit = parseInt(req.query.limit, 10) || 0;
    const page = parseInt(req.query.page, 10) || 1;
    let orderBy = req.query.order || 'createdAt';
    // const search = req.query.search;
    let perPage = 0;
    let offset = 0;
    if (req.query.orderDirection === 'desc') {
      orderBy = \`-\${orderBy}\`;
    }
    if (limit > 0) {
      perPage = limit;
      offset = perPage * (page - 1);
      ${lowerModelNamePlural}Count = await ${modelName}.countDocuments(query);
    }
    const ${lowerModelNamePlural} = await $modelName.find(query).sort(orderBy).limit(perPage).skip(offset);
    if (${lowerModelNamePlural}Count === 0) {
      ${lowerModelNamePlural}Count = ${lowerModelNamePlural}.length;
    }
    res.json({ results: ${lowerModelNamePlural}, total: ${lowerModelNamePlural}Count, totalNotFiltered });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete $lowerModelName
 * @public
 */
exports.remove = async (req, res, next) => {
  try {
    const { $lowerModelName } = req.locals;
    $lowerModelName.deletedAt = new Date();
    await $lowerModelName.save();
    res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};" >$controllerFile
}
