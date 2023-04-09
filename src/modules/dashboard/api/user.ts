import axiosClient from '~/libs/axios/axiosClient'
import { User } from '../components/manage-user'

export const getUsers = (page?: number) => {
  const url = page ? `/user?page=${page}` : '/user'
  return axiosClient
    .get(url)
    .then((res) => {
      return res.data as User[]
    })
    .catch((err) => {
      return err
    })
}

export const getUserDetail = (id: string) => {
  return axiosClient
    .get(`/user/${id}`)
    .then((res) => {
      return res.data as User
    })
    .catch((err) => {
      return err
    })
}

export const editUser = (id: string, data: User) => {
  return axiosClient.put(`/user/${id}`, data).then((res) => {
    return res.data as User
  })
}

export const deleteUser = (id: string) => {
  return axiosClient.delete(`/user/${id}`).then((res) => {
    return res.data as User
  })
}
