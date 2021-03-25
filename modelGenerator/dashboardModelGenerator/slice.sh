# Create slice files

function createDashboardSliceIndexFile() {
  local sliceIndexFile=./dashboard/src/app/main/application/$lowerModelNamePlural/store/index.js
  if [[ -f "$sliceIndexFile" ]]; then
    while true; do
      read -p "$sliceIndexFile file already exists do you want to replace it?(yes/no)" yn
      case $yn in
      [Yy]*) break ;;
      [Nn]*) return ;;
      *) echo "Please answer yes or no." ;;
      esac
    done
  fi

  touch $sliceIndexFile
  echo "import { combineReducers } from '@reduxjs/toolkit';
import ${lowerModelName} from './${lowerModelName}Slice';
import ${lowerModelNamePlural} from './${lowerModelNamePlural}Slice';

const reducer = combineReducers({
  ${lowerModelName},
  ${lowerModelNamePlural},
});

export default reducer;" >"${sliceIndexFile}"
}

function createDashboardSliceListFile() {
  local sliceListFile=./dashboard/src/app/main/application/$lowerModelNamePlural/store/${lowerModelNamePlural}Slice.js
  if [[ -f "$sliceListFile" ]]; then
    while true; do
      read -p "$sliceListFile file already exists do you want to replace it?(yes/no)" yn
      case $yn in
      [Yy]*) break ;;
      [Nn]*) return ;;
      *) echo "Please answer yes or no." ;;
      esac
    done
  fi

  touch "${sliceListFile}"
  echo "import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const get${modelNamePlural} = createAsyncThunk('${lowerModelNamePlural}App/${lowerModelNamePlural}/get${modelNamePlural}',
  async ({
    page, limit, search, order, orderDirection,
  }, { dispatch }) => {
    const response = await axios.get('admin/${lowerModelNamePlural}', {
      params: {
        page: page + 1,
        limit,
        search,
        order,
        orderDirection,
      },
    });

    dispatch(setTotalResults(response.data.total));
    return response.data.results;
  });

export const remove${modelName} = createAsyncThunk('${lowerModelNamePlural}App/${lowerModelNamePlural}/remove${modelName}',
  async ({
    ${lowerModelName},
  }) => {
    await axios.delete(\`admin/${lowerModelNamePlural}/\${${lowerModelName}._id}\`);

    return ${lowerModelName}._id;
  });

export const remove${modelNamePlural} = createAsyncThunk('${lowerModelNamePlural}App/${lowerModelNamePlural}/removeUsers',
  async ({
    ${lowerModelNamePlural},
  }) => {
    const requests = [];
    for (let i = 0; i < ${lowerModelNamePlural}.length; i += 1) {
      const ${lowerModelName}Id = ${lowerModelNamePlural}[i];
      requests.push(axios.delete(\`admin/${lowerModelNamePlural}/\${${lowerModelName}Id}\`));
    }
    await Promise.all(requests);

    return ${lowerModelNamePlural};
  });

const ${lowerModelNamePlural}Adapter = createEntityAdapter({
  selectId: (model) => model._id,
});

export const {
  selectAll: select${modelNamePlural},
  selectById: select${modelName}ById,
} = ${lowerModelNamePlural}Adapter.getSelectors(
  (state) => state.${lowerModelNamePlural}App.${lowerModelNamePlural},
);

const ${lowerModelNamePlural}Slice = createSlice({
  name: '${lowerModelNamePlural}App/${lowerModelNamePlural}',
  initialState: ${lowerModelNamePlural}Adapter.getInitialState({
    searchText: '',
    totalResults: 0,
    removeDialog: {
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    set${modelNamePlural}SearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    setTotalResults: {
      reducer: (state, action) => {
        state.totalResults = action.payload ? action.payload : 0;;
      },
      prepare: (totalResults) => ({ payload: totalResults || '' }),
    },
    openRemoveDialog: {
      reducer: (state, action) => {
        state.removeDialog = {
          props: {
            open: true,
          },
          data: {
            ...action.payload,
          },
        };
      },
      prepare: (data) => ({ payload: data }),
    },
    closeRemoveDialog: {
      reducer: (state, action) => {
        state.removeDialog = {
          props: {
            open: false,
          },
          data: null,
        };
      },
      prepare: () => ({ }),
    },
  },
  extraReducers: {
    [get${modelNamePlural}.fulfilled]: ${lowerModelNamePlural}Adapter.setAll,
    [remove${modelName}.fulfilled]: ${lowerModelNamePlural}Adapter.removeOne,
    [remove${modelNamePlural}.fulfilled]: ${lowerModelNamePlural}Adapter.removeMany,
  },
});

export const {
  set${modelNamePlural}SearchText,
  openRemoveDialog,
  closeRemoveDialog,
  setTotalResults,
} = ${lowerModelNamePlural}Slice.actions;

export default ${lowerModelNamePlural}Slice.reducer;
" >"${sliceListFile}"
}

function createDashboardSliceFormFile() {
  local sliceFormFile=./dashboard/src/app/main/application/$lowerModelNamePlural/store/${lowerModelName}Slice.js
  if [[ -f "$sliceFormFile" ]]; then
    while true; do
      read -p "$sliceFormFile file already exists do you want to replace it?(yes/no)" yn
      case $yn in
      [Yy]*) break ;;
      [Nn]*) return ;;
      *) echo "Please answer yes or no." ;;
      esac
    done
  fi
  getAttributes
  touch "${sliceFormFile}"
  echo "import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const get${modelName} = createAsyncThunk('${lowerModelNamePlural}App/get${modelName}', async (params) => {
  try {
    const response = await axios.get(\`/admin/${lowerModelNamePlural}/\${params.${lowerModelName}Id}\`);
    const { data } = response;

    return data === undefined ? null : data;
  } catch (error) {
    return null;
  }
});

export const save${modelName} = createAsyncThunk('${lowerModelNamePlural}/save${modelName}', async (data, { dispatch }) => {
  if (data._id) {
    const response = await axios.patch(\`/admin/${lowerModelNamePlural}/\${data._id}\`, data);
    // dispatch(showMessage({ message: 'Badge Saved' }));
    return dispatch(get${modelName}({ ${lowerModelName}Id: response.data._id }));
  }
  const response = await axios.post('/admin/${lowerModelNamePlural}/', data);
  return response.data;
});

const ${lowerModelName}Slice = createSlice({
  name: '${lowerModelNamePlural}App/${lowerModelName}',
  initialState: null,
  reducers: {
    reset${modelName}: () => null,
    new${modelName}: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {${cleanAttributes}
        },
      }),
    },
  },
  extraReducers: {
    [get${modelName}.fulfilled]: (state, action) => action.payload,
  },
});

export const { new${modelName}, reset${modelName} } = ${lowerModelName}Slice.actions;

export default ${lowerModelName}Slice.reducer;
" >"${sliceFormFile}"
}

function getAttributes {
  cleanAttributes=""
  for value in ${attributes[@]}
  do
      cleanAttributes+="
          ${value}: '',"
  done
}
