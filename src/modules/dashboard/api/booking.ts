import axiosClient from '~/libs/axios/axiosClient'

export const getAllBookings = (page: number) => {
  const url = page ? `/booking?page=${page}` : '/booking'
  const data = axiosClient.get(url)
  return data
}

export const getAllBookingsOwner = (page: number) => {
  const url = page ? `/booking/owner?page=${page}` : '/booking/owner'
  const data = axiosClient.get(url)
  return data
}