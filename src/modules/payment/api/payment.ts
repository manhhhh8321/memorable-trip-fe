import axiosClient from '~/libs/axios/axiosClient'

export const createBooking = (data: any) => {
  return axiosClient.post('/booking', data) 
}
