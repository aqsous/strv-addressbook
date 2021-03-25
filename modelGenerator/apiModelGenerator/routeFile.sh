# Create route file

function createRouteFile {
  local routeFile=./src/api/v1/routes/$lowerModelNamePlural.route.js
  if [[ -f "$routeFile" ]]; then
    while true; do
      read -p "$routeFile file already exists do you want to replace it?(yes/no)" yn
      case $yn in
          [Yy]* ) break;;
          [Nn]* ) return;;
          * ) echo "Please answer yes or no.";;
      esac
    done
  fi

  touch $routeFile
  echo "const express = require('express');
// const { validate } = require('express-validation');
// const controller = require('../controllers/${lowerModelName}.controller');
// const { authorize, LOGGED_USER } = require('../middlewares/auth');
// const {
//   list${modelNamePlural},
//   create${modelName},
//   update${modelName},
// } = require('../validations/${lowerModelName}.validation');

const router = express.Router();

module.exports = router;" > $routeFile
}

function createAdminRouteFile {
  local adminRouteFile=./src/api/v1/routes/admin/$lowerModelNamePlural.route.js
  if [[ -f "$adminRouteFile" ]]; then
    while true; do
      read -p "$adminRouteFile file already exists do you want to replace it?(yes/no)" yn
      case $yn in
          [Yy]* ) break;;
          [Nn]* ) return;;
          * ) echo "Please answer yes or no.";;
      esac
    done
  fi

  touch $adminRouteFile
  echo "const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/${lowerModelName}.controller');
const { authorize, ADMIN } = require('../../middlewares/auth');
const {
  list${modelNamePlural},
  create${modelName},
  update${modelName},
} = require('../../validations/${lowerModelName}.validation');

const router = express.Router();

/**
 * Load ${lowerModelName} when API with ${lowerModelName}Id route parameter is hit
 */
router.param('${lowerModelName}Id', controller.load);


router
  .route('/')
  .get(authorize([ADMIN]), validate(list${modelNamePlural}), controller.list)
  .post(authorize([ADMIN]), validate(create${modelName}), controller.create);

router
  .route('/:${lowerModelName}Id')
  .get(authorize([ADMIN]), controller.get)
  .patch(authorize([ADMIN]), validate(update${modelName}), controller.update)
  .delete(authorize([ADMIN]), controller.remove);

module.exports = router;" > $adminRouteFile
}

function createPublicRouteFile {
  local publicRouteFile=./src/api/v1/routes/public/$lowerModelNamePlural.route.js
  if [[ -f "$publicRouteFile" ]]; then
    while true; do
      read -p "$publicRouteFile file already exists do you want to replace it?(yes/no)" yn
      case $yn in
          [Yy]* ) break;;
          [Nn]* ) return;;
          * ) echo "Please answer yes or no.";;
      esac
    done
  fi

  touch $publicRouteFile
  echo "const express = require('express');
// const { validate } = require('express-validation');
// const controller = require('../../controllers/${lowerModelName}.controller');
// const { authorize, LOGGED_USER } = require('../../middlewares/auth');
// const {
//   list${modelNamePlural},
//   create${modelName},
//   update${modelName},
// } = require('../../validations/${lowerModelName}.validation');

const router = express.Router();

module.exports = router;" > $publicRouteFile
}
