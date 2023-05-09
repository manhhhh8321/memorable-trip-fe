import queryString from 'query-string'
import { trackPromise } from 'react-promise-tracker'
import { useQuery, useInfiniteQuery } from 'react-query'

import axiosClient from '~/libs/axios/axiosClient'
import { HttpResponse, PaginateData } from '~/models'

const getListProductFn = (params?: Record<string, unknown>): Promise<any> =>
  trackPromise(axiosClient.get('/room', { params }))

export const useQueryListProduct = (params?: Record<string, unknown>) => {
  return useQuery({
    queryFn: () => getListProductFn(params),
    queryKey: ['list-product', params],
    getNextPageParam: (lastPage) => lastPage.nextPage,
    refetchOnWindowFocus: false
  })
}

export const getAllRooms = (filter?: any) => {
  return trackPromise(axiosClient.get(`/room${filter}&limit=20`))
}

export const addOrRemoveWishlist = (id: string) => {
  return trackPromise(axiosClient.post('/wishlist', { roomId: id }))
}

export const getWishList = () => {
  return trackPromise(axiosClient.get('/wishlist'))
}
