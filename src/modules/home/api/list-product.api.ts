import { trackPromise } from 'react-promise-tracker'
import { useQuery, useInfiniteQuery } from 'react-query'


import axiosClient from '~/libs/axios/axiosClient'
import { HttpResponse, PaginateData } from '~/models'

const getListProductFn = (params?: Record<string, unknown>): Promise<any> =>
  trackPromise(axiosClient.get('/posts', { params }))

export const useQueryListProduct = (params?: Record<string, unknown>) => {
  return useInfiniteQuery({
    queryFn: () => getListProductFn(params),
    queryKey: ['list-product', params],
    getNextPageParam: (lastPage) => lastPage.nextPage,
    refetchOnWindowFocus: false
  })
}
