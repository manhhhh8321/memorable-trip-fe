import { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text
} from '@chakra-ui/react'

export const ConfirmChangeStatusModal = ({ isOpen, onClose, onConfirm }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirm = async () => {
    setIsSubmitting(true)
    await onConfirm()
    setIsSubmitting(false)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Change Status</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to change the status?</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='gray' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='blue' onClick={handleConfirm} isLoading={isSubmitting}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
