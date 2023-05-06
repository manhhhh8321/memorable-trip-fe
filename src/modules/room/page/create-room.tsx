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
  Button,
  Flex,
  Icon,
  FormErrorMessage,
  CheckboxGroup,
  HStack,
  Text,
  Stack
} from '@chakra-ui/react'
import { AMENITIES, DESCRIPTION, RoomDto, VALID_PROVINCES_CODE } from '../interface/room.interface'
import { BsPlusCircle } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import roomSchema from '../resolver/room.resolver'
import ImageInput from './image-input'
import { createRoom, uploadImage } from '../api/room.api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const CreateRoomForm = () => {
  const [submitting, setSubmitting] = useState(false)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string[] | null>(null)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<RoomDto>({
    resolver: zodResolver(roomSchema)
  })

  const onSubmit = async (data: RoomDto) => {
    try {
      setSubmitting(true)
      const roomData = { ...data, image: uploadedImageUrl }

      const room = await createRoom(roomData)

      if (room) {
        toast.success('Room created successfully!')
        navigate('/my-listings')
      }
    } catch (error: any) {
      toast.error(`Error submitting room data: ${error.response.data.message[0]}`)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <VStack justifyContent={'center'} width={'100%'}>
      <Box display={'flex'} maxW='2xl' mt={16} pb={10} mb={10} width={'100%'}>
        <Box
          width={'100%'}
          maxW='2xl'
          mx='auto'
          borderWidth='1px'
          borderRadius='lg'
          overflow='hidden'
          boxShadow='md'
          bg='gray.50'
          p={6}
        >
          <Box textAlign={'center'}>
            <Flex justifyContent={'center'}>
              <Box mr={4}>
                <Icon as={BsPlusCircle} boxSize={8} color='teal.500' />
              </Box>
              <Heading as='h3' size='lg' fontWeight='bold'>
                Setup a new room!
              </Heading>
            </Flex>
          </Box>

          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4}>
                <FormControl id='roomName' isInvalid={!!errors.roomName}>
                  <FormLabel htmlFor='roomName'>Room Name</FormLabel>
                  <Input {...register('roomName')} />
                  <FormErrorMessage>{errors.roomName?.message}</FormErrorMessage>
                </FormControl>
                <FormControl id='price' isInvalid={!!errors.price}>
                  <FormLabel htmlFor='price'>Price</FormLabel>
                  <Input
                    {...register('price', {
                      valueAsNumber: true
                    })}
                  />
                  <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.numberOfLivingRoom}>
                  <FormLabel htmlFor='numberOfLivingRoom'>Number of Living Rooms</FormLabel>
                  <Input
                    {...register('numberOfLivingRoom', {
                      valueAsNumber: true
                    })}
                    type='number'
                  />
                  <FormErrorMessage>{errors.numberOfLivingRoom?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.numberOfBedroom}>
                  <FormLabel htmlFor='numberOfBedroom'>Number of Bedrooms</FormLabel>
                  <Input
                    {...register('numberOfBedroom', {
                      valueAsNumber: true
                    })}
                    type='number'
                  />
                  <FormErrorMessage>{errors.numberOfBedroom?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.numberOfBed}>
                  <FormLabel htmlFor='numberOfBed'>Number of Beds</FormLabel>
                  <Input
                    {...register('numberOfBed', {
                      valueAsNumber: true
                    })}
                    type='number'
                  />
                  <FormErrorMessage>{errors.numberOfBed?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.numberOfBathroom}>
                  <FormLabel htmlFor='numberOfBathroom'>Number of Bathrooms</FormLabel>
                  <Input
                    {...register('numberOfBathroom', {
                      valueAsNumber: true
                    })}
                    type='number'
                  />
                  <FormErrorMessage>{errors.numberOfBathroom?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.roomType}>
                  <FormLabel htmlFor='roomType'>Room Type</FormLabel>
                  <Select {...register('roomType')}>
                    <option value='ROOM'>Room</option>
                    <option value='ENTIRE_HOME'>Entire home</option>
                    <option value='SHARED_ROOM'>Shared</option>
                  </Select>
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.about}>
                  <FormLabel htmlFor='about'>About</FormLabel>
                  <Textarea {...register('about')} />
                  <FormErrorMessage>{errors.about?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.description}>
                  <FormLabel htmlFor='description'>Description</FormLabel>
                  <Select {...register('description')}>
                    {DESCRIPTION.map((option: any) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.city}>
                  <FormLabel htmlFor='city'>City</FormLabel>
                  <Select
                    {...register('city')}
                    value={watch('city')}
                    onChange={(e) => setValue('city', e.target.value)}
                  >
                    {VALID_PROVINCES_CODE.map((city: any) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.amenities}>
                  <FormLabel htmlFor='amenities'>Amenities</FormLabel>
                  <CheckboxGroup
                    colorScheme='green'
                    value={watch('amenities')}
                    onChange={(values: any) => setValue('amenities', values)}
                  >
                    <Stack direction='column'>
                      {AMENITIES.map((amenity: string) => (
                        <Checkbox key={amenity} value={amenity}>
                          {amenity}
                        </Checkbox>
                      ))}
                    </Stack>
                  </CheckboxGroup>
                  <FormErrorMessage>{errors.amenities?.message}</FormErrorMessage>
                </FormControl>
                <Box border={'1px'} borderStyle={'dashed'} width={'100%'}>
                  <VStack spacing={4}>
                    <Flex alignItems='center'>
                      <ImageInput onImageUploaded={setUploadedImageUrl} />
                    </Flex>
                  </VStack>
                </Box>
                <FormControl isRequired isInvalid={!!errors.address}>
                  <FormLabel htmlFor='address'>Address</FormLabel>
                  <Textarea {...register('address')} />
                  <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
                </FormControl>
              </VStack>
              <Button mt={10} type='submit' isLoading={submitting}>
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </VStack>
  )
}

export default CreateRoomForm
