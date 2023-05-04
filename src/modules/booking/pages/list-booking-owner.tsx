import { useState, useEffect } from 'react'
import { VStack, Table, Thead, Tbody, Tr, Th, Td, Button, Spinner, Flex, Text } from '@chakra-ui/react'
import ReactPaginate from 'react-paginate'
import { getAllBookings, getAllBookingsOwner } from '~/modules/dashboard/api/booking'
import '../../../react-paginate.css'
import { BookingDetail } from '~/modules/dashboard/components/booking-detail'

export interface Booking {
  id: number
  createdAt: string
  updatedAt: string
  note: string | null
  status: string
  totalDiscount: number
  totalPrice: number
  user: {
    id: number
    createdAt: string
    updatedAt: string
    userType: string
    firstName: string
    lastName: string
    email: string
    phone: string
    gender: string
    isVerified: boolean
    deleted_at: string | null
  }
  bookingDate: {
    id: number
    createdAt: string
    updatedAt: string
    checkIn: string
    checkOut: string
    isAvailable: boolean
    duration: string
    room: {
      id: number
      createdAt: string
      updatedAt: string
      roomType: string
      roomName: string
      price: number
      about: string
      numberOfLivingRoom: number
      numberOfBedroom: number
      numberOfBed: number
      numberOfBathroom: number
      address: string
      isActive: boolean
      deletedAt: string | null
    }
  }
  payment: {
    id: number
    createdAt: string
    updatedAt: string
    paymentType: string
    status: string
    completedAt: string | null
  }
}

export const ManageOwnerBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [page, setPage] = useState(1)
  const bookingsPerPage = 10
  const [pageCount, setPageCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [bookingIds, setBookingIds] = useState<Set<string>>(new Set())
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const handleViewClick = (booking: Booking) => {
    setSelectedBooking(booking)
  }

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true)
      try {
        if (page < 1) setPage(1)

        const res = await getAllBookingsOwner(page)
        const data = res.data.items

        if (data.length > 0) {
          setBookings((prev) => {
            const newBookings = data.filter((booking: any) => !bookingIds.has(booking.id))
            const newBookingIds = new Set<string>(newBookings.map((booking: Booking) => booking.id))
            setBookingIds((prev: Set<string>) => new Set<string>([...prev, ...newBookingIds]))
            return [...prev, ...newBookings]
          })
          setPageCount(res.data.meta.totalPages)
        }

        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [page])

  const displayBookings = () => {
    const startIndex = (page - 1) * bookingsPerPage
    const endIndex = startIndex + bookingsPerPage

    return bookings.slice(startIndex, endIndex)
  }

  const handlePageClick = async (newPage: number) => {
    console.log(newPage, 'newPage')
    setPage(newPage)
  }

  return (
    <VStack spacing={4} w='100%'>
      <Text mt={30} fontSize={'2xl'}>
        All booking of your listed rooms
      </Text>
      <Table variant='striped' w='100%'>
        <Thead>
          <Tr>
            <Th>Booking ID</Th>
            <Th>Completed At</Th>
            <Th>Room Name</Th>
            <Th>Check In</Th>
            <Th>Check Out</Th>
            <Th>Total Price</Th>
            <Th>Total Discount</Th>
            <Th>Duration</Th>
            <Th>Payment Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {displayBookings().map((booking) => (
            <Tr key={booking.id}>
              <Td>{booking.id}</Td>
              <Td>{booking.payment.completedAt}</Td>
              <Td>{booking.bookingDate.room.roomName}</Td>
              <Td>{booking.bookingDate.checkIn}</Td>
              <Td>{booking.bookingDate.checkOut}</Td>
              <Td>{booking.totalPrice}</Td>
              <Td>{booking.totalDiscount}</Td>
              <Td>{booking.bookingDate.duration}</Td>
              <Td>{booking.payment.status}</Td>
              <Td>
                <Button size='sm' colorScheme='blue' mr={1} onClick={() => handleViewClick(booking)}>
                  View
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {isLoading && (
        <Flex w='100%' justifyContent='center'>
          <Spinner size={'xl'} />
        </Flex>
      )}
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
      {selectedBooking && <BookingDetail booking={selectedBooking} onClose={() => setSelectedBooking(null)} />}
    </VStack>
  )
}
