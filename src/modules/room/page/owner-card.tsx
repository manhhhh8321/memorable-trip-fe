import { Box, Flex, Image, Text, Stack, Avatar, Icon } from '@chakra-ui/react'
import { HiPhone } from 'react-icons/hi'
const RoomOwnerCard = ({ avatarUrl, firstName, lastName, email, phone }) => {
  return (
    <Box mb={100}>
      <Box textAlign={'left'}>
        <Text fontSize={'2xl'}>Meet the host</Text>
      </Box>
      <Box w='100%' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Flex align='center' justify='center' bg='gray.100' h='120px' w='100%'>
          <Avatar size='2xl' name={`${firstName} ${lastName}`} src={avatarUrl} />
        </Flex>
        <Box p='4'>
          <Box display='flex' alignItems='baseline'>
            <Text fontWeight='semibold' fontSize='xl' mr='2'>{`${firstName} ${lastName}`}</Text>
            <Text fontSize='sm' color='gray.500'>{`(${email})`}</Text>
          </Box>
          <Box display='flex' alignItems='baseline' mt='2'>
            <Icon as={HiPhone} color='gray.500' />
            <Text fontSize='sm' color='gray.500' ml='1'>{`${phone}`}</Text>
          </Box>
          <Box display='flex' alignItems='baseline' mt='2'>
            <Text fontWeight='semibold' fontSize='md' mr='2'>
              About me:
            </Text>
            <Text fontSize='sm' color='gray.500'>
              I am a room owner, looking forward to host guests!
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default RoomOwnerCard
