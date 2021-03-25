# Create localization file

function createDashboardLocalizationFile() {
  localizationFile="./dashboard/src/app/main/application/$lowerModelNamePlural/i18n/en.js"
  if [[ -f "$localizationFile" ]]; then
    while true; do
      read -p "$localizationFile file already exists do you want to replace it?(yes/no)" yn
      case $yn in
      [Yy]*) break ;;
      [Nn]*) return ;;
      *) echo "Please answer yes or no." ;;
      esac
    done
  fi

  getLocalizationAttributes

  touch ${localizationFile}
  echo "const locale = {
  YES: 'Yes',
  NO: 'No',
  SAVE: 'Save',
  SEARCH: 'Search',
  NEW: 'New',
  ACTIVE: 'Active',
  SORT: 'Sort',
  PREVIOUS_PAGE: 'Previous Page',
  NEXT_PAGE: 'Next Page',
  REMOVE: 'Remove',
  BASIC_INFO: 'Basic Info',
  ${upperModelName}: '${modelName}',
  ${upperModelName}_DETAIL: '${modelName} Detail',
  EDIT_${upperModelName}: 'Edit ${modelName}',
  NEW_${upperModelName}: 'New ${modelName}',
  ADD_NEW_${upperModelName}: 'Add New ${modelName}',
  ${upperModelNamePlural}: '${modelNamePlural}',
  THERE_IS_NO_SUCH_${upperModelName}: 'There is no such ${modelName}!',
  GO_TO_${upperModelNamePlural}_PAGE: 'Go to ${modelNamePlural} Page',
  THERE_ARE_NO_${upperModelNamePlural}: 'There are no ${lowerModelNamePlural}!',
  REMOVE_${upperModelName}_TITLE: 'Remove ${modelName}',
  REMOVE_${upperModelNamePlural}_TITLE: 'Remove ${modelNamePlural}',
  REMOVE_${upperModelName}_MESSAGE: 'Are you sure you want to remove this ${lowerModelName}?',
  REMOVE_${upperModelNamePlural}_MESSAGE: 'Are you sure you want to remove these ${lowerModelNamePlural}?',$attributesLocalization
};

export default locale;" >"${localizationFile}"
}


function getLocalizationAttributes() {
  attributesLocalization=""
  for value in ${attributes[@]}; do
    attributesLocalization+="
  $(tr '[:lower:]' '[:upper:]' <<< ${value}): '${value}',"
  done
}
