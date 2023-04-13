import React, { useState } from 'react'
import { Outlet } from 'react-router'
import { Box, Text } from '@chakra-ui/react'
import { usePromiseTracker } from 'react-promise-tracker'

import { ScrollToTop } from '~/hoc'
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '~/configs'
import { LoadingOverlay, NavMenu } from '~/components'
import { Footer, Header } from './components'

export const DefaultLayout = () => {
  const { promiseInProgress } = usePromiseTracker()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const toggleCollapsed = () => setIsCollapsed((prev) => !prev)

  return (
    <ScrollToTop>
      <Box w={'100%'} minH='100vh' pos='relative' bgColor='white' transition='.3s ease-in-out'>
        <Header />
        <NavMenu isCollapsed={isCollapsed} toggleCollapsed={toggleCollapsed}/>
        {promiseInProgress && <LoadingOverlay />}
        <Box w={'100%'} minH='100vh' pos='relative' px={{ lg: 8, xl: 8, '2xl': 20 }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </ScrollToTop>
  )
}
