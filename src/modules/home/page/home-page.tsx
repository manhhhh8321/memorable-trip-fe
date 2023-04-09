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
    page: 2,
    limit: 20
  })
  // const [hasMore, setHasMore] = useState(true);
  const listRef = useRef<any>(null)
  const { data, error, isLoading, isFetching, fetchMore, canFetchMore } = useQueryListProduct(pagination)
  console.log(data)
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
        listRef.current.offsetTop + listRef.current.offsetHeight,
        listRef.current.offsetTop,
        listRef.current.offsetHeight
      )
      window.scrollTo(0, listRef.current.offsetTop)
      // const lastPage = data && data[data?.length - 1]
      // console.log(lastPage)
      // fetchMore()
      console.log('second')
      return
    }
    // fetchMore()

    setPagination({ ...pagination, _start: pagination._start + 1 })
  }, 500)
  // console.log(isFetchingMore)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

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
      <Box>
        <Grid templateColumns={{ lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)', '2xl': 'repeat(6, 1fr)' }} gap={{lg:8,xl:8,'2xl': 10}}>
          {data && data?.data?.items?.map((val: any, i: number) => <CardItem key={i} data={val} />)}
        </Grid>
      </Box>
    </Box>
  )
}
