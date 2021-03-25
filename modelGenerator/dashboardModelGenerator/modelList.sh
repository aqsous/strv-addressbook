# Create model list files

function createDashboardModelRemoveDialogFile() {
  local modelRemoveDialogFile="./dashboard/src/app/main/application/${lowerModelNamePlural}/list/Remove${modelName}Dialog.js"
  if [[ -f "$modelRemoveDialogFile" ]]; then
    while true; do
      read -p "$modelRemoveDialogFile file already exists do you want to replace it?(yes/no)" yn
      case $yn in
      [Yy]*) break ;;
      [Nn]*) return ;;
      *) echo "Please answer yes or no." ;;
      esac
    done
  fi
  touch "${modelRemoveDialogFile}"
  echo "import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { useTranslation } from 'react-i18next';
import { remove${modelName}, remove${modelNamePlural}, closeRemoveDialog } from '../store/${lowerModelNamePlural}Slice';

function Remove${modelName}Dialog() {
  const dispatch = useDispatch();
  const remove${modelName}Dialog = useSelector(({ ${lowerModelNamePlural}App }) => ${lowerModelNamePlural}App.${lowerModelNamePlural}.removeDialog);

  const { t } = useTranslation('${lowerModelNamePlural}App');

  useEffect(() => {
    if (remove${modelName}Dialog.props.open) {
      // initDialog();
    }
  }, [remove${modelName}Dialog.props.open]);

  function closeComposeDialog() {
     dispatch(closeRemoveDialog())
  }

  function handleRemove() {
    if (remove${modelName}Dialog.data.${lowerModelName} != null) {
      dispatch(remove${modelName}({
        ${lowerModelName}: remove${modelName}Dialog.data.${lowerModelName},
      }));
    }
    if (remove${modelName}Dialog.data.${lowerModelNamePlural} != null) {
      dispatch(remove${modelNamePlural}({
        ${lowerModelNamePlural}: remove${modelName}Dialog.data.${lowerModelNamePlural},
      }));
    }
    closeComposeDialog();
  }

  return (
    <Dialog {...remove${modelName}Dialog.props} onClose={closeComposeDialog}>
      <DialogTitle>
        {(remove${modelName}Dialog.data || {}).${lowerModelNamePlural} && t('REMOVE_${upperModelNamePlural}_TITLE')}
        {(remove${modelName}Dialog.data || {}).${lowerModelName} && t('REMOVE_${upperModelName}_TITLE')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {(remove${modelName}Dialog.data || {}).${lowerModelNamePlural} && t('REMOVE_${upperModelNamePlural}_MESSAGE')}
          {(remove${modelName}Dialog.data || {}).${lowerModelName} && t('REMOVE_${upperModelName}_MESSAGE')}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeComposeDialog}>
          {t('NO')}
        </Button>
        <Button onClick={handleRemove}>
          {t('YES')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Remove${modelName}Dialog;" >$modelRemoveDialogFile
}

function createDashboardModelListLayoutFile() {
  local modelListLayoutFile=./dashboard/src/app/main/application/$lowerModelNamePlural/list/${modelNamePlural}.js
  if [[ -f "$modelListLayoutFile" ]]; then
    while true; do
      read -p "$modelListLayoutFile file already exists do you want to replace it?(yes/no)" yn
      case $yn in
      [Yy]*) break ;;
      [Nn]*) return ;;
      *) echo "Please answer yes or no." ;;
      esac
    done
  fi
  touch $modelListLayoutFile
  echo "import React from 'react';
import FusePageCarded from '../../../../../@fuse/core/FusePageCarded';
import withReducer from '../../../../store/withReducer';
import ${modelNamePlural}Table from './${modelNamePlural}Table';
import ${modelNamePlural}Header from './${modelNamePlural}Header';
import reducer from '../store';

function ${modelNamePlural}() {
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<${modelNamePlural}Header />}
      content={<${modelNamePlural}Table />}
    />
  );
}

export default withReducer('${lowerModelNamePlural}App', reducer)(${modelNamePlural});" >$modelListLayoutFile
}

function createDashboardModelListLayoutHeaderFile() {
  local modelListLayoutHeaderFile=./dashboard/src/app/main/application/$lowerModelNamePlural/list/${modelNamePlural}Header.js
  if [[ -f "$modelListLayoutHeaderFile" ]]; then
    while true; do
      read -p "$modelListLayoutHeaderFile file already exists do you want to replace it?(yes/no)" yn
      case $yn in
      [Yy]*) break ;;
      [Nn]*) return ;;
      *) echo "Please answer yes or no." ;;
      esac
    done
  fi
  getAttributes
  touch $modelListLayoutHeaderFile
  echo "import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import FuseAnimate from '../../../../../@fuse/core/FuseAnimate';
import { selectMainTheme } from '../../../../store/fuse/settingsSlice';
import { set${modelNamePlural}SearchText } from '../store/${lowerModelNamePlural}Slice';

function ${modelNamePlural}Header() {
  const dispatch = useDispatch();
  const mainTheme = useSelector(selectMainTheme);
  const searchText = useSelector(({ ${lowerModelNamePlural}App }) => ${lowerModelNamePlural}App.${lowerModelNamePlural}.searchText);

  const { t } = useTranslation('${lowerModelNamePlural}App');

  return (
    <div className=\"flex flex-1 w-full items-center justify-between\">
      <div className=\"flex items-center\">
        <FuseAnimate animation=\"transition.expandIn\" delay={300}>
          <Icon className=\"text-32\">${modelIcon}</Icon>
        </FuseAnimate>
        <FuseAnimate animation=\"transition.slideLeftIn\" delay={300}>
          <Typography className=\"hidden sm:flex mx-0 sm:mx-12\" variant=\"h6\">
            {t('${upperModelNamePlural}')}
          </Typography>
        </FuseAnimate>
      </div>
      <div className=\"flex flex-1 items-center justify-center px-12\">
        <ThemeProvider theme={mainTheme}>
          <FuseAnimate animation=\"transition.slideDownIn\" delay={300}>
            <Paper className=\"flex items-center w-full max-w-512 px-8 py-4 rounded-8 shadow\">
              <Icon color=\"action\">search</Icon>
              <Input
                placeholder={t('SEARCH')}
                className=\"flex flex-1 mx-8\"
                disableUnderline
                fullWidth
                value={searchText}
                inputProps={{
                  'aria-label': t('SEARCH'),
                }}
                onChange={(ev) => dispatch(set${modelNamePlural}SearchText(ev))}
              />
            </Paper>
          </FuseAnimate>
        </ThemeProvider>
      </div>
      <FuseAnimate animation=\"transition.slideRightIn\" delay={300}>
        <Button
          component={Link}
          to=\"/${lowerModelNamePlural}/new\"
          className=\"whitespace-no-wrap normal-case\"
          variant=\"contained\"
          color=\"secondary\"
        >
          <span className=\"hidden sm:flex\">{t('ADD_NEW_${upperModelName}')}</span>
          <span className=\"flex sm:hidden\">{t('NEW')}</span>
        </Button>
      </FuseAnimate>
    </div>
  );
}

export default ${modelNamePlural}Header;" >$modelListLayoutHeaderFile
}

function createDashboardModelListTableHeaderFile() {
  local modelListTableHeadFile=./dashboard/src/app/main/application/$lowerModelNamePlural/list/${modelNamePlural}TableHead.js
  if [[ -f "$modelListTableHeadFile" ]]; then
    while true; do
      read -p "$modelListTableHeadFile file already exists do you want to replace it?(yes/no)" yn
      case $yn in
      [Yy]*) break ;;
      [Nn]*) return ;;
      *) echo "Please answer yes or no." ;;
      esac
    done
  fi
  getRowsFromAttributes
  touch $modelListTableHeadFile
  echo "import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { openRemoveDialog } from '../store/${lowerModelNamePlural}Slice';

const useStyles = makeStyles((theme) => ({
  actionsButtonWrapper: {
    background: theme.palette.background.paper,
  },
}));

function ${modelNamePlural}TableHead(props) {
  const classes = useStyles(props);
  const [selected${modelNamePlural}Menu, setSelected${modelNamePlural}Menu] = useState(null);
  const {
    selectedIds, rowCount, onSelectAllClick, order,
  } = props;
  const numSelected = selectedIds.length;

  const { t } = useTranslation('${lowerModelNamePlural}App');
  const dispatch = useDispatch();

  const rows = [${attributesRows}
    {
      id: 'active',
      align: 'right',
      disablePadding: false,
      label: t('ACTIVE'),
      sort: false,
    },
  ];

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelected${modelNamePlural}Menu(event) {
    setSelected${modelNamePlural}Menu(event.currentTarget);
  }

  function closeSelected${modelNamePlural}Menu() {
    setSelected${modelNamePlural}Menu(null);
  }

  return (
    <TableHead>
      <TableRow className=\"h-64\">
        <TableCell padding=\"checkbox\" className=\"relative pl-4 sm:pl-12\">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
          />
          {numSelected > 0 && (
            <div
              className={clsx(
                'flex items-center justify-center absolute w-64 top-0 left-0 ml-68 h-64 z-10',
                classes.actionsButtonWrapper,
              )}
            >
              <IconButton
                aria-owns={selected${modelNamePlural}Menu ? 'selected${modelNamePlural}Menu' : null}
                aria-haspopup=\"true\"
                onClick={openSelected${modelNamePlural}Menu}
              >
                <Icon>more_horiz</Icon>
              </IconButton>
              <Menu
                id=\"selected${modelNamePlural}Menu\"
                anchorEl={selected${modelNamePlural}Menu}
                open={Boolean(selected${modelNamePlural}Menu)}
                onClose={closeSelected${modelNamePlural}Menu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      dispatch(openRemoveDialog({ ${lowerModelNamePlural}: selectedIds }));
                      closeSelected${modelNamePlural}Menu();
                    }}
                  >
                    <ListItemIcon className=\"min-w-40\">
                      <Icon>delete</Icon>
                    </ListItemIcon>
                    <ListItemText primary={t('REMOVE')} />
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          )}
        </TableCell>
        {rows.map((row) => (
          <TableCell
            className=\"p-4 md:p-16\"
            key={row.id}
            align={row.align}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={props.order.id === row.id ? props.order.direction : false}
          >
            {row.sort && (
              <Tooltip
                title={t('SORT')}
                placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  active={order.id === row.id}
                  direction={order.direction}
                  onClick={createSortHandler(row.id)}
                >
                  {row.label}
                </TableSortLabel>
              </Tooltip>
            )}
          </TableCell>
        ), this)}
      </TableRow>
    </TableHead>
  );
}

${modelNamePlural}TableHead.propTypes = {
  order: PropTypes.objectOf(PropTypes.object).isRequired,
  selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  rowCount: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};
export default ${modelNamePlural}TableHead;" >"${modelListTableHeadFile}"
}

function createDashboardModelListTableFile() {
  local modelListTableFile=./dashboard/src/app/main/application/$lowerModelNamePlural/list/${modelNamePlural}Table.js
  if [[ -f "$modelListTableFile" ]]; then
    while true; do
      read -p "$modelListTableFile file already exists do you want to replace it?(yes/no)" yn
      case $yn in
      [Yy]*) break ;;
      [Nn]*) return ;;
      *) echo "Please answer yes or no." ;;
      esac
    done
  fi

  getTableRowsFromAttributes
  touch $modelListTableFile
  echo "import React, { useEffect, useState } from 'react';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FuseAnimate from '../../../../../@fuse/core/FuseAnimate';
import FuseLoading from '../../../../../@fuse/core/FuseLoading';
import FuseScrollbars from '../../../../../@fuse/core/FuseScrollbars';
import Remove${modelName}Dialog from './Remove${modelName}Dialog';
import ${modelNamePlural}TableHead from './${modelNamePlural}TableHead';
import { get${modelNamePlural}, select${modelNamePlural}, openRemoveDialog } from '../store/${lowerModelNamePlural}Slice';

function ${modelNamePlural}Table(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation('${lowerModelNamePlural}App');

  const ${lowerModelNamePlural} = useSelector(select${modelNamePlural});
  const searchText = useSelector(({ ${lowerModelNamePlural}App }) => ${lowerModelNamePlural}App.${lowerModelNamePlural}.searchText);
  const totalResults = useSelector(({ ${lowerModelNamePlural}App }) => ${lowerModelNamePlural}App.${lowerModelNamePlural}.totalResults);

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: 'desc',
    id: 'createdAt',
  });

  useEffect(() => {
    setLoading(true);
    dispatch(get${modelNamePlural}({
      page,
      limit: rowsPerPage,
      search: searchText,
      order: order.id,
      orderDirection: order.direction,
    })).then(() => setLoading(false));
  }, [dispatch, page, rowsPerPage, searchText, order]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }
    setOrder({
      id,
      direction,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(${lowerModelNamePlural}.map((${lowerModelName}) => ${lowerModelName}._id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect(item) {
    setSelected([]);
  }

  function handleClick(item) {
    props.history.push('/${lowerModelNamePlural}/' + item._id + '/');
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, mPage) {
    dispatch(setPage(mPage));
  }

  function handleChangeRowsPerPage(event) {
    dispatch(setRowsPerPage(event.target.value));
  }

  if (loading) {
    return <FuseLoading />;
  }

  if (totalResults === 0) {
    return (
      <FuseAnimate delay={100}>
        <div className=\"flex flex-1 items-center justify-center h-full\">
          <Typography color=\"textSecondary\" variant=\"h5\">
            {t('THERE_ARE_NO_${upperModelNamePlural}')}
          </Typography>
        </div>
      </FuseAnimate>
    );
  }

  return (
    <div className=\"w-full flex flex-col\">
      <FuseScrollbars className=\"flex-grow overflow-x-auto\">
        <Table className=\"min-w-xl\" aria-labelledby=\"tableTitle\">
          <${modelNamePlural}TableHead
            selectedIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={totalResults}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {(${lowerModelNamePlural} || []).map((${lowerModelName}) => {
              const isSelected = selected.indexOf(${lowerModelName}._id) !== -1;
              return (
                <TableRow
                  className=\"h-64\"
                  hover
                  role=\"checkbox\"
                  aria-checked={isSelected}
                  tabIndex={-1}
                  key={${lowerModelName}._id}
                  selected={isSelected}
                >
                  <TableCell className=\"w-40 md:w-64 px-4 sm:px-12\" padding=\"checkbox\">
                    <Checkbox
                      checked={isSelected}
                      onClick={(event) => event.stopPropagation()}
                      onChange={(event) => handleCheck(event, ${lowerModelName}._id)}
                    />
                  </TableCell>$attributesTableRows
                  <TableCell component=\"th\" scope=\"row\" align=\"right\">
                    <IconButton
                      onClick={() => {
                        handleClick(${lowerModelName});
                      }}
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        dispatch(openRemoveDialog({ ${lowerModelName} }));
                      }}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className=\"flex-shrink-0 border-t-1\"
        component=\"div\"
        count={totalResults}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': t('PREVIOUS_PAGE'),
        }}
        nextIconButtonProps={{
          'aria-label': t('NEXT_PAGE'),
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Remove${modelName}Dialog />
    </div>
  );
}

export default withRouter(${modelNamePlural}Table);" >$modelListTableFile
}

function getRowsFromAttributes() {
  attributesRows=""
  for value in ${attributes[@]}; do
    attributesRows+="
    {
      id: '${value}',
      align: 'left',
      disablePadding: false,
      label: t('$(tr '[:lower:]' '[:upper:]' <<<${value})'),
      sort: true,
    },"
  done
}

function getTableRowsFromAttributes() {
  attributesTableRows=""
  for value in ${attributes[@]}; do
    attributesTableRows+="
                  <TableCell className=\"p-4 md:p-16\" component=\"th\" scope=\"row\">
                    {${lowerModelName}.$value}
                  </TableCell>"
  done
}
