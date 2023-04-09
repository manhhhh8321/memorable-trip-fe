import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import { User } from './manage-user'
import PropTypes from 'prop-types'

interface UserDetailProps {
  user: User
  onClose: () => void
}

const UserDetail: React.FC<UserDetailProps> = ({ user, onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            <b>Id:</b> {user.id}
          </Text>
          <Text>
            <b>First Name:</b> {user.firstName}
          </Text>
          <Text>
            <b>Last Name:</b> {user.lastName}
          </Text>
          <Text>
            <b>Email:</b> {user.email}
          </Text>
          <Text>
            <b>Phone:</b> {user.phone}
          </Text>
          <Text>
            <b>IsVerified:</b> {user.isVerified ? 'Yes' : 'No'}
          </Text>
          <Text>
            <b>Gender:</b> {user.gender}
          </Text>
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

UserDetail.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    isVerified: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    userType: PropTypes.string,
    deleted_at: PropTypes.string
  }).isRequired,
  onClose: PropTypes.func.isRequired
}

export default UserDetail
