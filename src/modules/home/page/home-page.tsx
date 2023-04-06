import { Box, Grid, Stack, Text, calc } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { CardItem } from '~/components'
import { listProducts } from '~/mocks'
import { useQueryListProduct } from '../api'
import { UseInfiniteQueryResult } from 'react-query'
import { debounce } from 'lodash'
type User = {
  id: number
  name: string
  // other properties
}

type ApiResponse = {
  users: User[]
  nextPage: number | null
}
export const HomePage = () => {
  const [pagination, setPagination] = useState({
    _start: 1,
    _limit: 10
  })
  // const [hasMore, setHasMore] = useState(true);
  const listRef = useRef<any>(null)
  const { data, error, isLoading, isFetching, fetchMore, canFetchMore } = useQueryListProduct(pagination)
  const handleScroll = debounce(() => {
    // const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    // if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading && data && data?.pages?.length < pagination._limit) {
    //   setPagination({ ...pagination, _start: pagination._start + 1 }) // use functional update
    //   fetchMore()
    // }

    // Kiểm tra nếu đến cuối trang và không có fetchMore đang diễn ra

    if (
      listRef.current &&
      window.innerHeight + window.scrollY > listRef.current.offsetTop + listRef.current.offsetHeight 
    ) {
      setPagination({ ...pagination, _start: pagination._start + 1 })
      // listRef.current?.scrollIntoView()
      console.log(
        window.innerHeight + window.scrollY,
        listRef.current.offsetTop + listRef.current.offsetHeight,listRef.current.offsetTop,
        listRef.current.offsetHeight
      )
      window.scrollTo(0, listRef.current.offsetTop)
      // const lastPage = data && data[data?.length - 1]
      // console.log(lastPage)
      // fetchMore()
      console.log('second')
      return;
    }
      // fetchMore()

    console.log('first')
    setPagination({ ...pagination, _start: pagination._start + 1 })
  },500)
  // console.log(isFetchingMore)
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    console.log(pagination)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pagination])
  // const handleScroll = () => {
  //   if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
  //     fetchMore()
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll)

  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])
  console.log(isFetching)
  return (
    <Box>
      {/* <Grid
        ref={listRef}
        templateColumns={{ lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)', '2xl': 'repeat(5, 1fr)' }}
        rowGap={8}
        columnGap={6}
      >
        {listProducts.map((v, i) => (
          <Box key={i} w={'100%'}>
            <CardItem data={v} />
          </Box>
        ))}
      </Grid> */}
      <div ref={listRef}>
        {/* Render danh sách người dùng */}
        {data &&
          Array(10).fill(0)?.map((val: any,i) => (
            <Text key={i} p={10}>
              Text
            </Text>
          ))}
        {/* {data &&
          data.pages
            ?.map((page: any, i) =>
            page?.data?.map((val:any)=><Text key={i} p={10}>
                Text
              </Text>)
            )} */}

        {/* Hiển thị thông báo khi đang fetch dữ liệu */}
        {isLoading && <div>Loading...</div>}
      </div>
    </Box>
  )
}
