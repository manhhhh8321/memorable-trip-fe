import React from 'react'
import {
  Box,
  Button,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  useDisclosure
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { MdLanguage, MdMenu, MdAccountCircle } from 'react-icons/md'
import { HeaderBottom } from './search-header'

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrollBehavior, setScrollBehavior] = React.useState('inside')

  const btnRef = React.useRef(null)
  return (
    <VStack w={'100%'}>
      <HStack h={20} w={'100%'} justifyContent='center' alignItems='center' bgColor='#f7f7f7' px={{ xl: 8, '2xl': 20 }}>
        <Text as='span'>Preview total price</Text>
        <Text as='span' cursor='pointer' textDecoration='underline' ref={btnRef} onClick={onOpen}>
          Learn more
        </Text>
      </HStack>
      <HeaderBottom />
      <Modal onClose={onClose} finalFocusRef={btnRef} isOpen={isOpen} scrollBehavior={scrollBehavior}>
        <ModalOverlay />
        <ModalContent maxW={'80%'}>
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody pt={10} pb={10}>
            <HStack w='100%' h='100%' alignItems='start' spacing={4}>
              <VStack h='100%' w='50%' px={20}>
                <Text border='2px solid #ccc' color='#ccc' p={1} borderRadius={10}>
                  Try it out first
                </Text>
                <Text textAlign='center' fontWeight={700} fontSize={50}>
                  A single total price is displayed upfront
                </Text>
                <Text textAlign='center' fontSize={18} color='#222222'>
                  Now you can preview the total price, including all fees, before taxes.
                </Text>
                <Box pt={1.5} textAlign='center'>
                  <Button bgColor='black' color='white' p={6}>
                    Try now
                  </Button>
                  <Text mt={2} textDecoration='underline' onClick={onClose} cursor='pointer'>
                    Maybe later
                  </Text>
                </Box>
              </VStack>
              <Box w='50%' h='100%'>
                <Image pt={4} src='https://hanoimoi.com.vn/Uploads/tuandiep/2018/4/8/1(1).jpg' w='100%' h={'auto'} />
              </Box>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  )
}
