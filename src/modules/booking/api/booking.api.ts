import axiosClient from '~/libs/axios/axiosClient'

export const updateBooking = (id: string, booking: any) => {
  return axiosClient.patch(`/booking/${id}`, booking)
}
