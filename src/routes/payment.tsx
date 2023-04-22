import { Box } from '@chakra-ui/react'
import { Navigate, RouteObject } from 'react-router-dom'
import { Footer, Header } from '~/layouts/components'
import { HomePage } from '~/modules'
import { PaymentPage } from '~/modules'
import CashPaymentConfirmationPage from '~/modules/payment/pages/confirmation-cash'

export const paymentRoutes: RouteObject = {
  path: '/payment',
  element: (
    <Box>
      <Header />
      <PaymentPage />
      <Footer />
    </Box>
  )

  // {
  //   path: 'card-payment-confirm',
  //   element: (
  //     <Box>
  //       <Header />
  //       <CardPaymentConfirmPage />
  //       <Footer />
  //     </Box>
  //   )
  // }
}
