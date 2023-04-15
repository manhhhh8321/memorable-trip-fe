import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  useDisclosure,
  useToast,
  CircularProgress,
  position
} from '@chakra-ui/react'
import { deleteRoom } from '../api/room.api'

type DeleteRoomModalProps = {
  isOpen: boolean
  onClose: () => void
  roomId: string
}

const DeleteRoomModal = ({ isOpen, onClose, roomId }: DeleteRoomModalProps) => {
  const { isOpen: isDeleting, onOpen: onDelete, onClose: onDeleteClose } = useDisclosure()
  const toast = useToast()

  const handleDelete = async () => {
    try {
      // Show the deleting state
      onDelete()
      // Call the deleteRoom function with the room ID
      await deleteRoom(roomId)
      // Show a success toast message
      toast({
        title: 'Room deleted',
        description: 'The room has been successfully deleted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
      // Reload the rooms list
      window.location.reload()
    } catch (error) {
      console.error(error)
      // Show an error toast message
      toast({
        title: 'Error deleting room',
        description: 'An error occurred while deleting the room. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
      // Close the deleting state
      onDeleteClose()
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete room</ModalHeader>
          <ModalBody>
            <Text>Are you sure you want to delete this room?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='gray' variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' variant='solid' onClick={handleDelete} disabled={isDeleting}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {isDeleting && (
        <Modal isOpen={true} onClose={() => {}}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody textAlign='center'>
              <CircularProgress isIndeterminate color='red.400' />
              <Text mt={3}>Deleting room...</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

export default DeleteRoomModal
