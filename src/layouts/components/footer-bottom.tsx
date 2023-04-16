import { HStack, Text, Link as ChakraLink, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { MdExpandLess, MdOutlineLanguage } from 'react-icons/md'
import colors from '~/libs/chakra/foundations/colors'

type TFooterBottom = {
  onOpen?: () => void
}
export const FooterBottom = (props: TFooterBottom) => {
  const { onOpen } = props
  return (
    <HStack h={'47px'} w={'100%'} justifyContent={'space-between'} alignItems='center'>
      <HStack alignItems='center' fontSize={15}>
        <Text fontSize={{ xl: 13, '1.5xl': 15 }} fontWeight={300}>
          &copy; 2023 Airbnb, Inc.
        </Text>
        <Text>·</Text>
        <ChakraLink _hover={{ textDecoration: 'underline' }} fontWeight={300} fontSize={{ xl: 14, '2xl': 15 }}>
          Privacy
        </ChakraLink>
        <Text>·</Text>
        <ChakraLink _hover={{ textDecoration: 'underline' }} fontWeight={300} fontSize={{ xl: 14, '2xl': 15 }}>
          Terms
        </ChakraLink>
        <Text>·</Text>
        <ChakraLink _hover={{ textDecoration: 'underline' }} fontWeight={300} fontSize={{ xl: 14, '2xl': 15 }}>
          Site map
        </ChakraLink>
      </HStack>
      <HStack alignItems='center' spacing={3}>
        <HStack cursor='pointer' spacing={1}>
          <Text>
            <MdOutlineLanguage />
          </Text>
          <Text fontWeight={500} fontSize={{ xl: 14, '2xl': 15 }} _hover={{ textDecoration: 'underline' }}>
            English (ENG)
          </Text>
        </HStack>
        <HStack cursor='pointer' spacing={1}>
          <Text fontSize={16}>$</Text>
          <Text fontWeight={500} fontSize={{ xl: 14, '2xl': 15 }} _hover={{ textDecoration: 'underline' }}>
            USD
          </Text>
        </HStack>
        <HStack cursor='pointer' onClick={onOpen}>
          <Text fontWeight={500} fontSize={{ xl: 14, '2xl': 15 }} _hover={{ textDecoration: 'underline' }}>
            Resource Center
          </Text>
          <Text>
            <MdExpandLess />
          </Text>
        </HStack>
      </HStack>
    </HStack>
  )
}
