import { Box, Button, Flex, Heading, Icon, Link, Spacer, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { RiUserLine, RiBook2Line } from 'react-icons/ri'
import SimpleSidebar from '../components/side-bar'
import { useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import { getUserDetail } from '../api/user'

type DashboardLayoutProps = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <Flex direction='column' h='100vh'>
      <Flex as='nav' align='center' justify='space-between' p='4' bg='gray.800'>
        <Heading size='md' color='white'>
          Admin Dashboard
        </Heading>
        <Spacer />
        <Button onClick={handleLogout} color='black' fontSize='sm'>
          Log out
        </Button>
      </Flex>
      <Flex flexGrow={1} overflowY='auto'>
        <Box as='aside' w='16rem' bg='gray.100' p='4'>
          <Box mb='4'>
            <Heading size='sm' mb='2'>
              Navigation
            </Heading>
            <SimpleSidebar />
          </Box>
        </Box>
        <Box flexGrow={1} p='4'>
          {children}
        </Box>
      </Flex>
    </Flex>
  )
}

export default DashboardLayout
