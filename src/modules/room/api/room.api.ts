import axiosClient from '~/libs/axios/axiosClient'

export const getRoomDetail = (id: string) => {
  const data = axiosClient.get(`/room/${id}`)

  return data
}
