import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import jwt_decode from "jwt-decode";

import { navigationFn } from './navigation-fn'
import { getAccessToken } from '~/helper'

export const BlockedAuth = () => {
  const isAuth = getAccessToken()

  return isAuth ? <Outlet /> : <Navigate to={navigationFn.HOME} replace />
}

export const AdminBlockedAuth = () => {
  const isAuth = getAccessToken()

  return isAuth ? <Outlet /> : <Navigate to={navigationFn.ADMIN_LOGIN} replace />
}