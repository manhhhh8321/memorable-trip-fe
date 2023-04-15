import { SimpleGrid, Button } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import axios from 'axios'
import RoomCard from './room-card'
import { getRoomByUser } from '../api/room.api'

const MyListing = () => {
  const {
    data: rooms,
    isLoading,
    error
  } = useQuery('rooms', async () => {
    const response = await getRoomByUser()
    const d = response.data
    return response.data
  })

  if (isLoading) {
    return (
      <Button isLoading loadingText='Loading...'>
        Loading
      </Button>
    )
  }

  console.log('rooms', rooms)

  if (!rooms) {
    return <div>No rooms found</div>
  }

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing='40px' px='10' py='20' bg='gray.50' borderRadius='xl'>
      {rooms && rooms.length && rooms?.map((room: any) => <RoomCard key={room.id} room={room} />)}
    </SimpleGrid>
  )
}

export default MyListing
