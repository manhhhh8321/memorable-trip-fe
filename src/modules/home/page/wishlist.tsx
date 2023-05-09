import { Box, Grid, Stack, Text, calc, Spinner } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { CardItem } from '~/components'
import { listProducts } from '~/mocks'
import { getAllRooms, getWishList, useQueryListProduct } from '../api'
import { UseInfiniteQueryResult } from 'react-query'
import { debounce } from 'lodash'
import { Link, useNavigate } from 'react-router-dom'
import { RoomFilterModal } from '~/layouts/components/room-filter.modal'
import queryString from 'query-string'
type User = {
  id: number
  name: string
  // other properties
}

type ApiResponse = {
  users: User[]
  nextPage: number | null
}

export const WishList = () => {
  const [page, setPage] = useState(1)
  const [room, setRoom] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [currentDescription, setCurrentDescription] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [wishlist, setWishlist] = useState([])

  const fetchRoom = async (page: number) => {
    setIsLoading(true)

    const res = await getWishList()

    console.log('res', res)

    const roomData = res.data.map((item: any) => item.room)

    if (roomData.length === 0) {
      setHasMore(false)
    }

    console.log('roomData', roomData)

    setRoom((prev: any) => [...prev, ...roomData])

    setIsLoading(false)
  }
  const handleScroll = debounce(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1) // use functional update
    }
  }, 500)

  useEffect(() => {
    fetchRoom(page)
  }, [page])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const fetchWishList = async () => {
    try {
      const res = await getWishList()
      setWishlist(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    Promise.all([fetchWishList()])
  }, [])

  return (
    <Box p={10}>
      <Box>
        <Grid
          templateColumns={{ lg: 'repeat(4, 1fr)', xl: 'repeat(4, 1fr)', '2xl': 'repeat(6, 1fr)' }}
          gap={{ xl: 6, '2xl': 10 }}
        >
          {room &&
            room?.map((val: any, i: number) => (
              <Link key={i} to={`/room/${val?.id}`}>
                <CardItem key={i} data={val} isFavorite={wishlist?.some((item: any) => item?.room?.id === val?.id)} />
              </Link>
            ))}
        </Grid>
      </Box>
    </Box>
  )
}
