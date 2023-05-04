import axiosClient from '~/libs/axios/axiosClient'

export const getUserDetail = (id?: string) => {
  return axiosClient.get(`/user/${id}`)
}

export const updateUser = (id: string, data: any) => {
  return axiosClient.put(`/user/${id}`, data)
}
