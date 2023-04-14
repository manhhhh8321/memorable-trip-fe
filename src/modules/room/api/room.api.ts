import axiosClient from '~/libs/axios/axiosClient'

export const getRoomDetail = (id: string) => {
  const data = axiosClient.get(`/room/${id}`)

  return data
}

export const createRoom = (roomData: any) => {
  const data = axiosClient.post('/room', roomData)

  return data
}

export const uploadImage = (imageData: any) => {
  const data = axiosClient.post('/files/upload', imageData, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return data
}

export const deleteImage = (url: string) => {
  const data = axiosClient.delete(`/files/${url}`)

  return data
}

export const myListing = () => {
  const data = axiosClient.get('/room/user/my-listings')

  return data
}
