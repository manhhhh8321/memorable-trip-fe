import { Navigate, RouteObject } from 'react-router'
import { navigationFn } from './navigation-fn'
import { RoomDetailPage } from '~/modules/room/page/room-detail'
import CreateRoomForm from '~/modules/room/page/create-room'
import { Header } from '~/layouts/components'
import { Box } from '@chakra-ui/react'
import Footer from '~/modules/room/page/footer'

const CreateRoomRoutes: RouteObject = {
  path: '/room',
  element: (
    <Box>
      <Header />
      <CreateRoomForm />
      <Footer />
    </Box>
  )
}

export default CreateRoomRoutes
