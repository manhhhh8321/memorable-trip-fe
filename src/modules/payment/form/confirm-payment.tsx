import {
  Box,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  SimpleGrid,
  Image,
  VStack,
  Center,
  Select,
  Badge,
  Spinner
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getRoomDetail } from '~/modules/room/api/room.api'
import { createBooking, createPaymentUrl, setOrderToRedis } from '../api/payment'
import { useNavigate } from 'react-router'

interface PaymentFormProps {
  totalPrice: number
  totalDiscount: number
  checkIn: string
  checkOut: string
  duration: string
  roomId: string
}

const PaymentForm = ({ totalPrice, totalDiscount, checkIn, checkOut, duration, roomId }: PaymentFormProps) => {
  const navigate = useNavigate()
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const bookingData = {
      roomId,
      checkIn,
      checkOut,
      paymentType: paymentType ? paymentType : 'CASH'
    }
    setIsSubmitting(true)

    try {
      const booking = await createBooking(bookingData)
      localStorage.removeItem('bookingData')

      let paymentUrl = ''

      if (bookingData.paymentType === 'CARD') {
        const p = await createPaymentUrl({
          amount: totalPrice * 23000,
          orderId: booking.data.payment.id,
          orderDescription: `Payment for booking ${booking.data.payment.id}`
        })

        paymentUrl = p.data.url
        const url = paymentUrl.split('/verify-payment')[1]

        console.log('aaa', url)
        await setOrderToRedis({ url: url })
        localStorage.setItem('paymentUrl', paymentUrl)
      }

      setIsSubmitting(true)
      toast.success('Booking successfully')
      setIsSubmitting(false)

      navigate(`/payment/payment-confirm/${bookingData.paymentType}`)
    } catch (error: any) {
      setIsSubmitting(false)
      console.log(error)
      toast.error('Error: ' + error?.response?.data?.errors ?? 'Something went wrong')
    }
  }
  const [paymentType, setPaymentType] = useState('')
  const [ownerDetail, setOwnerDetail] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePaymentTypeChange = (event: any) => {
    setPaymentType(event.target.value)
  }

  const getOwnerDetail = async () => {
    try {
      const roomDetail = await getRoomDetail(roomId)

      setOwnerDetail(roomDetail.data.user)
    } catch (error: any) {
      toast.error('Error: ' + error.message)
    }
  }

  useEffect(() => {
    getOwnerDetail()
  }, [])

  return (
    <SimpleGrid columns={{ sm: 1, md: 2 }} spacing='10'>
      <Box p='6' boxShadow='lg' maxW='xl'>
        <Box borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Box p='6'>
            <Stack spacing='4'>
              <Text fontSize='xl' fontWeight='bold'>
                Owner information:
              </Text>
              <Text fontSize='l' fontWeight='bold'>
                {ownerDetail?.firstName} {ownerDetail?.lastName}
              </Text>
              <Box>
                <Badge colorScheme='purple'>Email</Badge>
                <Text>{ownerDetail?.email}</Text>
              </Box>
              <Box>
                <Badge colorScheme='green'>Phone</Badge>
                <Text>{ownerDetail?.phone}</Text>
              </Box>
              <Box>
                <Badge colorScheme='blue'>Gender</Badge>
                <Text>{ownerDetail?.gender}</Text>
              </Box>
              <Box>
                <Image src='https://bizapps.vn/web/image/product.template/79/image?unique=afca4b8'></Image>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>

      <Box p='6' boxShadow='lg' width={'100%'}>
        <Stack spacing='4'>
          <Text fontWeight='bold' fontSize='lg'>
            Confirm Payment
          </Text>
          <Box>
            <FormControl id='totalPrice' isDisabled>
              <FormLabel>Total Price</FormLabel>
              <Input type='number' value={totalPrice} />
            </FormControl>
          </Box>
          <Box>
            <FormControl id='totalDiscount' isDisabled>
              <FormLabel>Total Discount</FormLabel>
              <Input type='number' value={totalDiscount} />
            </FormControl>
          </Box>
          <Box>
            <FormControl id='checkIn' isDisabled>
              <FormLabel>Check-in</FormLabel>
              <Input type='text' value={checkIn} />
            </FormControl>
          </Box>
          <Box>
            <FormControl id='paymentType' isRequired>
              <FormLabel>Payment Type</FormLabel>
              <Select value={paymentType} onChange={handlePaymentTypeChange}>
                <option value='CASH'>Cash</option>
                <option value='CARD'>Credit</option>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl id='checkOut' isDisabled>
              <FormLabel>Check-out</FormLabel>
              <Input type='text' value={checkOut} />
            </FormControl>
          </Box>
          <Box>
            <FormControl id='duration' isDisabled>
              <FormLabel>Duration</FormLabel>
              <Input type='text' value={duration} />
            </FormControl>
          </Box>
          <Box>
            <form onSubmit={handleSubmit}>
              <Button type='submit' colorScheme='green' isDisabled={isSubmitting}>
                {isSubmitting ? <Spinner size='sm' color='white' /> : 'Confirm Payment'}
              </Button>
            </form>
          </Box>
        </Stack>
      </Box>
    </SimpleGrid>
  )
}

export default PaymentForm
