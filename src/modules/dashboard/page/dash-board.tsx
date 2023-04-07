import { Box, Flex, Heading, Icon, Link, Spacer, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { RiUserLine, RiBook2Line } from 'react-icons/ri'
import SimpleSidebar from '../components/side-bar'

type DashboardLayoutProps = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Flex direction='column' h='100vh'>
      <Flex as='nav' align='center' justify='space-between' p='4' bg='gray.800'>
        <Heading size='md' color='white'>
          Admin Dashboard
        </Heading>
        <Spacer />
        <Box color='white' fontSize='sm'>
          User Name
        </Box>
      </Flex>
      <Flex flexGrow={1} overflowY='auto'>
        <Box as='aside' w='16rem' bg='gray.100' p='4'>
          <Box mb='4'>
            <Heading size='sm' mb='2'>
              Navigation
            </Heading>
            <SimpleSidebar/>
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
