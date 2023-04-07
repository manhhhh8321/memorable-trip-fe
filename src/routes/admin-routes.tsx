import { RouteObject } from 'react-router'
import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { RequiredAuth } from './required-auth'
import { navigationFn } from './navigation-fn'
import { DefaultLayout } from '~/layouts'
import { BlankPage } from '~/modules'
import { homeRoutes } from './home-routes'
import DashboardLayout from '~/modules/dashboard/page/dash-board'
import ManageUsersTable from '~/modules/dashboard/components/manage-user'

const users = [
  { id: 1, name: "John Doe", email: "johndoe@example.com", role: "Admin" },
  { id: 2, name: "Jane Doe", email: "janedoe@example.com", role: "User" },
  // add more users here...
];

const handleViewUser = (user: any) => {
  // handle user view event...
};

const handleEditUser = (user: any) => {
  // handle user edit event...
};

const handleDeleteUser = (user: any) => {
  // handle user delete event...
};

export const adminRoutes: RouteObject = {
  element: <RequiredAuth />,
  errorElement: <BlankPage />,
  children: [
    {
      children: [
        {
          path: '/admin/dashboard',
          element: (
            <DashboardLayout>
              <h1>Welcome to the admin dashboard!</h1>
            </DashboardLayout>
          )
        },
        {
          path: '/admin/manage-users',
          element: (
            <DashboardLayout>
              <ManageUsersTable
                users={users}
                onView={handleViewUser}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            </DashboardLayout>
          )
        },
        {
          path: '/admin/manage-bookings',
          element: (
            <DashboardLayout>
              <h1>Mange bookings!</h1>
            </DashboardLayout>
          )
        }
      ]
    }
  ]
}

// Loading spinner component
const Loading = () => <div>Loading...</div>;

// Wrap the Route object in a component to add the loading spinner
const AdminRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return <Navigate replace to="/admin/dashboard" />;
};

export default AdminRoutes;
