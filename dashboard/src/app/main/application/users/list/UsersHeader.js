import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import FuseAnimate from '../../../../../@fuse/core/FuseAnimate';
import { selectMainTheme } from '../../../../store/fuse/settingsSlice';
import { setUsersSearchText } from '../store/usersSlice';

function UsersHeader() {
  const dispatch = useDispatch();
  const mainTheme = useSelector(selectMainTheme);
  const searchText = useSelector(({ usersApp }) => usersApp.users.searchText);

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <FuseAnimate animation="transition.expandIn" delay={300}>
          <Icon className="text-32">shopping_basket</Icon>
        </FuseAnimate>
        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
          <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
            Users
          </Typography>
        </FuseAnimate>
      </div>
      <div className="flex flex-1 items-center justify-center px-12">
        <ThemeProvider theme={mainTheme}>
          <FuseAnimate animation="transition.slideDownIn" delay={300}>
            <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8 shadow">
              <Icon color="action">search</Icon>
              <Input
                placeholder="Search"
                className="flex flex-1 mx-8"
                disableUnderline
                fullWidth
                value={searchText}
                inputProps={{
                  'aria-label': 'Search',
                }}
                onChange={(ev) => dispatch(setUsersSearchText(ev))}
              />
            </Paper>
          </FuseAnimate>
        </ThemeProvider>
      </div>
      <FuseAnimate animation="transition.slideRightIn" delay={300}>
        <Button
          component={Link}
          to="/users/new"
          className="whitespace-no-wrap normal-case"
          variant="contained"
          color="secondary"
        >
          <span className="hidden sm:flex">Add New User</span>
          <span className="flex sm:hidden">New</span>
        </Button>
      </FuseAnimate>
    </div>
  );
}

export default UsersHeader;
