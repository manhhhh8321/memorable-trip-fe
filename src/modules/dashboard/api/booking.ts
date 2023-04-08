import axiosClient from '~/libs/axios/axiosClient'

export const getAllBookings = (page: number) => {
  const url = page ? `/booking?page=${page}` : '/booking'
  const data = axiosClient.get(url)
  return data
}
