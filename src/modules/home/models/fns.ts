import { listProducts } from "~/mocks"

export const sleep = (ms: number) => new Promise(res=>setTimeout(res, ms))

export const fakeGetLists = (params: any)=>{
  const {_start, _limit} = params;
  const res  = listProducts.slice(_start, _limit);
  return new Promise((resolve:any)=>setTimeout(resolve(({data:res})),1000))
}