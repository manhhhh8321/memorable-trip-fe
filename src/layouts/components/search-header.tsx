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
                width='40px'
                height='40px'
                src='https://cdn.baogiaothong.vn/upload/2-2022/images/2022-05-25/1-1653445668-308-width740height476.jpg'
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
                <Text>Địa điểm bất kỳ</Text>
                <Text>Tuần bất kỳ</Text>
                <Text>Thêm khách</Text>
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
              Cho thuê chỗ ở qua Airbnb
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
                <MenuList>
                  <MenuGroup>
                    <MenuItem minH='40px'>
                      <Text>Tin nhắn</Text>
                    </MenuItem>
                    <MenuItem minH='40px'>
                      <Text>Thông báo</Text>
                    </MenuItem>
                    <MenuItem minH='40px'>
                      <Text>Chuyến đi</Text>
                    </MenuItem>
                    <MenuItem minH='40px'>
                      <Text>Danh sách yêu thích</Text>
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup>
                    <MenuItem minH='40px'>
                      <Text onClick={handleProfile}>Tài Khoản</Text>
                    </MenuItem>
                    <MenuItem minH='40px'>
                      <Text>Cho thuê chỗ ở qua Airbnb</Text>
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
                      <Text>Trợ giúp</Text>
                    </MenuItem>
                    <MenuItem minH='40px'>
                      <Text onClick={handleLogout}>Đăng xuất</Text>
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              ) : (
                <MenuList zIndex={10}>
                  <MenuGroup>
                    <MenuItem onClick={onOpen} minH='48px'>
                      <Text>Đăng nhập</Text>
                    </MenuItem>
                    <MenuItem onClick={onOpen} minH='40px'>
                      <Text>Đăng ký</Text>
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup>
                    <MenuItem minH='48px'>
                      <Text>Cho thuê chỗ ở qua Airbnb</Text>
                    </MenuItem>
                    <MenuItem minH='40px'>
                      <Text>Trợ giúp</Text>
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              )}
            </Menu>
          </HStack>
        </Box>
      </HStack>
      <AuthForm onClose={onClose} isOpen={isOpen} />
    </VStack>
  )
}
