import { Navigate, RouteObject } from 'react-router'
import { navigationFn } from './navigation-fn'
import { RoomDetailPage } from '~/modules/room/page/room-detail'

const RoomDetailRoutes: RouteObject = {
  path: '/room/:roomId',
  element: <RoomDetailPage />
}

export default RoomDetailRoutes
