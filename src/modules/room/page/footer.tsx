import { Box, Flex, Text, IconButton } from '@chakra-ui/react'
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa'

const Footer = () => {
  return (
    <Flex as='footer' bg='gray.50' py={4} px={{ base: 4, md: 20 }} mt={12} justify='space-between' alignItems='center'>
      <Box>
        <Text fontSize='xl' fontWeight='bold'>
          Stay<span color='teal.500'>cation</span>
        </Text>
        <Text mt={2} color='gray.500' fontSize='sm'>
          Your ultimate guide to the perfect staycation.
        </Text>
      </Box>
      <Box>
        <Text fontSize='sm' color='gray.500'>
          Follow us on social media:
        </Text>
        <Flex mt={2}>
          <IconButton aria-label='Follow us on Instagram' icon={<FaInstagram />} size='sm' variant='ghost' mr={2} />
          <IconButton aria-label='Follow us on Twitter' icon={<FaTwitter />} size='sm' variant='ghost' mr={2} />
          <IconButton aria-label='Follow us on Facebook' icon={<FaFacebook />} size='sm' variant='ghost' />
        </Flex>
      </Box>
    </Flex>
  )
}

export default Footer
