import { useEffect, useState } from 'react'
import {
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Textarea
} from '@chakra-ui/react'
import { editRoomSchema } from '../resolver/room.resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AMENITIES, DESCRIPTION, VALID_PROVINCES_CODE } from '../interface/room.interface'
import { getRoomDetail, updateRoom } from '../api/room.api'
import { toast } from 'react-toastify'

interface EditRoomModalProps {
  isOpen: boolean
  onClose: () => void
  room: any
}

const EditRoomModal = ({ isOpen, onClose, room }: EditRoomModalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(editRoomSchema),
    defaultValues: {
      roomName: room.roomName,
      price: room.price,
      numberOfLivingRoom: room.numberOfLivingRoom,
      numberOfBedroom: room.numberOfBedroom,
      numberOfBed: room.numberOfBed,
      numberOfBathroom: room.numberOfBathroom,
      roomType: room.roomType,
      about: room.about,
      description: room.description,
      city: room.city,
      amenities: room.amenities,
      image: room.image,
      address: room.address,
      isActive: room.isActive
    }
  })

  useEffect(() => {
    const fetchRoomDetails = async () => {
      const roomDetails = await getRoomDetail(room.id)
      const rd = roomDetails.data

      setValue('roomName', rd.roomName)
      setValue('price', rd.price)
      setValue('numberOfLivingRoom', rd.numberOfLivingRoom)
      setValue('numberOfBedroom', rd.numberOfBedroom)
      setValue('numberOfBed', rd.numberOfBed)
      setValue('numberOfBathroom', rd.numberOfBathroom)
      setValue('roomType', rd.roomType)
      setValue('about', rd.about)
      setValue('description', rd.description.name)
      setValue('city', rd.city.name)
      setValue(
        'amenities',
        rd.roomAmenities?.map((ra: any) => ra.amenities.name)
      )
      setValue('image', rd.image)
      setValue('address', rd.address)

      rd.isActive ? setValue('isActive', 'true') : setValue('isActive', 'false')
    }

    fetchRoomDetails()
  }, [room.id, setValue])

  const onSubmit = async (data: any) => {
    try {
      delete data.image

      data.isActive = data.isActive === 'true' ? true : false
      const update = await updateRoom(room.id, data)

      if (update) {
        toast.success('Room updated successfully')
      }

      onClose()
    } catch (error: any) {
      toast.error('Error updating room: ' + error.response.data.message[0])
      console.error(error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit Room</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type='text' {...register('roomName')} />
              {errors.roomName && <FormErrorMessage>{errors.roomName.message?.toString()}</FormErrorMessage>}
            </FormControl>

            <FormControl>
              <FormLabel>About</FormLabel>
              <Textarea {...register('about')} />
              {errors.about && <FormErrorMessage>{errors.about.message?.toString()}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={!!errors.description}>
              <FormLabel htmlFor='description'>Description</FormLabel>
              <Select {...register('description')} disabled>
                {DESCRIPTION.map((option: any) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.description?.message?.toString()}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.city} {...register('city')}>
              <FormLabel htmlFor='city'>City</FormLabel>
              <Select disabled>
                {VALID_PROVINCES_CODE.map((city: any) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.city?.message?.toString()}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.address}>
              <FormLabel htmlFor='address'>Address</FormLabel>
              <Textarea {...register('address')} />
              <FormErrorMessage>{errors.address?.message?.toString()}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.numberOfLivingRoom}>
              <FormLabel htmlFor='numberOfLivingRoom'>Number of Living Rooms</FormLabel>
              <Input
                {...register('numberOfLivingRoom', {
                  valueAsNumber: true
                })}
                type='number'
              />
              <FormErrorMessage>{errors.numberOfLivingRoom?.message?.toString()}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.numberOfBedroom}>
              <FormLabel htmlFor='numberOfBedroom'>Number of Bedrooms</FormLabel>
              <Input
                {...register('numberOfBedroom', {
                  valueAsNumber: true
                })}
                type='number'
              />
              <FormErrorMessage>{errors.numberOfBedroom?.message?.toString()}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.numberOfBed}>
              <FormLabel htmlFor='numberOfBed'>Number of Beds</FormLabel>
              <Input
                {...register('numberOfBed', {
                  valueAsNumber: true
                })}
                type='number'
              />
              <FormErrorMessage>{errors.numberOfBed?.message?.toString()}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.numberOfBathroom}>
              <FormLabel htmlFor='numberOfBathroom'>Number of Bathrooms</FormLabel>
              <Input
                {...register('numberOfBathroom', {
                  valueAsNumber: true
                })}
                type='number'
              />
              <FormErrorMessage>{errors.numberOfBathroom?.message?.toString()}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Type</FormLabel>
              <Select {...register('roomType')}>
                <option value='ENTIRE_HOME'>Entire Home</option>
                <option value='ROOM'>Room</option>
                <option value='SHARED_ROOM'>Shared Room</option>
              </Select>
              {errors.roomType && <FormErrorMessage>{errors.roomType.message?.toString()}</FormErrorMessage>}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input type='number' {...register('price', { valueAsNumber: true })} />
              {errors.price && <FormErrorMessage>{errors.price.message?.toString()}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={!!errors.amenities}>
              <FormLabel htmlFor='amenities'>Amenities</FormLabel>
              <CheckboxGroup
                colorScheme='green'
                value={watch('amenities')}
                defaultValue={room.roomAmenities.map((ra: any) => ra.amenities.name)}
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

              <FormErrorMessage>{errors.amenities?.message?.toString()}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.isActive} mt={5}>
              <FormLabel htmlFor='isActive'>Room status</FormLabel>
              <Select {...register('isActive')}>
                <option value='true'>Active</option>
                <option value='false'>Inactive</option>
              </Select>
              <FormErrorMessage>{errors.isActive?.message?.toString()}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type='submit' colorScheme='teal' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default EditRoomModal
