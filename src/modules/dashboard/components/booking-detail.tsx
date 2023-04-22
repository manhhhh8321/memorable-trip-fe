import {
  Box,
  Text,
  Button,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from '@chakra-ui/react'
import { Booking } from './manage-booking'

interface BookingDetailProps {
  booking: Booking
  onClose: () => void
}

export const BookingDetail = ({ booking, onClose }: BookingDetailProps) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize='xl' fontWeight='bold' mb={4}>
            Booking Details
          </Text>
          <Box mb={4}>
            <Text fontWeight='bold'>Booking ID:</Text>
            <Text>{booking.id}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight='bold'>Created At:</Text>
            <Text>{booking.createdAt}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight='bold'>Updated At:</Text>
            <Text>{booking.updatedAt}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight='bold'>User:</Text>
            <Text>
              {booking.user.firstName} {booking.user.lastName} ({booking.user.email})
            </Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight='bold'>Room:</Text>
            <Text>
              {booking.bookingDate?.room?.roomType} - {booking.bookingDate?.room?.roomName}
            </Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight='bold'>Booking Date:</Text>
            <Text>
              {booking.bookingDate.checkIn} to {booking.bookingDate.checkOut}
            </Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight='bold'>Total Price:</Text>
            <Text>{booking.totalPrice}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight='bold'>Total Discount:</Text>
            <Text>{booking.totalDiscount}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight='bold'>Note:</Text>
            <Text>{booking.note || '-'}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight='bold'>Payment status:</Text>
            <Text>{booking.payment.status || '-'}</Text>
          </Box>
          <Divider my={4} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
