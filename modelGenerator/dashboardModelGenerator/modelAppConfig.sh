# Create model app config file

function createDashboardModelAppConfigFile() {
  local modelAppConfigFile=./dashboard/src/app/main/application/$lowerModelNamePlural/${modelNamePlural}AppConfig.js
  if [[ -f "$modelAppConfigFile" ]]; then
    while true; do
      read -p "$modelAppConfigFile file already exists do you want to replace it?(yes/no)" yn
      case $yn in
      [Yy]*) break ;;
      [Nn]*) return ;;
      *) echo "Please answer yes or no." ;;
      esac
    done
  fi

  touch $modelAppConfigFile
  echo "import i18next from 'i18next';
import React from 'react';
import { authRoles } from '../../../auth';
import en from './i18n/en';
// import ar from './i18n/ar';

i18next.addResourceBundle('en', '${lowerModelNamePlural}App', en);
// i18next.addResourceBundle('ar', '${lowerModelNamePlural}App', ar);

const ${modelNamePlural}AppConfig = {
  settings: {
    layout: {},
  },
  auth: authRoles.admin, // ['admin']
  routes: [
    {
      path: '/${lowerModelNamePlural}/:${lowerModelName}Id',
      component: React.lazy(() => import('./form/${modelName}')),
    },
    {
      path: '/${lowerModelNamePlural}',
      component: React.lazy(() => import('./list/${modelNamePlural}')),
    },
  ],
};

export default ${modelNamePlural}AppConfig" >$modelAppConfigFile

  oldImport="// import here"
  newImport="import ${modelNamePlural}AppConfig from './${lowerModelNamePlural}/${modelNamePlural}AppConfig';\n$oldImport"
  sed -i "" "s#${oldImport}#${newImport}#g" dashboard/src/app/main/application/applicationConfigs.js

  oldAddConfigs="// add to configs here"
  newAddConfigs="${modelNamePlural}AppConfig,\n  $oldAddConfigs"
  sed -i "" "s#${oldAddConfigs}#${newAddConfigs}#g" dashboard/src/app/main/application/applicationConfigs.js

  oldAddLocale="// add to locale here"
  newAddLocale="${upperModelNamePlural}: '${modelNamePlural}',\n  $oldAddLocale"
  sed -i "" "s#${oldAddLocale}#${newAddLocale}#g" dashboard/src/app/fuse-configs/navigation-i18n/en.js

  oldAddNavigation="// add to navigation here"
  newAddNavigation="{\n        id: '${lowerModelNamePlural}',\n        title: '${modelNamePlural}',\n        translate: '${upperModelNamePlural}',\n        type: 'item',\n        icon: '${modelIcon}',\n        auth: authRoles.admin,\n        url: '/${lowerModelNamePlural}',\n      },\n      $oldAddNavigation"
  sed -i "" "s#${oldAddNavigation}#${newAddNavigation}#g" dashboard/src/app/fuse-configs/navigationConfig.js


}
