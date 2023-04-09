import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Heading, Text } from '@chakra-ui/react'
import { CreateBookingDto, PaymentType } from '../interface/room.interface'
import RangePicker from 'react-datepicker'
import '../css/book-calendar.css'

interface BookCalendarProps {
  roomId: number
  pricePerNight: number
}

const BookCalendar: React.FC<BookCalendarProps> = ({ roomId, pricePerNight }) => {
  const navigate = useNavigate()
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)
  const [totalPrice, setTotalPrice] = useState<number | null>(null)

  const handleDateSelect = (date: [Date, Date]) => {
    setCheckIn(date[0])
    setCheckOut(date[1])

    const diffInDays = Math.ceil((date[1].getTime() - date[0].getTime()) / (1000 * 3600 * 24))
    setTotalPrice(diffInDays * pricePerNight)
  }

  const handleSubmit = () => {
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

  return (
    <Box>
      <Heading size='md' mb={4}>
        Select your dates
      </Heading>
      <Box mb={4}>
        {checkIn && checkOut && (
          <Text>{`Selected dates: ${checkIn.toLocaleDateString()} - ${checkOut.toLocaleDateString()}`}</Text>
        )}
        {totalPrice && <Text>Total price: ${totalPrice}</Text>}
      </Box>
      <Box>
        <Box className='date-picker'>
          <RangePicker
            selected={checkIn}
            onChange={handleDateSelect}
            selectsRange={true}
            startDate={checkIn}
            endDate={checkOut}
            minDate={new Date()}
            dateFormat='MMMM d, yyyy'
            className='react-datepicker'
          />
        </Box>

        <Box>
          <Button mt={8} disabled={!checkIn || !checkOut || !totalPrice} onClick={handleSubmit}>
            Book now
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default BookCalendar
