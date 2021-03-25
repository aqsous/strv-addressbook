import React from 'react';
import FusePageCarded from '../../../../../@fuse/core/FusePageCarded';
import withReducer from '../../../../store/withReducer';
import UsersTable from './UsersTable';
import UsersHeader from './UsersHeader';
import reducer from '../store';

function Users() {
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        contentCard: 'overflow-hidden',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={<UsersHeader />}
      content={<UsersTable />}
    />
  );
}

export default withReducer('usersApp', reducer)(Users);
