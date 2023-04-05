import { Box, Card, Image, VStack } from '@chakra-ui/react'
import React from 'react'
import { Icons } from '~/assets'

export const CardItem = () => {
  return (
    <Box w={'100%'}>
      <Box w={'100%'} minH={'300'}>
        <VStack>
          <Box>
            <Image borderRadius={30} src='https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg' padding={2} w={'100%'} h={{lg:300,xl:330,'2xl':280}} />
            <Icons.heart/>
          </Box>
        </VStack>
      </Box>
    </Box>
  )
}
