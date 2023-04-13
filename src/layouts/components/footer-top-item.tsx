import { Box, Text, Link as ChakraLink, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

type TItem = {
  title: string
  listTexts: {
    text: string
    url: string
  }[]
}
export const FooterTopItem = ({ title, listTexts }: TItem) => {
  return (
    <Box w={'calc(100% - 16px)'}>
      <Text>{title}</Text>
      <VStack alignItems='start' pt={4} spacing={4}>
        {listTexts.map((v, i) => (
          <ChakraLink to={v.url} as={Link} key={i}>
            {v.text}
          </ChakraLink>
        ))}
      </VStack>
    </Box>
  )
}
