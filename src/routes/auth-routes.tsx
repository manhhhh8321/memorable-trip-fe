import { RouteObject } from 'react-router'

import { BlockedAuth } from './blocked-auth'
import { BlankPage, LoginPage } from '~/modules'
import { AuthLayout } from '~/layouts'
import CreateRoomRoutes from './create-room-route'
import MyListing from '~/modules/room/page/my-listing'

export const authRoutes: RouteObject = {
  element: <BlockedAuth />,
  errorElement: <BlankPage />,
  children: [
    {
      element: <AuthLayout />,
      children: [
        {
          path: '/login',
          element: <LoginPage />
        },
        {
          path: '/forgot-password',
          element: <></>
        },
        {
          path: '/reset-password',
          element: <></>
        },
        {
          path: 'verify-code',
          element: <></>
        }
      ]
    },
    { ...CreateRoomRoutes },
    {
      path: '/my-listings',
      element: <MyListing />
    }
  ]
}
