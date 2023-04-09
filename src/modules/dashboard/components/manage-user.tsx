import React, { useState, useEffect } from 'react'
import { Table, Tbody, Tr, Td, Button, VStack, Spinner, Flex } from '@chakra-ui/react'
import { deleteUser, getUsers } from '../api/user'
import ReactPaginate from 'react-paginate'
import '../../../react-paginate.css'
import UserDetail from './user-detail'
import { EditUserForm } from '../page/edit-user'
import { useNavigate } from 'react-router'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export interface User {
  id: string
  createdAt: string
  updatedAt: string
  userType: string // Update this to match all possible user types
  firstName: string
  lastName: string
  email: string
  phone: string
  gender: string // Update this to match all possible gender options
  isVerified: boolean
  deleted_at: string | null
}
interface Props {
  onView: (user: User) => void
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

const ManageUsersTable = () => {
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState(0) // use 'page' instead of 'pageNumber'
  const usersPerPage = 10
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false) // new state for loading circle
  const [isDeleting, setIsDeleting] = useState(false)

  const navigate = useNavigate()
  const handleViewClick = (user: User) => {
    setSelectedUser(user)
  }

  const handleEditClick = (user: User) => {
    setSelectedUser(user)
    navigate(`/admin/manage-users/${user.id}/edit`)
  }

  const handleDeleteClick = (user: User) => {
    confirmAlert({
      title: 'Confirm delete',
      message: `Are you sure you want to delete the user ${user.firstName} ${user.lastName}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              setIsDeleting(true)
              await deleteUser(user.id)
              setIsDeleting(false)
              toast.success(`User ${user.firstName} ${user.lastName} deleted successfully!`)
            } catch (error) {
              setIsDeleting(false)
              toast.error(`Error deleting user ${user.firstName} ${user.lastName}. Please try again later.`)
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    })
  }

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      try {
        if (page < 1) setPage(1) // set page to 1 if it's less than 1
        const fetch = await getUsers(page)
        const data = fetch.items

        console.log(data, 'data')

        if (data.length > 0) {
          setUsers((prevUsers) => [...prevUsers, ...data])
          setPageCount(fetch.meta.totalPages)
        }
        setIsLoading(false) // moved here
      } catch (error) {
        console.error(error)
        setIsLoading(false) // added here to handle error case
      }
    }
    fetchUsers()
  }, [page]) // re-fetch users whenever the 'page' state changes

  const displayUsers = () => {
    const startIndex = page * usersPerPage
    const endIndex = startIndex + usersPerPage

    return users.slice(startIndex, endIndex).map((user, index) => {
      const userIndex = startIndex + index + 1
      return { ...user, index: userIndex }
    })
  }
  const handlePageClick = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <VStack spacing={4} align='stretch'>
      {isLoading && (
        <Flex justify='center' align='center' height='100vh'>
          <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
        </Flex>
      )}
      <Table variant='simple'>
        <thead>
          <Tr fontWeight={'bold'}>
            <Td>User Id</Td>
            <Td>First Name</Td>
            <Td>Last Name</Td>
            <Td>Email</Td>
            <Td>Phone</Td>
            <Td>Actions</Td>
          </Tr>
        </thead>
        <Tbody>
          {displayUsers().map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.firstName}</Td>
              <Td>{user.lastName}</Td>
              <Td>{user.email}</Td>
              <Td>{user.phone}</Td>
              <Td>
                <Button colorScheme='blue' size='sm' onClick={() => handleViewClick(user)}>
                  View
                </Button>{' '}
                <Button colorScheme='yellow' size='sm' onClick={() => handleEditClick(user)}>
                  Edit
                </Button>{' '}
                <Button colorScheme='red' size='sm' onClick={() => handleDeleteClick(user)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ReactPaginate
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) => {
          handlePageClick(selected + 1)
        }}
        containerClassName={'pagination'}
        activeClassName={'active'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        previousLabel={'Previous'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextLabel={'Next'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        breakLabel={'...'}
        disableInitialCallback={true}
      />
      {selectedUser && <UserDetail user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </VStack>
  )
}

export default ManageUsersTable
