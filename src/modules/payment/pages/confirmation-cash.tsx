import React, { useState } from 'react'
import { Box, Button, Flex, Heading, Icon, Link, Text } from '@chakra-ui/react'
import { FiCheckCircle } from 'react-icons/fi'
import { Link as RouterLink, useParams } from 'react-router-dom'
import axios from 'axios'

const PaymentConfirmationPage = () => {
  const [paymentUrl, setPaymentUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { type } = useParams<{ type: string }>()

  if (type !== 'CARD' && type !== 'CASH') {
    return (
      <Box>
        <Text>Invalid payment type. Please go back to</Text>

        <Link as={RouterLink} to='/' border={'1px'}>
          Homepage
        </Link>
      </Box>
    )
  }

  const handleClick = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post('/api/create-payment')
      setPaymentUrl(response.data.paymentUrl)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  return (
    <Box p={8} textAlign='center'>
      <Icon as={FiCheckCircle} boxSize={12} color='green.500' mb={6} />
      <Heading as='h1' mb={4}>
        Your booking has been created!
      </Heading>
      <Text mb={6}>
        A confirmation email has been sent to your email address. Please check your inbox and spam folder if you don't
        see it in your inbox.
      </Text>
      {paymentType === 'CARD' ? (
        paymentUrl ? (
          <Box>
            <Text mb={4}>Please complete your payment using the following link:</Text>
            <Link href={paymentUrl} target='_blank' rel='noreferrer'>
              <Button colorScheme='blue' size='lg'>
                Pay Now
              </Button>
            </Link>
          </Box>
        ) : (
          <Button colorScheme='blue' size='lg' onClick={handleClick} isLoading={isLoading}>
            Pay Now
          </Button>
        )
      ) : (
        <Text>Thank you for your payment.</Text>
      )}
      <Flex justifyContent='center' mt={6}>
        <Link as={RouterLink} to='/'>
          <Button colorScheme='blue' size='lg'>
            Go Back
          </Button>
        </Link>
      </Flex>
    </Box>
  )
}

export default PaymentConfirmationPage
