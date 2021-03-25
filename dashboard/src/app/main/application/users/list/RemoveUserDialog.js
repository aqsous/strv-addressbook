import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { removeUser, closeRemoveDialog } from '../store/usersSlice';

function RemoveUserDialog() {
  const dispatch = useDispatch();
  const removeUserDialog = useSelector(({ usersApp }) => usersApp.users.removeDialog);

  useEffect(() => {
    if (removeUserDialog.props.open) {
      // initDialog();
    }
  }, [removeUserDialog.props.open]);

  function closeComposeDialog() {
    dispatch(closeRemoveDialog());
  }

  function handleRemove() {
    dispatch(removeUser({
      user: removeUserDialog.data,
    }));
    closeComposeDialog();
  }

  return (
    <Dialog {...removeUserDialog.props} onClose={closeComposeDialog}>
      <DialogTitle>Remove User</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove this user?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeComposeDialog}>
          No
        </Button>
        <Button onClick={handleRemove}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RemoveUserDialog;
