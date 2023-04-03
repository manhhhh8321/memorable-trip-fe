import React from 'react'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { MdLanguage, MdMenu, MdAccountCircle } from 'react-icons/md'

export const Header = () => {
  return (
    <VStack w={'100%'} h={20}>
      <HStack w={'100%'} h={'100%'} justifyContent={'space-between'} alignItems={'center'}>
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
            <Text>airbnbF</Text>
          </HStack>
        </Box>
        <Box>
          <HStack>
            <Text>Địa điểm bất kỳ</Text>
            <Text>Tuần bất kỳ</Text>
            <Text>Thêm khách</Text>
            <Text>
              <Search2Icon />
            </Text>
          </HStack>
        </Box>
        <Box>
          <HStack>
            <Text>Cho thuê chỗ ở qua Airbnb</Text>
            <Text><MdLanguage /></Text>
              <HStack>
                <MdMenu />
                <MdAccountCircle/>
              </HStack>
          </HStack>
        </Box>
      </HStack>
    </VStack>
  )
}
