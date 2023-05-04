import { As, HStack, Icon, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { MdCastle } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import colors from '~/libs/chakra/foundations/colors'

type TItem = {
  label: string
  to: string
  icon?: React.ElementType
  key: string
  isCollapsed: boolean
  onClick?: () => void // Added onClick property
}
export const NavItem = (props: TItem) => {
  const { label, to, isCollapsed, icon } = props
  return (
    <NavLink
      to={to}
      style={{
        width: 'fit-content',
        transition: 'all 0.3s ease-in-out',
        height: 80
      }}
    >
      {({ isActive }) => (
        <VStack
          // bg={isActive ? colors.primary : 'white'}
          color={isActive ? '#000' : '#424242'}
          borderBottom={isActive ? '2px solid black' : 'none'}
          h={'100%'}
          alignItems={'center'}
          justifyContent={'center'}
          // rounded='lg'
          p={1}
          // w="100%"
          transition='all 0.3s ease-in-out'
          _hover={{
            color: '#000'
            // bg: colors.primaryLight
          }}
        >
          {icon && <Icon w={{ xl: '24px', '2xl': '28px' }} h={{ xl: '24px', '2xl': '28px' }} as={icon} />}
          <Text
            _hover={{
              color: '#000'
              // bg: colors.primaryLight
            }}
            fontSize='xs'
            whiteSpace='nowrap'
            paddingRight={2}
            color={isActive ? '#000' : colors.grey[900]}
          >
            {isCollapsed ? '' : label}
          </Text>
        </VStack>
      )}
    </NavLink>
  )
}
