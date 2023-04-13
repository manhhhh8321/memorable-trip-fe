import { useState, useRef, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import {
  VStack,
  Text,
  Box,
  InputGroup,
  InputRightElement,
  Icon,
  Link as ChakraLink,
  Button,
  Modal,
  ModalOverlay,
  HStack,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  useDisclosure,
  Image,
  ModalHeader,
  As
} from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

import { useMutationLogin } from '../api'
import { LoginFormSchema } from '~/validations'
import { CustomInput, CustomPasswordInput } from '~/components'
import { navigationFn } from '~/routes'
import colors from '~/libs/chakra/foundations/colors'
import LoginForm from './login-form'
import { getAccessToken } from '~/helper'
import { MdFacebook } from 'react-icons/md'
import { Icons } from '~/assets'
import { RegisterForm } from './register-form'

type TAutForm = {
  onOpen?: () => void
  onClose: any
  isOpen: boolean
}
type TButtonAuth = {
  title: string
  icon: React.ReactNode | JSX.Element
  onClick?: (event?: any) => void
}
export const AuthForm = (props: TAutForm) => {
  const { isOpen, onClose } = props
  const isAuth = getAccessToken()
  useEffect(() => {
    !!isAuth && onClose()
  }, [isAuth])

  // const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrollBehavior, setScrollBehavior] = useState('inside')
  const [showPassword, setShowPassword] = useState(false)

  const btnRef = useRef(null)

  return (
    <Modal onClose={onClose} finalFocusRef={btnRef} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent maxW={'50%'}>
        <ModalHeader textAlign='center'>Đăng nhập hoặc đăng ký</ModalHeader>
        <ModalCloseButton />
        <ModalBody pt={10} pb={10}>
          <Text fontSize={24}>Chào mừng bạn đến với Airbnb</Text>
          <LoginForm />
          <RegisterForm />
          <HStack>
            <Text w={'50%'} h={'1px'} bg={'#ccc'} />
            <Text py={3} textAlign={'center'}>
              Hoặc
            </Text>
            <Text w={'50%'} h={'1px'} bg={'#ccc'} />
          </HStack>
          <VStack w={'100%'}>
            <ButtonAuth title='Tiếp tục với Facebook' icon={<Icons.facebook />} />
            <ButtonAuth title='Tiếp tục với Google' icon={<Icons.google />} />
            <ButtonAuth title='Tiếp tục với Apple' icon={<Icons.apple />} />
            <ButtonAuth title='Tiếp tục với điện thoại' icon={<Icons.phone />} />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const ButtonAuth = (props: TButtonAuth) => {
  const { title, icon, onClick } = props
  return (
    <HStack
      pos={'relative'}
      w={'100%'}
      bg={'white'}
      _hover={{ bg: 'rgba(246, 241, 241, 0.6)' }}
      _active={{ bg: 'white' }}
      p={2}
      alignItems={'center'}
      justifyContent={'center'}
      border={'1px solid #222222'}
      borderRadius={6}
      cursor={'pointer'}
      onClick={onClick}
    >
      {/* <Icon pos='absolute' left={4} color={'facebook.600'} w={30} h={30} /> */}
      <Text pos='absolute' left={4} color={'facebook.600'}>{icon}</Text>
      <Text>{title}</Text>
    </HStack>
  )
}
