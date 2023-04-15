import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Box,
  Image,
  Text,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

interface ViewRoomDetailModalProps {
  isOpen: boolean
  onClose: () => void
  room: any
}

const ViewRoomDetailModal = ({ isOpen, onClose, room }: ViewRoomDetailModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign='center'>{room.roomName}</ModalHeader>
        <ModalBody>
          <Image src={room.image[0]?.url} alt='Room' height='300px' objectFit='cover' />
          <Box p={4}>
            <Text fontSize='xl' fontWeight='semibold' mb={2}>
              About this listing
            </Text>
            <Text mb={4}>{room.about}</Text>
            <Text fontSize='xl' fontWeight='semibold' mb={2}>
              Description
            </Text>
            <Text mb={4}>{room.description.name}</Text>
            <Text fontSize='xl' fontWeight='semibold' mb={2}>
              Amenities
            </Text>
            <List spacing={2} mb={4}>
              {room.roomAmenities.map((amenity: any) => (
                <ListItem key={amenity.amenities.id}>
                  <ListIcon as={CheckIcon} color='green.500' />
                  {amenity.amenities.name}
                </ListItem>
              ))}
            </List>
            <Text fontSize='xl' fontWeight='semibold' mb={2}>
              Details
            </Text>
            <Text mb={2}>
              {room.numberOfLivingRoom} living room · {room.numberOfBedroom} bedroom · {room.numberOfBed} bed ·{' '}
              {room.numberOfBathroom} bathroom
            </Text>
            <Text fontSize='lg' fontWeight='semibold' mb={2}>
              Room Type
            </Text>
            <Text fontSize='lg' mb={2}>
              {room.roomType}
            </Text>
            <Text mb={4}>{room.address}</Text>
            <Text mb={4}>{room.city.name}</Text>
            <Text fontSize='2xl' fontWeight='semibold' mb={2}>
              ${room.price} / night
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter justifyContent='center'>
          <Button colorScheme='yellow' variant='solid' onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ViewRoomDetailModal
