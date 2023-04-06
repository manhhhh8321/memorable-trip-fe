import { RouteObject } from 'react-router'
import { Navigate } from 'react-router-dom'

// import { BlankPage } from "@/modules";
// import { DefaultLayout } from "@/layouts";

import { RequiredAuth } from './required-auth'
import { navigationFn } from './navigation-fn'
import { DefaultLayout } from '~/layouts'
import { BlankPage } from '~/modules'
import { homeRoutes } from './home-routes'
import DashboardLayout from '~/modules/dashboard/page/dash-board'

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
              <h1>Mange users!</h1>
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
