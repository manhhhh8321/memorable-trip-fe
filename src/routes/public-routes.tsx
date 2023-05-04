import { RouteObject, useLocation, useParams } from 'react-router'
import { DefaultLayout } from '~/layouts'
import { BlankPage } from '~/modules'
import { communityRoutes } from './community-routes'
import RoomDetailRoutes from './room-detail-route'
import { HomePage } from '~/modules'
import { useMemo } from 'react'

const HomePageWrapper = () => {
  const { search } = useLocation()
  // parse the search string to extract the filter parameter
  const filter = useMemo(() => {
    const params = new URLSearchParams(search)

    return params
  }, [search])
  return <HomePage filter={search} />
}

export const publicRoutes: RouteObject = {
  element: <DefaultLayout />,
  errorElement: <BlankPage />,
  children: [
    {
      index: true,
      element: <HomePageWrapper />
      // element: <Navigate to={navigationFn.HOME} replace />
    },
    { ...communityRoutes },
    { ...RoomDetailRoutes },

    {
      path: '/',
      element: <HomePage description={null} />
      // element: <Navigate to={navigationFn.HOME} replace />
    },
    {
      path: '/filter',
      element: <HomePageWrapper />
      // element: <Navigate to={navigationFn.HOME} replace />
    }
  ]
}
