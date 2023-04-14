import { Box, Badge, Image, Text, Button } from '@chakra-ui/react'

interface RoomCardProps {
  room: any
}

const RoomCard = ({ room }: RoomCardProps) => {
  const { name, price, imageUrl, roomAmenities } = room

  return (
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image src={imageUrl} alt={name} height='200px' width='100%' objectFit='cover' />

      <Box p='6'>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
          </Badge>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            {roomAmenities.amenities.map((amenity: any) => amenity.name).join(', ')}
          </Box>
        </Box>

        <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' isTruncated>
          {name}
        </Box>

        <Box>
          <Text mt='1' fontWeight='bold'>
            ${price}/night
          </Text>
        </Box>

        <Button mt='2' colorScheme='teal' variant='outline'>
          Book now
        </Button>
      </Box>
    </Box>
  )
}
