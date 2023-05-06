import { RouteObject } from 'react-router'
import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { AdminRequiredAuth, RequiredAuth } from './required-auth'
import { navigationFn } from './navigation-fn'
import { DefaultLayout } from '~/layouts'
import { BlankPage } from '~/modules'
import { homeRoutes } from './home-routes'
import DashboardLayout from '~/modules/dashboard/page/dash-board'
import ManageUsersTable from '~/modules/dashboard/components/manage-user'
import { AdminLoginLayout } from '~/modules/dashboard/page/login-form'
import { EditUserForm } from '~/modules/dashboard/page/edit-user'
import { EditUser } from '~/modules/dashboard/components/edit-user'
import { ManageBookings } from '~/modules/dashboard/components/manage-booking'
import { AdminBlockedAuth } from './blocked-auth'

export const adminRoutes: RouteObject = {
  // element: <AdminBlockedAuth />,
  errorElement: <BlankPage />,
  children: [
    {
      children: [
        {
          path: '/admin/login',
          element: <AdminLoginLayout />
        },
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
              <ManageUsersTable />
            </DashboardLayout>
          )
        },
        {
          path: '/admin/manage-users/:userId/edit',
          element: (
            <DashboardLayout>
              <EditUser />
            </DashboardLayout>
          )
        },
        {
          path: '/admin/manage-bookings',
          element: (
            <DashboardLayout>
              <ManageBookings />
            </DashboardLayout>
          )
        },

        {
          path: '/admin/*',
          element: <Navigate replace to='/admin/dashboard' />
        }
      ]
    }
  ]
}

// Loading spinner component
const Loading = () => <div>Loading...</div>

// Wrap the Route object in a component to add the loading spinner
const AdminRoutes = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return <Navigate replace to='/admin/dashboard' />
}

export default AdminRoutes
