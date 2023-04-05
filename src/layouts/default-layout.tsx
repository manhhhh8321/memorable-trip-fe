import React, { useState } from 'react'
import { Outlet } from 'react-router'
import { Box, Text } from '@chakra-ui/react'
import { usePromiseTracker } from 'react-promise-tracker'

import { ScrollToTop } from '~/hoc'
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '~/configs'
import { LoadingOverlay } from '~/components'
import { Header } from './components'

export const DefaultLayout = () => {
  const { promiseInProgress } = usePromiseTracker()
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  return (
    <ScrollToTop>
        <Box w={'100%'} minH='100vh' pos='relative' px={20} bgColor='white' transition='.3s ease-in-out'>
          <Header />
          {promiseInProgress && <LoadingOverlay />}
          <Outlet />
      </Box>
    </ScrollToTop>
  )
}
