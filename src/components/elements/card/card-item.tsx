import { Box, Card, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Icons } from '~/assets'

export const CardItem = () => {
  return (
    <Box w={'100%'} cursor='pointer'>
      <Box w={'100%'} minH={'300'}>
        <VStack>
          <Box position={'relative'}>
            <Image borderRadius={15} src='https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg' w={'100%'} h={{ lg: 300, xl: 290, '2xl': 280 }} />
            <Text position={'absolute'} top={5} right={5} cursor='pointer'>
              <Icons.heart color={'rgba(0,0,0,.1)'} />
            </Text>
          </Box>
          <Box w='100%'>
            <HStack w='100%' justifyContent='space-between' alignItems='start'>
              <Text fontWeight={600} fontSize={15}>Thành phố Nha Trang</Text>
              <Flex flexDirection='row' justifyContent={'center'} alignItems='center'>
                <Icons.star />
                <Text>5.0</Text>
              </Flex>
            </HStack>
            <Text fontSize={15}>
              <Text fontSize={15} color='#9B9997' fontWeight={400}>Hướng biển</Text>
              <Text fontSize={15} color='#9B9997' fontWeight={400}>Ngày 18 - Ngày 23 tháng 4</Text>
              <Text fontSize={15} color='#9B9997' fontWeight={400}><Text as='span' fontWeight={600} color='black'>₫25.013.173</Text> đêm</Text>
            </Text>
          </Box>
        </VStack>
      </Box>
    </Box>
  )
}
