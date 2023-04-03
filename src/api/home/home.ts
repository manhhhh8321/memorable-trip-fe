import { trackPromise } from 'react-promise-tracker'
import { useQuery } from 'react-query'
import axiosClient from '~/libs/axios/axiosClient'
import { HttpResponse, PaginateData } from '~/models'


// import type { TBroadcast } from "../models";

const getListProductHomeFn = (params: Record<string, unknown>): Promise<HttpResponse<PaginateData<any[]>>> =>
  trackPromise(axiosClient.get('/notification/broadcast', { params }))

export const useQueryListBroadcast = (params: Record<string, unknown>) => {
  return useQuery({
    queryFn: () => getListProductHomeFn(params),
    queryKey: ['listBroadcast', params]
  })
}
