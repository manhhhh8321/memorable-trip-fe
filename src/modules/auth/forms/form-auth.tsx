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
import { FinishRegisterForm } from './finish-register-form'
import { enumRegister } from '../models'

type TAutForm = {
  onOpen?: () => void
  onClose: any
  isOpen: boolean
  selectedIndex?: number
  setSelectedIndex?: any
}
type TButtonAuth = {
  hidden?: boolean
  title: string
  icon: React.ReactNode | JSX.Element
  onClick?: (event?: any) => void
}
export const AuthForm = (props: TAutForm) => {
  const { isOpen, onClose, selectedIndex, setSelectedIndex } = props
  const [step, setStep] = useState(1)
  const { isOpen: isOpenFinish, onClose: onCloseFinish } = useDisclosure()
  // const [selectedIndex, setSelectedIndex] = useState<number>(1)
  const isAuth = getAccessToken()
  useEffect(() => {
    !!isAuth && onClose()
  }, [isAuth])

  const btnRef = useRef(null)

  return (
    <>
      <Modal onClose={onClose} finalFocusRef={btnRef} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent maxW={'40%'} py={4} pb={8} w={{ xl: '38%', '2xl': '35.5rem' }} maxH={'90%'} overflowY={'auto'}>
          <ModalHeader textAlign='center'>Log in or sign up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={24}>Welcome to Memorable Trip</Text>
            {selectedIndex === 1 && <LoginForm />}
            {selectedIndex === 2 && <RegisterForm onCloseAuth={onClose} />}

            <HStack>
              <Text w={'50%'} h={'1px'} bg={'#ccc'} />
              <Text py={3} textAlign={'center'}>
                Or
              </Text>
              <Text w={'50%'} h={'1px'} bg={'#ccc'} />
            </HStack>
            <VStack w={'100%'}>
              <ButtonAuth
                hidden={selectedIndex === 3}
                onClick={() => setSelectedIndex(3)}
                title='Continue with Facebook'
                icon={<Icons.facebook />}
              />
              <ButtonAuth
                hidden={selectedIndex === 4}
                onClick={() => setSelectedIndex(4)}
                title='Continue with Google'
                icon={<Icons.google />}
              />
              <ButtonAuth
                hidden={selectedIndex === 5}
                onClick={() => setSelectedIndex(5)}
                title='Continue with Apple'
                icon={<Icons.apple />}
              />
              <ButtonAuth
                hidden={selectedIndex === 2}
                onClick={() => setSelectedIndex(2)}
                title='Continue with phone'
                icon={<Icons.phone />}
              />
              <ButtonAuth
                hidden={selectedIndex === 1}
                onClick={() => setSelectedIndex(1)}
                title='Continue with email'
                icon={<Icons.email />}
              />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* <FinishRegisterForm isOpenFinish={step === enumRegister.FINISH_REGISTER} onCloseFinish={onClose} hidden={step !== enumRegister.FINISH_REGISTER} setStep={setStep} /> */}
    </>
  )
}

const ButtonAuth = (props: TButtonAuth) => {
  const { title, icon, hidden, onClick } = props
  return (
    <HStack
      hidden={hidden}
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
      <Text pos='absolute' left={4} color={'facebook.600'}>
        {icon}
      </Text>
      <Text>{title}</Text>
    </HStack>
  )
}
