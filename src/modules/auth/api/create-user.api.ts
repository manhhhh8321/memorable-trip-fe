import axiosClient from '~/libs/axios/axiosClient'

export const postRegister = async (body: any) => {
  const response = await axiosClient.post('/auth/register', body)
  return response
}
