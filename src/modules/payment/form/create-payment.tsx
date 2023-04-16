import { Box, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import { LeftPayment } from './payment-left'

export const CreatePayment = () => {
  return (
    <Box>
      <HStack>
        <LeftPayment />
      </HStack>
    </Box>
  )
}
