import { RouteObject } from 'react-router'

import { BlockedAuth } from './blocked-auth'
import { BlankPage, LoginPage } from '~/modules'
import { AuthLayout } from '~/layouts'
import CreateRoomRoutes from './create-room-route'
import MyListing from '~/modules/room/page/my-listing'
import { Header } from '~/layouts/components/header'
import { Box } from '@chakra-ui/react'
import { Footer } from '~/layouts/components/footer'
import { paymentRoutes } from './payment'
import PaymentConfirmationPage from '~/modules/payment/pages/confirmation-cash'
import VerifyPaymentPage from '~/modules/payment/pages/verify-payment'
import { ManageUserBookings } from '~/modules/booking/pages/list-booking'

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
      element: (
        <Box>
          <Header />
          <MyListing />
          <Footer />
        </Box>
      )
    },
    { ...paymentRoutes },
    {
      path: '/payment/payment-confirm/:type',
      element: (
        <Box>
          <Header />
          <PaymentConfirmationPage />
          <Footer />
        </Box>
      )
    },

    {
      path: '/payment/verify-payment',
      element: (
        <Box>
          <Header />
          <VerifyPaymentPage />
          <Footer />
        </Box>
      )
    },
    {
      path: '/booked',
      element: (
        <Box>
          <Header />
          <ManageUserBookings />
          <Footer />
        </Box>
      )
    }
  ]
}
