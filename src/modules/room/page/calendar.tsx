import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, Heading, Text } from '@chakra-ui/react'
import { CreateBookingDto, PaymentType } from '../interface/room.interface'
import RangePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../css/book-calendar.css'
import { getRoomUnavailableDates } from '../api/room.api'
import UnavailableDatesModal from './unavailabledates-modal'

interface BookCalendarProps {
  roomId: string
  pricePerNight: number
}

const BookCalendar: React.FC<BookCalendarProps> = ({ roomId, pricePerNight }) => {
  const navigate = useNavigate()
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)
  const [totalPrice, setTotalPrice] = useState<number | null>(null)
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([])
  const [showModal, setShowModal] = useState(false)

  const handleDateSelect = (date: [Date, Date]) => {
    // Check if any dates in the range are unavailable
    const unavailable = unavailableDates.some(
      (unavailableDate) => date[0] <= unavailableDate && unavailableDate <= date[1]
    )
    if (unavailable) {
      setShowModal(true)
    } else {
      setCheckIn(date[0])
      setCheckOut(date[1])

      const diffInDays = Math.ceil((date[1].getTime() - date[0].getTime()) / (1000 * 3600 * 24))
      setTotalPrice(diffInDays * pricePerNight)
    }
  }
  
  const handleSubmit = () => {
    navigate(navigationFn.PAYMENT)
    if (checkIn && checkOut && totalPrice) {
      const bookingData: CreateBookingDto = {
        roomId,
        paymentType: PaymentType.CARD,
        checkIn,
        checkOut
      }
      navigate('/booking', {
        state: {
          bookingData,
          totalPrice
        }
      })
    }
  }

  useEffect(() => {
    getRoomUnavailableDates(roomId).then((res) => {
      setUnavailableDates(res.data)
    })
  }, [roomId])

  return (
    <Card maxWidth='md' mx='auto' my={8} p={8} borderRadius='xl' boxShadow='xl' textAlign='center'>
      <Heading size='md' mb={4} textAlign='center' fontFamily='heading' fontWeight='bold' color='gray.800'>
        Select your dates
      </Heading>
      <Button onClick={() => setShowModal(true)}>Show unavailable dates</Button>
      {showModal && (
        <UnavailableDatesModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          unavailableDates={unavailableDates}
        />
      )}
      <Box mb={4} textAlign='center'>
        {checkIn && checkOut && (
          <Text fontSize='lg' mb={2}>
            Selected dates: <b>{checkIn.toLocaleDateString()}</b> - <b>{checkOut.toLocaleDateString()}</b>
          </Text>
        )}
        {totalPrice && (
          <Text fontSize='lg'>
            Total price: <b>${totalPrice}</b>
          </Text>
        )}
      </Box>

      <RangePicker
        selected={checkIn}
        onChange={handleDateSelect}
        selectsRange={true}
        startDate={checkIn}
        endDate={checkOut}
        minDate={new Date()}
        dateFormat='MMMM d, yyyy'
        placeholderText='Select dates here'
      />
      <Box mt={4}>
        <Button
          disabled={!checkIn || !checkOut || !totalPrice}
          onClick={handleSubmit}
          bg='blue.500'
          color='white'
          _hover={{ bg: 'blue.600' }}
          _active={{ bg: 'blue.700' }}
          borderRadius='full'
          px={8}
          py={4}
          fontSize='lg'
          fontWeight='medium'
          cursor='pointer'
        >
          Book now
        </Button>
      </Box>
    </Card>
  )
}

export default BookCalendar
