import { Box, Grid, Stack, Text, calc, Spinner } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { CardItem } from '~/components'
import { listProducts } from '~/mocks'
import { getAllRooms, useQueryListProduct } from '../api'
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

export const HomePage = (filter?: any) => {
  const [page, setPage] = useState(1)
  const [room, setRoom] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [currentDescription, setCurrentDescription] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchRoom = async (page: number) => {
    setIsLoading(true)

    const { description } = filter

    if (description?.description !== currentDescription || filter.filter) {
      setCurrentDescription(description?.description)
      setRoom([]) // reset rooms array
      setPage(1) // reset page number
      setHasMore(true) // reset hasMore flag
    }

    const pageQuery = queryString.stringify({ page })
    let query = ''

    filter?.filter ? (query = `${filter.filter}&${pageQuery}`) : (query = `?${pageQuery}`)
    console.log(query)
    const res = await getAllRooms(query)

    if (res.data.items.length === 0) {
      setHasMore(false)
    }

    setRoom((prev: any) => [...prev, ...res.data.items])

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
  }, [page, filter])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Box>
      <Box>
        <Grid
          templateColumns={{ lg: 'repeat(4, 1fr)', xl: 'repeat(4, 1fr)', '2xl': 'repeat(6, 1fr)' }}
          gap={{ xl: 6, '2xl': 10 }}
        >
          {room &&
            room?.map((val: any, i: number) => (
              <Link key={i} to={`/room/${val?.id}`}>
                <CardItem key={i} data={val} />
              </Link>
            ))}
        </Grid>
      </Box>
    </Box>
  )
}
