import { useState } from 'react'
import axios from 'axios'
import { Box, Text, Button, Spinner } from '@chakra-ui/react'
import { useParams } from 'react-router'
import { verifyPayment } from '../api/payment'

const VerifyPaymentPage = () => {
  const [orderStatus, setOrderStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const url = window.location.href
  const paymentUrl = url.split('/verify-payment/')[1];

  localStorage.setItem('paymentUrl', paymentUrl)

  const handleCheckOrder = async () => {
    setIsLoading(true)
    try {
      const response = await verifyPayment(paymentUrl)
      setOrderStatus(response.data)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  return (
    <Box textAlign='center' mt='10'>
      <Text fontSize='xl' mb='4'>
        Thank you for your purchase!
      </Text>
      <Text fontSize='md' mb='4'>
        Your Order ID: {213}
      </Text>
      <Button onClick={handleCheckOrder} disabled={isLoading} size='lg'>
        {isLoading ? <Spinner size='md' /> : 'Check Order Status'}
      </Button>
      {orderStatus && (
        <Box mt='6'>
          <Text fontSize='md'>Order Status: {orderStatus}</Text>
        </Box>
      )}
    </Box>
  )
}

export default VerifyPaymentPage
