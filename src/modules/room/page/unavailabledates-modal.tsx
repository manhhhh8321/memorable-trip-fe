import React from 'react'
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  UnorderedList,
  ListItem
} from '@chakra-ui/react'

interface UnavailableDatesModalProps {
  isOpen: boolean
  onClose: () => void
  unavailableDates: Date[]
}

const UnavailableDatesModal: React.FC<UnavailableDatesModalProps> = ({ isOpen, onClose, unavailableDates }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight='bold' fontSize='xl' color='gray.800'>
          Unavailable dates
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4} fontSize='md' color='gray.600'>
            The following dates are unavailable for this room:
          </Text>
          <UnorderedList spacing={2}>
            {unavailableDates.map((date) => (
              <ListItem key={date.toString()} fontSize='md' color='gray.800'>
                {date.toString()}
              </ListItem>
            ))}
          </UnorderedList>
        </ModalBody>
        <ModalFooter justifyContent='center'>
          <Button
            onClick={onClose}
            colorScheme='blue'
            variant='solid'
            fontWeight='medium'
            borderRadius='full'
            px={8}
            py={4}
            fontSize='lg'
            cursor='pointer'
            _hover={{ bg: 'blue.600' }}
            _active={{ bg: 'blue.700' }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UnavailableDatesModal
