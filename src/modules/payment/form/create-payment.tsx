import { Box, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import { LeftPayment } from './payment-left'
import { RightPayment } from './payment-right'

export const CreatePayment = () => {
  return (
    <Box w={'100%'} pt={10} minH={'900px'}>
      <HStack w={'100%'} pos='relative' spacing={'80px'} alignItems={'start'} justifyContent='center'>
        <LeftPayment />
        <RightPayment />
      </HStack>
    </Box>
  )
}
