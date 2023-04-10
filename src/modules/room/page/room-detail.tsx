import React, { useState, useEffect } from 'react'
import { Room, RoomAmenity } from '../interface/room.interface'
import { getRoomDetail } from '../api/room.api'
import { useParams } from 'react-router'
import { Box, Flex, SimpleGrid, Stack, Text } from '@chakra-ui/layout'
import { Avatar, Icon, Image, Tag, Wrap, WrapItem } from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import { FaHome, FaBuilding, FaCaretSquareUp } from 'react-icons/fa'
import { MdLocationCity, MdOutlineVilla, MdHouseboat, MdOutlineCabin } from 'react-icons/md'
import { BsHouseDoor } from 'react-icons/bs'
import { AiFillHome } from 'react-icons/ai'
import { RiStore3Fill, RiHome3Line } from 'react-icons/ri'
import { BsTree } from 'react-icons/bs'
import BookCalendar from './calendar'
import 'react-datepicker/dist/react-datepicker.css'
import Footer from './footer'

interface RoomDetailProps {
  roomId: number
}

const descriptionIcons = [
  <FaHome key='home' />,
  <BsHouseDoor key='apartment' />,
  <MdOutlineVilla key='villa' />,
  <MdLocationCity key='condo' />,
  <RiStore3Fill key='townhouse' />,
  <MdOutlineCabin key='cabin' />,
  <AiFillHome key='bungalow' />,
  <FaCaretSquareUp key='loft' />,
  <RiHome3Line key='studio' />,
  <BsTree key='treehouse' />,
  <MdHouseboat key='boat' />
]

export const RoomDetailPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>()
  const [room, setRoom] = useState<Room>()

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  useEffect(() => {
    const fetchRoomDetail = async () => {
      if (!roomId) return
      const data = await getRoomDetail(roomId)

      setRoom(data.data)
    }
    fetchRoomDetail()
  }, [roomId])

  if (!room) {
    return <div>Loading...</div>
  }

  const {
    id,
    roomType,
    roomName,
    price,
    about,
    numberOfLivingRoom,
    numberOfBedroom,
    numberOfBed,
    numberOfBathroom,
    address,
    image,
    city,
    description,
    user,
    bookingDate,
    roomAmenities
  } = room

  console.log(roomAmenities && roomAmenities.length > 0)
  return (
    <Flex flexDirection={'column'}>
      <Flex>
        <Flex justifyContent='center' marginTop={'30'}>
          <SimpleGrid columns={[1, 1, 2]} spacing={10} width='80%'>
            <Box>
              <Slider {...settings}>
                {image.length > 0 ? (
                  image.map((img: any) => (
                    <div key={img.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Image src={img.url} alt='Room' width='100%' />
                    </div>
                  ))
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      src='~/assets/images/no-image.png'
                      fallbackSrc={'https://ik.imagekit.io/qapuv5cpu/default-image.jpg?updatedAt=1678803179331'}
                      alt='Default Room'
                      width='100%'
                    />
                  </div>
                )}
              </Slider>
            </Box>
            <Box pl={'20'}>
              <Box mb={5}>
                <Text fontSize='2xl' fontWeight='bold'>
                  {roomName}
                </Text>
                <Text fontSize='lg' color='gray.500' mt={2}>
                  {about}
                </Text>
              </Box>
              <Box mb={5}>
                <Stack direction='row' alignItems='center' spacing={2}>
                  <Box bg='gray.100' borderRadius='md' px={3} py={1}>
                    <Text fontSize='sm' color='gray.500' fontWeight='bold'>
                      {roomType.toLowerCase().replace('_', ' ')}
                    </Text>
                  </Box>
                  <Text fontSize='sm' color='gray.500'>
                    {` • 5 guests`}
                  </Text>
                  <Text fontSize='sm' color='gray.500'>
                    {` • ${numberOfLivingRoom} living room${numberOfLivingRoom > 1 ? 's' : ''}`}
                  </Text>
                  <Text fontSize='sm' color='gray.500'>
                    {` • ${numberOfBedroom} bedroom${numberOfBedroom > 1 ? 's' : ''}`}
                  </Text>
                  <Text fontSize='sm' color='gray.500'>
                    {` • ${numberOfBed} bed${numberOfBed > 1 ? 's' : ''}`}
                  </Text>
                  <Text fontSize='sm' color='gray.500'>
                    {` • ${numberOfBathroom} bathroom${numberOfBathroom > 1 ? 's' : ''}`}
                  </Text>
                </Stack>
                <Text fontSize='sm' color='gray.500' mt={2}>
                  Hosted by {user.firstName} {user.lastName}
                </Text>
              </Box>
              <Box mb={5}>
                <Text fontSize='xl' color='gray.500' fontWeight='bold'>
                  {address}
                </Text>
              </Box>
              <Box mb={5}>
                <Text fontSize='lg' fontWeight='bold' mb={2}>
                  About this place
                </Text>
                <Flex alignItems='center' mb={2}>
                  <Box mr={2}>{descriptionIcons[description.id]}</Box>
                  <Text fontSize='lg' color='gray.500' lineHeight='tall'>
                    {description.name}
                  </Text>
                </Flex>
                <Box>
                  <Text fontSize='lg' fontWeight='bold' mb={2}>
                    Amenities
                  </Text>
                  {roomAmenities && roomAmenities.length > 0 ? (
                    <Wrap spacing={2}>
                      {roomAmenities.map((amenity: RoomAmenity) => (
                        <WrapItem key={amenity.amenitiesId}>
                          <Tag size='sm' variant='subtle' colorScheme='teal'>
                            {amenity.amenities.name}
                          </Tag>
                        </WrapItem>
                      ))}
                    </Wrap>
                  ) : (
                    <Text>No amenities available.</Text>
                  )}
                </Box>
              </Box>
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>

      <Flex flexDirection={'row'} mt={8}>
        <Box pl={20} ml={16} width={'60%'}>
          <Text fontSize='3xl' color='gray.500' lineHeight='tall'>
            {description.name}, {city.name}, {address}
          </Text>
          <Text mt={8} fontSize='lg' color='gray.500' lineHeight='tall'>
            Welcome to our lovely property located in the heart of {city.name}. Our goal is to provide you with a
            comfortable and memorable stay in one of the most vibrant cities in the world. Our property features{' '}
            {numberOfBedroom} bedrooms, {numberOfBathroom} bathrooms, and {numberOfBed} beds, making it perfect for
            families or groups of friends.
            {roomAmenities.length > 0 && (
              <span>
                With amenities like {roomAmenities.map((amenity) => amenity.amenities.name).join(', ')}, you'll have
                everything you need to feel right at home.
              </span>
            )}
            Book your stay with us today and experience the best that {city.name} has to offer.
          </Text>
        </Box>
        <Box width='30%' ml={10}>
          <Box mb={5} position='sticky' top={20}>
            <BookCalendar roomId={id} pricePerNight={price} />
          </Box>
        </Box>
      </Flex>
      <Footer />
    </Flex>
  )
}

export default RoomDetailPage
