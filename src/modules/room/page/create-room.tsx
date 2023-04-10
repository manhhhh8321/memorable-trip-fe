import { useState } from 'react'
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Checkbox,
  Button
} from '@chakra-ui/react'
import { RoomDto } from '../interface/room.interface'

const onSubmit = (roomDto: RoomDto) => {}

const CreateRoomForm = () => {
  const [roomDto, setRoomDto] = useState<RoomDto>({
    roomName: '',
    userId: 0,
    price: 0,
    numberOfLivingRoom: 0,
    numberOfBedroom: 0,
    numberOfBed: 0,
    numberOfBathroom: 0,
    roomType: '',
    about: '',
    description: '',
    city: '',
    amenities: [],
    image: [],
    address: ''
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(roomDto)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setRoomDto((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
    setRoomDto((prevState) => ({
      ...prevState,
      amenities: checked ? [...prevState.amenities, name] : prevState.amenities.filter((a) => a !== name)
    }))
  }

  return (
    <Box flexDirection={'row'} display={'flex'}>
      <Box maxW='xl' mx='auto' mt={8} borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='md'>
        <Box bg='gray.50' px={6} py={4}>
          <Heading as='h3' size='lg'>
            Create a New Room
          </Heading>
        </Box>
        <Box p={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor='roomName'>Room Name</FormLabel>
                <Input
                  type='text'
                  id='roomName'
                  name='roomName'
                  onChange={handleInputChange}
                  value={roomDto.roomName}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor='userId'>User ID</FormLabel>
                <Input type='number' id='userId' name='userId' onChange={handleInputChange} value={roomDto.userId} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor='price'>Price</FormLabel>
                <Input type='number' id='price' name='price' onChange={handleInputChange} value={roomDto.price} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor='numberOfLivingRoom'>Number of Living Rooms</FormLabel>
                <Input
                  type='number'
                  id='numberOfLivingRoom'
                  name='numberOfLivingRoom'
                  onChange={handleInputChange}
                  value={roomDto.numberOfLivingRoom}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor='numberOfBedroom'>Number of Bedrooms</FormLabel>
                <Input
                  type='number'
                  id='numberOfBedroom'
                  name='numberOfBedroom'
                  onChange={handleInputChange}
                  value={roomDto.numberOfBedroom}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor='numberOfBed'>Number of Beds</FormLabel>
                <Input
                  type='number'
                  id=' numberOfBed'
                  name='numberOfBed'
                  onChange={handleInputChange}
                  value={roomDto.numberOfBed}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor='numberOfBathroom'>Number of Bathrooms</FormLabel>
                <Input
                  type='number'
                  id='numberOfBathroom'
                  name='numberOfBathroom'
                  onChange={handleInputChange}
                  value={roomDto.numberOfBathroom}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor='roomType'>Room Type</FormLabel>
                <Select id='roomType' name='roomType' onChange={handleInputChange} value={roomDto.roomType}>
                  <option value='ROOM'>Room</option>
                  <option value='ENTIRE_HOME'>Entire home</option>
                  <option value='SHARED_ROOM'>Shared</option>
                </Select>
              </FormControl>
            </VStack>
          </form>
        </Box>
      </Box>
      <Box>Content</Box>
    </Box>
  )
}

export default CreateRoomForm
