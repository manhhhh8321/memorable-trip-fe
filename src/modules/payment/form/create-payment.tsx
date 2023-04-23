import { Box, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import { LeftPayment } from './payment-left'
import { RightPayment } from './payment-right'
import ConfirmPaymentForm from './confirm-payment'
import { useLocation } from 'react-router-dom'

export const CreatePayment = () => {
  const location = useLocation()
  let bookingData = location?.state?.bookingData

  if (!bookingData) {
    bookingData = localStorage.getItem('bookingData')
    bookingData = JSON.parse(bookingData)
  }

  if (!bookingData) {
    return <div>Booking data is not available</div>
  }

  const { checkIn, checkOut, duration, roomId, totalPrice, totalDiscount } = bookingData

  return (
    <Box w={'100%'} pt={10} minH={'900px'}>
      <HStack w={'100%'} pos='relative' spacing={'80px'} alignItems={'start'} justifyContent='center'>
        {/* <LeftPayment />
        <RightPayment /> */}
        <ConfirmPaymentForm
          checkIn={checkIn}
          checkOut={checkOut}
          duration={duration}
          key={roomId}
          roomId={roomId}
          totalPrice={totalPrice}
          totalDiscount={totalDiscount}
        />
      </HStack>
    </Box>
  )
}
