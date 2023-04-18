import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Icons } from '~/assets'

export const RightPayment = () => {
  return (
    <Box w={'40%'} pos={'relative'} minH={400}>
      <VStack
        w={'100%'}
        border={'1px solid #ccc'}
        borderRadius={10}
        justifyContent={'flex-start'}
        pos='fixed'
      >
        <HStack w={'100%'} alignItems={'start'} justifyContent={'flex-start'}>
          <Icons.left />
          <Text fontSize={25} fontWeight={600}>
            Confirm and Payment
          </Text>
        </HStack>
        <Text as='em' fontSize={20} fontWeight={500}>
          Your trip
        </Text>
        <VStack w={'100%'} as='form' alignItems={'start'}>
          <HStack alignItems='start' justifyContent={'space-between'} w={'100%'}>
            <Box>
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
    </Box>
  )
}
