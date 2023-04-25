import axiosClient from '~/libs/axios/axiosClient'

export const createBooking = (data: any) => {
  return axiosClient.post('/booking', data)
}

export const createPaymentUrl = (data: any) => {
  const { amount, orderId, orderDescription } = data
  return axiosClient.get(
    `/payment/create-payment-url?amount=${amount}&orderId=${orderId}&orderDescription=${orderDescription}`
  )
}

export const verifyPayment = (data: any) => {
  return axiosClient.put(`/payment/verify-payment`, data)
}

export const setOrderToRedis = (data: any) => {
  return axiosClient.post(`/payment/save-order-redis`, data)
}

export const getOrderFromRedis = (data: any) => {
  return axiosClient.get(`/payment/get-order-redis?orderId=${data}`)
}

export const deleteOrderFromRedis = (data: any) => {
  return axiosClient.delete(`/payment/delete-order-redis?orderId=${data}`)
}
