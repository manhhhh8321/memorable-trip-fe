import React, { useState } from 'react'
import {
  Box,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
  useDisclosure
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { MdLanguage, MdMenu, MdAccountCircle } from 'react-icons/md'
import { AuthForm } from '~/modules/auth/forms'
import { clearStorage, getAccessToken } from '~/helper'
import { useMutationLogout } from '~/modules/auth/api'
import { useNavigate } from 'react-router'
export const HeaderBottom = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(1)

  const navigate = useNavigate()
  // const [isOpen, setIsOpen] = useState(false)
  const btnRef = React.useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isAuth = getAccessToken()
  console.log(isAuth)
  const { mutate } = useMutationLogout()
  const handleLogout = () => {
    mutate()
    // clearStorage('accessToken');
    // window.location.reload();
  }

  const handleProfile = () => {
    navigate('/user')
  }

  const handleCreateRoom = () => {
    navigate('/room')
  }

  const handleListBooking = () => {
    navigate('/booked')
  }
  return (
    <VStack w={'100%'} mt={'0px !important'}>
      <HStack
        mt={'0px !important'}
        borderY={'1px solid #ccc'}
        px={{ xl: 8, '2xl': 20 }}
        w={'100%'}
        h={20}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Box>
          <HStack>
            <Text>
              <Text
                as='img'
                width='80px'
                height='60px'
                src='https://ik.imagekit.io/qapuv5cpu/memorable-trip-logo.png?updatedAt=1681618177488'
                alt='not'
              />
            </Text>
            <Link href='/'>
              <Text>Memorable Trip</Text>
            </Link>
          </HStack>
        </Box>

        <Popover isLazy>
          <PopoverTrigger>
            <Box cursor='pointer' border={'1px solid #ccc'} py={2} px={4} borderRadius={50} ref={btnRef}>
              <HStack>
                <Text>Any destination</Text>
                <Text>Any week</Text>
                <Text>Add guests</Text>
                <Text>
                  <Search2Icon />
                </Text>
              </HStack>
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>chdkfsdfdsf</PopoverBody>
          </PopoverContent>
        </Popover>
        <Box>
          <HStack spacing={3}>
            <Link href='/room' onClick={handleCreateRoom}>
              Rent a place on Memorable Trip
            </Link>
            <Text>
              <MdLanguage size={24} />
            </Text>
            <Menu>
              <MenuButton>
                <HStack cursor='pointer' p={1} pl={2} border='1px solid #ccc' borderRadius={50}>
                  <MdMenu size={24} />
                  <MdAccountCircle size={35} color='#8d8c8c' />
                </HStack>
              </MenuButton>
              {!!isAuth ? (
                <MenuList zIndex={10}>
                  <MenuGroup>
                    <MenuItem minH='40px'>
                      <Text>Messages</Text>
                    </MenuItem>
                    <MenuItem minH='40px'>
                      <Text>Notifications</Text>
                    </MenuItem>
                    <MenuItem minH='40px'>
                      <Text>Trips</Text>
                    </MenuItem>
                    <MenuItem minH='40px'>
                      <Text>Wish Lists</Text>
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup>
                    <MenuItem minH='40px'>
                      <Text onClick={handleProfile}>Account</Text>
                    </MenuItem>
                    <MenuItem minH='40px' onClick={handleListBooking}>
                      <Text>My booking</Text>
                    </MenuItem>
                    <Link href='/my-listings'>
                      <MenuItem minH='40px'>
                        <Text>My listings</Text>
                      </MenuItem>
                    </Link>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup>
                    <MenuItem minH='40px'>
                      <Text>Help</Text>
                    </MenuItem>
                    <MenuItem minH='40px'>
                      <Text onClick={handleLogout}>Log out</Text>
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              ) : (
                <MenuList zIndex={10}>
                  <MenuGroup>
                    <MenuItem onClick={()=>{ setSelectedIndex(1); onOpen()}} minH='48px'>
                      <Text>Log in</Text>
                    </MenuItem>
                    <MenuItem onClick={()=>{ setSelectedIndex(2); onOpen()}} minH='40px'>
                      <Text>Register</Text>
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup>
                    <MenuItem minH='48px'>
                      <Text>Rent a place on Memorable Trip</Text>
                    </MenuItem>
                    <MenuItem minH='40px'>
                      <Text>Help</Text>
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              )}
            </Menu>
          </HStack>
        </Box>
      </HStack>
      <AuthForm selectedIndex={selectedIndex} onClose={onClose} setSelectedIndex={setSelectedIndex} isOpen={isOpen} />
    </VStack>
  )
}
