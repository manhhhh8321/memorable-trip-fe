import React, { useEffect, useState } from 'react'
import { RoomDto } from '../interface/room.interface'
import { Box, Image, Text } from '@chakra-ui/react'
import { myListing } from '../api/room.api'

const MyListing = () => {
  const [rooms, setRooms] = useState<RoomDto[] | null>(null)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await myListing()

        setRooms(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchRooms()
  }, [])

  if (rooms) {
    return (
      <Box display='flex' flexWrap='wrap' justifyContent='center'>
        {rooms.map((room: any) => (
          <Box key={room.roomName} maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' m='2' shadow='md'>
            <Image src={room.image[0]} alt={room.roomName} />
            <Box p='6'>
              <Box display='flex' alignItems='baseline'>
                <Text fontSize='2xl' fontWeight='semibold' mr='2'>
                  {room.roomName}
                </Text>
                <Text fontSize='lg' color='gray.500'>
                  {room.price}
                </Text>
              </Box>
              <Box>
                <Text fontWeight='semibold' mt='1'>
                  Living Rooms: {room.numberOfLivingRoom}
                </Text>
                <Text fontWeight='semibold' mt='1'>
                  Bedrooms: {room.numberOfBedroom}
                </Text>
                <Text fontWeight='semibold' mt='1'>
                  Beds: {room.numberOfBed}
                </Text>
                <Text fontWeight='semibold' mt='1'>
                  Bathrooms: {room.numberOfBathroom}
                </Text>
                <Text fontWeight='semibold' mt='1'>
                  Type: {room.roomType}
                </Text>
                <Text fontWeight='semibold' mt='1'>
                  About: {room.about}
                </Text>
                <Text fontWeight='semibold' mt='1'>
                  Description: {room.description}
                </Text>
                <Text fontWeight='semibold' mt='1'>
                  City: {room.city}
                </Text>
                <Text fontWeight='semibold' mt='1'>
                  Amenities:{' '}
                  {room.roomAmenities && room.roomAmenities.length > 0
                    ? room.roomAmenities.map((amenity: any) => amenity.amenities.name).join(', ')
                    : 'None'}
                </Text>
                <Text fontWeight='semibold' mt='1'>
                  Address: {room.address}
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default MyListing
