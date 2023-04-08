import React from 'react'
import { Navigate, Outlet } from 'react-router'

import { navigationFn } from './navigation-fn'
import { getAccessToken } from '~/helper'

export function RequiredAuth() {
  const isAuth = getAccessToken()
  console.log('isAuth:' + isAuth)

  return isAuth ? <Outlet /> : <Navigate to={navigationFn.LOGIN} replace />
}

export function AdminRequiredAuth() {
  const isAuth = getAccessToken()
  console.log('isAuth:' + isAuth)

  return isAuth ? <Outlet /> : <Navigate to={navigationFn.ADMIN_LOGIN} replace />
}
