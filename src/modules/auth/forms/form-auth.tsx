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
  ModalHeader
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

type TAutForm = {
  onOpen?: () => void
  onClose: any
  isOpen: boolean
}
export const AuthForm = (props: TAutForm) => {
  const { isOpen, onClose } = props
  const isAuth = getAccessToken();
  useEffect(()=>{
    !!isAuth && onClose();
  },[isAuth])

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
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
