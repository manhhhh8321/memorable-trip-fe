import { Navigate, RouteObject } from 'react-router-dom'
import { HomePage } from '~/modules'
import { PaymentPage } from '~/modules'

export const paymentRoutes: RouteObject = {
  path: '/payment',
  element: <PaymentPage />
}
