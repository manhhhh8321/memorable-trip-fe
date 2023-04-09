import { Navigate, RouteObject } from 'react-router-dom'
import { navigationFn } from './navigation-fn'
import { CommunityCommitPage, HomePage } from '~/modules'

export const communityRoutes: RouteObject = {
  path: '/community-commit',
  element: <CommunityCommitPage />
}
