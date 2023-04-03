import React from 'react'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'

export const Header = () => {
  return (
    <VStack>
      <HStack>
        <Box>
          <HStack>
            <p>logo</p>
            <p>airbnbF</p>
          </HStack>
        </Box>
        <Box></Box>
      </HStack>
    </VStack>
  )
}
