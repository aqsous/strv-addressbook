import React, { useState } from 'react';
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
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { removeUsers, openRemoveDialog } from '../store/usersSlice';

const rows = [
  {
    id: 'image',
    align: 'left',
    disablePadding: true,
    label: '',
    sort: false,
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Name',
    sort: true,
  },
  {
    id: 'email',
    align: 'left',
    disablePadding: false,
    label: 'Email',
    sort: true,
  },
  {
    id: 'active',
    align: 'right',
    disablePadding: false,
    label: 'Active',
    sort: false,
  },
];

const useStyles = makeStyles((theme) => ({
  actionsButtonWrapper: {
    background: theme.palette.background.paper,
  },
}));

function UsersTableHead(props) {
  const classes = useStyles(props);
  const [selectedUsersMenu, setSelectedUsersMenu] = useState(null);
  const {
    selectedIds, rowCount, onSelectAllClick,
  } = props;
  const numSelected = selectedIds.length;

  const dispatch = useDispatch();

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedUsersMenu(event) {
    setSelectedUsersMenu(event.currentTarget);
  }

  function closeSelectedUsersMenu() {
    setSelectedUsersMenu(null);
  }

  return (
    <TableHead>
      <TableRow className="h-64">
        <TableCell padding="checkbox" className="relative pl-4 sm:pl-12">
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
                aria-owns={selectedUsersMenu ? 'selectedUsersMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedUsersMenu}
              >
                <Icon>more_horiz</Icon>
              </IconButton>
              <Menu
                id="selectedUsersMenu"
                anchorEl={selectedUsersMenu}
                open={Boolean(selectedUsersMenu)}
                onClose={closeSelectedUsersMenu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      dispatch(openRemoveDialog({ users: selectedIds }));
                      closeSelectedUsersMenu();
                    }}
                  >
                    <ListItemIcon className="min-w-40">
                      <Icon>delete</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          )}
        </TableCell>
        {rows.map((row) => (
          <TableCell
            className="p-4 md:p-16"
            key={row.id}
            align={row.align}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={props.order.id === row.id ? props.order.direction : false}
          >
            {row.sort && (
            <Tooltip
              title="Sort"
              placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
              enterDelay={300}
            >
              <TableSortLabel
                active={props.order.id === row.id}
                direction={props.order.direction}
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

UsersTableHead.propTypes = {
  order: PropTypes.objectOf(PropTypes.object).isRequired,
  selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  rowCount: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

export default UsersTableHead;
