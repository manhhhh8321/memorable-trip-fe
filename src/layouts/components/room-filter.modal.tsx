import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Select,
  FormErrorMessage,
  Button,
  Box,
  Flex,
  Text,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { createRoom } from '~/modules/room/api/room.api'
import { AMENITIES, DESCRIPTION, RoomDto, VALID_PROVINCES_CODE } from '~/modules/room/interface/room.interface'
import roomSchema, { filterRoomSchema } from '~/modules/room/resolver/room.resolver'
import { RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb } from '@chakra-ui/react'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import { useNavigate } from 'react-router'
import queryString from 'query-string'
interface Props {
  isOpen: boolean
  onClose: () => void
}
export const RoomFilterModal = ({ isOpen, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<RoomDto>({
    resolver: zodResolver(filterRoomSchema)
  })
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [valuePriceRange, setValuePriceRange] = useState([500, 10000])

  const handleSliderChange = (newValue: any) => {
    setValuePriceRange(newValue)
  }
  const onSubmit = async (data: any) => {
    try {
      setSubmitting(true)
      console.log('aa', valuePriceRange)
      if (data.checkIn > data.checkOut) {
        toast.error('Check in date must be before check out date')
        return
      }

      data = {
        ...data,
        price: valuePriceRange[1],
        checkIn: data?.checkIn ? moment(data?.checkIn).format('YYYY-MM-DD') : null,
        checkOut: data?.checkOut ? moment(data?.checkOut).format('YYYY-MM-DD') : null
      }

      if (!data.checkIn || !data.checkOut) {
        delete data.checkIn
        delete data.checkOut
      }

      data?.city ? data.city : delete data.city
      data?.description ? data.description : delete data.description
      data?.roomType ? data.roomType : delete data.roomType

      const query = queryString.stringify(data)

      navigate(`/filter?${query}`)
    } catch (error: any) {
      toast.error(`Error submitting room data: ${error.response.data.message[0]}`)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filter Rooms</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id='price' isInvalid={!!errors.price}>
              <FormLabel htmlFor='price'>Price Range</FormLabel>
              <RangeSlider
                aria-label={['min', 'max']}
                defaultValue={[500, 10000]}
                min={500}
                max={10000}
                value={valuePriceRange}
                onChange={handleSliderChange}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <span>{valuePriceRange[0]}$</span>
                <span>{valuePriceRange[1]}$</span>
              </div>
              <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.roomType}>
              <FormLabel htmlFor='roomType'>Room Type</FormLabel>
              <Select {...register('roomType')}>
                <option value=''>Select room type</option>
                <option value='ROOM'>Room</option>
                <option value='ENTIRE_HOME'>Entire home</option>
                <option value='SHARED_ROOM'>Shared</option>
              </Select>
            </FormControl>

            <FormControl mt={5} isInvalid={!!errors.description}>
              <FormLabel htmlFor='description'>Description</FormLabel>
              <Select {...register('description')}>
                <option value=''>Select description</option>
                {DESCRIPTION.map((option: any, index) => (
                  <option key={option} value={index + 1}>
                    {option}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mt={5} isInvalid={!!errors.city}>
              <FormLabel htmlFor='city'>City</FormLabel>
              <Select {...register('city')} value={watch('city')} onChange={(e) => setValue('city', e.target.value)}>
                <option value=''>Select city</option>
                {VALID_PROVINCES_CODE.map((city: any, index) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mt={5} isInvalid={!!errors.amenities}>
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

            <FormControl mt={5} isInvalid={!!errors.checkIn}>
              <FormLabel htmlFor='checkIn'>Check-in Date</FormLabel>
              <ReactDatePicker
                selected={watch('checkIn')}
                onChange={(date: any) => setValue('checkIn', date)}
                minDate={new Date()}
                dateFormat='MM/dd/yyyy'
              />
              <FormErrorMessage>{errors.checkIn?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mt={5} isInvalid={!!errors.checkOut}>
              <FormLabel htmlFor='checkOut'>Check-in Date</FormLabel>
              <ReactDatePicker
                selected={watch('checkOut')}
                onChange={(date: any) => setValue('checkOut', date)}
                minDate={new Date()}
                dateFormat='MM/dd/yyyy'
              />
              <FormErrorMessage>{errors.checkIn?.message}</FormErrorMessage>
            </FormControl>

            <Box display={'flex'} mt={10} justifyContent={'flex-start'} alignItems={'center'}>
              <Button type='submit' isLoading={submitting} colorScheme='teal'>
                Apply
              </Button>
              <Button type='reset' ml={2}>
                Clear
              </Button>
            </Box>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
