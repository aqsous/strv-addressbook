import React from 'react';
import { authRoles } from '../../../auth';

const UsersAppConfig = {
  settings: {
    layout: {},
  },
  auth: authRoles.admin, // ['admin']
  routes: [
    {
      path: '/users/:userId',
      component: React.lazy(() => import('./form/User')),
    },
    {
      path: '/users',
      component: React.lazy(() => import('./list/Users')),
    },
  ],
};

export default UsersAppConfig;
