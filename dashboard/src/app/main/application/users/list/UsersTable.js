import React, { useEffect, useState } from 'react';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import FuseAnimate from '../../../../../@fuse/core/FuseAnimate';
import FuseLoading from '../../../../../@fuse/core/FuseLoading';
import FuseScrollbars from '../../../../../@fuse/core/FuseScrollbars';
import RemoveUserDialog from './RemoveUserDialog';
import UsersTableHead from './UsersTableHead';
import { getUsers, selectUsers, openRemoveDialog } from '../store/usersSlice';

function UsersTable(props) {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const searchText = useSelector(({ usersApp }) => usersApp.users.searchText);
  const totalResults = useSelector(({ usersApp }) => usersApp.users.totalResults);

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: 'createdAt',
  });

  useEffect(() => {
    setLoading(true);
    dispatch(getUsers({
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
      setSelected(users.map((user) => user._id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect(item) {
    setSelected([]);
  }

  function handleClick(item) {
    props.history.push(`/users/${item._id}/`);
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
    setPage(mPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (loading) {
    return <FuseLoading />;
  }

  if (totalResults === 0) {
    return (
      <FuseAnimate delay={100}>
        <div className="flex flex-1 items-center justify-center h-full">
          <Typography color="textSecondary" variant="h5">
            There are no users!
          </Typography>
        </div>
      </FuseAnimate>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle">
          <UsersTableHead
            selectedIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={totalResults}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {(users || []).map((user) => {
              const isSelected = selected.indexOf(user._id) !== -1;
              return (
                <TableRow
                  className="h-64"
                  hover
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={-1}
                  key={user._id}
                  selected={isSelected}
                >
                  <TableCell className="w-40 md:w-64 px-4 sm:px-12" padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onClick={(event) => event.stopPropagation()}
                      onChange={(event) => handleCheck(event, user._id)}
                    />
                  </TableCell>

                  <TableCell className="w-52" component="th" scope="row" padding="none">
                    {user.image ? (
                      <img className="w-full block rounded" src={user.image} alt={user.name} />
                    ) : (
                      <img
                        className="w-full block rounded"
                        src="assets/images/ecommerce/product-image-placeholder.png"
                        alt={user.name}
                      />
                    )}
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {user.name}
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {user.email}
                  </TableCell>

                  <TableCell component="th" scope="row" align="right">
                    <IconButton
                      onClick={() => {
                        handleClick(user);
                      }}
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        dispatch(openRemoveDialog({ user }));
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
        className="flex-shrink-0 border-t-1"
        component="div"
        count={totalResults}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <RemoveUserDialog />
    </div>
  );
}

export default withRouter(UsersTable);
