import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Icons } from '~/assets'

export const LeftPayment = () => {
  return (
    <VStack w={'55%'} alignItems={'left'}>
      <HStack alignItems={'left'}>
        <Icons.left />
        <Text fontSize={25} fontWeight={600}>
          Confirm and Payment
        </Text>
      </HStack>
      <Text as='em' fontSize={20} fontWeight={500}>
        Your trip
      </Text>
      <VStack as='form' w={'100%'} alignItems={'left'}>
        <HStack alignItems='start' w={'100%'}>
          <Box w={'100%'}>
            <Text as='em' fontWeight={500}>
              Date
            </Text>
            <Text>Ngày 17 - Ngày 23 tháng 4</Text>
          </Box>
          <Text textDecor='underline' cursor='pointer'>
            Edit
          </Text>
        </HStack>
      </VStack>
    </VStack>
  )
}
