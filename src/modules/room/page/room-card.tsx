import { Box, Badge, Image, Text, Button, Tag, HStack } from '@chakra-ui/react'
import moment from 'moment'
import { useState } from 'react'
import { deleteRoom, updateRoom } from '../api/room.api'
import EditRoomModal from './edit-room-modal'
import { toast } from 'react-toastify'
import ViewRoomDetailModal from './room-detail-modal.'
import ViewDeleteRoomModal from './delete-room-modal'

interface RoomCardProps {
  room: any
}

const RoomCard = ({ room }: RoomCardProps) => {
  const { roomName, price, image, roomAmenities, createdAt, roomType, description, city } = room

  const createdAtDate = moment(createdAt)
  const currentDate = moment()
  const diffInDays = currentDate.diff(createdAtDate, 'days')

  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const handleEditClose = () => {
    setShowEditModal(false)
  }

  const handleViewClose = () => {
    setShowViewModal(false)
  }

  const handleDeleteClose = () => {
    setIsConfirmModalOpen(false)
  }

  return (
    <Box
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      boxShadow='md'
      transition='all 0.2s ease-in-out'
      _hover={{ boxShadow: 'lg', transform: 'scale(1.03)' }}
    >
      <Image src={image[0]?.url} alt={roomName} height='150px' width='100%' objectFit='cover' />

      <Box p='3'>
        <Box display='flex' alignItems='baseline'>
          {diffInDays <= 5 && (
            <Badge borderRadius='full' px='2' colorScheme='teal'>
              New
            </Badge>
          )}
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            {roomAmenities.map((amenity: any) => {
              return (
                <Tag key={amenity.id} size='sm' colorScheme='linkedin' mr='1'>
                  {amenity.amenities.name}
                </Tag>
              )
            })}
          </Box>
        </Box>

        <Box>
          <Box mt='6' fontWeight='semibold' as='h4' lineHeight='tight' isTruncated>
            {roomName}
          </Box>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            {roomType}
          </Badge>
        </Box>
        <Box>
          <Text mt='3' fontWeight='bold'>
            ${price}/night
          </Text>
        </Box>

        <HStack spacing='2' mt='2'>
          <Button
            colorScheme='yellow'
            variant='outline'
            size='sm'
            borderRadius='md'
            borderColor='yellow.500'
            onClick={() => setShowEditModal(true)}
            _hover={{ bg: 'yellow.50', borderColor: 'yellow.700', color: 'yellow.700' }}
          >
            Edit
          </Button>

          {showEditModal && <EditRoomModal isOpen={showEditModal} onClose={handleEditClose} room={room} />}

          <Button
            colorScheme='teal'
            variant='outline'
            size='sm'
            borderRadius='md'
            borderColor='teal.400'
            onClick={() => setShowViewModal(true)}
            _hover={{ bg: 'teal.50', borderColor: 'teal.500', color: 'teal.700' }}
          >
            View
          </Button>

          {showViewModal && <ViewRoomDetailModal isOpen={showViewModal} onClose={handleViewClose} room={room} />}

          <Button
            colorScheme='red'
            variant='outline'
            size='sm'
            borderRadius='md'
            borderColor='red.400'
            onClick={() => setIsConfirmModalOpen(true)}
            _hover={{ bg: 'red.50', borderColor: 'red.500', color: 'red.700' }}
          >
            Delete
          </Button>

          {isConfirmModalOpen && (
            <ViewDeleteRoomModal isOpen={isConfirmModalOpen} onClose={handleDeleteClose} roomId={room.id} />
          )}
        </HStack>
      </Box>
    </Box>
  )
}

export default RoomCard
