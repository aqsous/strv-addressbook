read -p "Enter model name (singular):" modelName
lowerModelName="$(tr '[:upper:]' '[:lower:]' <<< ${modelName:0:1})${modelName:1}"
upperModelName="$(tr '[:lower:]' '[:upper:]' <<< ${modelName})"
DEFAULT="${modelName}s"
read -p "Enter model name (plural -> ${DEFAULT}):" modelNamePlural
# adopt the default, if 'enter' given
modelNamePlural="${modelNamePlural:-${DEFAULT}}"

lowerModelNamePlural="$(tr '[:upper:]' '[:lower:]' <<< ${modelNamePlural:0:1})${modelNamePlural:1}"
upperModelNamePlural="$(tr '[:lower:]' '[:upper:]' <<< ${modelNamePlural})"

read -p "Enter model attribute(s):" -a attributes

DEFAULT_ICON="format_list_bulleted"
read -p "Enter model icon (${DEFAULT_ICON}):" modelIcon
modelIcon="${modelIcon:-${DEFAULT_ICON}}"
# for value in ${attributes[@]}
# do
#     echo $value
# done

#################
# API
#################
# 1- create model file
source ./modelGenerator/apiModelGenerator/modelFile.sh
createModelFile

# 2- create validation file
source ./modelGenerator/apiModelGenerator/validationFile.sh
createValidationFile

# 3- create controller file
source ./modelGenerator/apiModelGenerator/controllerFile.sh
createControllerFile

# 4- create route file
source ./modelGenerator/apiModelGenerator/routeFile.sh
createRouteFile
createAdminRouteFile
createPublicRouteFile

# 5- create tests file
source ./modelGenerator/apiModelGenerator/testFile.sh
createTestFile

#################
# Dashboard
#################

# 1- create dashboard directories
source ./modelGenerator/dashboardModelGenerator/directories.sh
createDashboardDirectories

# 2- create dashboard slice files
source ./modelGenerator/dashboardModelGenerator/slice.sh
createDashboardSliceIndexFile
createDashboardSliceListFile
createDashboardSliceFormFile

# 3- create dashboard model list files
source ./modelGenerator/dashboardModelGenerator/modelList.sh
createDashboardModelRemoveDialogFile
createDashboardModelListLayoutFile
createDashboardModelListLayoutHeaderFile
createDashboardModelListTableHeaderFile
createDashboardModelListTableFile

# 4- create dashboard model form files
source ./modelGenerator/dashboardModelGenerator/modelForm.sh
createDashboardModelFormFile

# 5- create dashboard model app configs file
source ./modelGenerator/dashboardModelGenerator/modelAppConfig.sh
createDashboardModelAppConfigFile

# 6- create dashboard localization file
source ./modelGenerator/dashboardModelGenerator/localization.sh
createDashboardLocalizationFile
