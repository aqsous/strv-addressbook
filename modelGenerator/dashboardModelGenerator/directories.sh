# Create all directories

function createDashboardDirectories {
  local mainModelDirectory=./dashboard/src/app/main/application/$lowerModelNamePlural
  if [[ ! -d "$mainModelDirectory" ]]; then
    mkdir $mainModelDirectory
  fi

  local formModelDirectory=./dashboard/src/app/main/application/$lowerModelNamePlural/form
  if [[ ! -d "$formModelDirectory" ]]; then
    mkdir $formModelDirectory
  fi

  local listModelDirectory=./dashboard/src/app/main/application/$lowerModelNamePlural/list
  if [[ ! -d "$listModelDirectory" ]]; then
    mkdir $listModelDirectory
  fi

  local storeModelDirectory=./dashboard/src/app/main/application/$lowerModelNamePlural/store
  if [[ ! -d "$storeModelDirectory" ]]; then
    mkdir $storeModelDirectory
  fi

  local localizationModelDirectory=./dashboard/src/app/main/application/$lowerModelNamePlural/i18n
  if [[ ! -d "$localizationModelDirectory" ]]; then
    mkdir $localizationModelDirectory
  fi
}
