import { useState, useEffect } from 'react'
import { Box, Text, Button, Spinner } from '@chakra-ui/react'
import { getOrderFromRedis, setOrderToRedis, verifyPayment } from '../api/payment'
import { CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const VerifyPaymentPage = () => {
  const [orderStatus, setOrderStatus] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [orderId, setOrderId] = useState<string | null>(null)
  const navigate = useNavigate()
  useEffect(() => {
    const url = window.location.href.split('/verify-payment')[1]
    localStorage.setItem('paymentUrl', url)
    const qs = new URLSearchParams(url)
    const orderId = qs.get('vnp_TxnRef')
    setOrderId(orderId)
    verifyOrderStatus()
  }, [])

  const verifyOrderStatus = async () => {
    try {
      const url = localStorage.getItem('paymentUrl')

      const isOrderExist = await getOrderFromRedis({ url: url })
      if (!isOrderExist.data) {
        toast.error('Order not found')
        setOrderStatus(false)
        // navigate('/')
      } else {
        const response = await verifyPayment({ url: url })
        setOrderStatus(true)
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
    setIsLoading(false)
  }

  const goHomePage = () => {
    navigate('/')
  }

  return (
    <Box textAlign='center' mt='10'>
      {isLoading ? (
        <Spinner size='xl' />
      ) : (
        <>
          <Text fontSize='3xl' mb='8'>
            Thank you for your purchase!
          </Text>
          <Text fontSize='xl' mb='8'>
            Your Order ID: {orderId}
          </Text>
          {orderStatus ? (
            <Box mt='12'>
              <CheckCircleIcon w={16} h={16} color='green.500' mx='auto' />
              <Text fontSize='2xl' mt='4'>
                Your payment is completed.
              </Text>
              <Button colorScheme='blue' size='lg' mt='4' onClick={goHomePage}>
                Go to Homepage
              </Button>
            </Box>
          ) : (
            <Box mt='12'>
              <NotAllowedIcon w={16} h={16} color='red.500' mx='auto' />
              <Text fontSize='2xl' mt='4'>
                Your payment failed. Please try again.
              </Text>
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export default VerifyPaymentPage
