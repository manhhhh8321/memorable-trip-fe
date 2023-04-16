import {
  Box,
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { CustomInput, PhoneNumberInput } from '~/components'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FinishRegisterFormSchema, LoginFormSchema, OTPFormSchema, PhoneFormSchema } from '~/validations'
import { Countries } from '~/mocks'
import { enumRegister } from '../models'
import OtpInput from 'react18-input-otp'
import { postRegister } from '../api/create-user.api'
import { toast } from 'react-toastify'

type TFinishRegister = {
  firstName: string
  lastName: string
  email: string
  gender: string
  password: string
}
interface IRegisterPhone {
  hidden?: boolean
  isOpenFinish: boolean
  setStep?: any
  onCloseFinish?: any
  onOpenFinishRegister?: any
}

const initialValuesFinish = {
  firstName: '',
  lastName: '',
  email: '',
  gender: '',
  password: ''
} as TFinishRegister

export const FinishRegisterForm = ({
  hidden,
  isOpenFinish,
  setStep,
  onCloseFinish,
  onOpenFinishRegister
}: IRegisterPhone) => {
  const [value, setValue] = useState('')
  const { isOpen, onClose } = useDisclosure()

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isValid }
  } = useForm<TFinishRegister>({
    defaultValues: initialValuesFinish,
    resolver: zodResolver(FinishRegisterFormSchema)
  })
  const onSubmit = async (data: any) => {
    const phone = localStorage.getItem('phone') || ''

    data = { ...data, phone }

    try {
      const user = await postRegister(data)

      if (user) {
        setStep(enumRegister.FINISH_REGISTER)
        onCloseFinish()
        onOpenFinishRegister()
        toast.success('Register successfully')
      }
    } catch (error: any) {
      toast.error(`Register failed: ${error.response.data.errors}` || `Register failed: ${error.errors}`)
    }
  }
  console.log(errors)
  return (
    <Modal onClose={onCloseFinish} isOpen={isOpenFinish}>
      <ModalOverlay />
      <ModalContent
        maxW={{ base: '70%', xl: '40%' }}
        py={4}
        pb={8}
        w={{ base: '45%', xl: '40%', '2xl': '35.5rem' }}
        maxH={'90%'}
        overflowY={'auto'}
      >
        <ModalHeader textAlign='center' py={2}>
          Complete registering
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems={'left'} hidden={hidden} w={'100%'} as='form' onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='firstName'
              control={control}
              render={({ field }) => (
                <Box w='100%'>
                  <CustomInput {...field} placeholder='First name' isInvalid={!!errors.firstName} />
                  {errors.firstName && <Text variant='error'>{errors.firstName.message}</Text>}
                </Box>
              )}
            />
            <Controller
              name='lastName'
              control={control}
              render={({ field }) => (
                <Box w='100%'>
                  <CustomInput {...field} placeholder='Last name' isInvalid={!!errors.lastName} />
                  {errors.lastName && <Text variant='error'>{errors.lastName.message}</Text>}
                </Box>
              )}
            />
            <Text color='#535353' fontSize={12} paddingBottom={4}>
              Make sure your name matches the name on your government-provided ID
            </Text>
            <Controller
              name='gender'
              control={control}
              render={({ field }) => (
                <Box w='100%'>
                  <Text variant='menuLabelLight' paddingBottom={4}>
                    Gender{' '}
                    <Text as='span' color='white'>
                      *
                    </Text>
                  </Text>
                  <CustomInput
                    {...field}
                    placeholder='Gender'
                    pr={8}
                    isInvalid={!!errors.gender}
                    minLength={4}
                    maxLength={6}
                  />
                  {errors.gender && <Text variant='error'>{errors.gender.message}</Text>}
                </Box>
              )}
            />
            <Text color='#535353' fontSize={12} paddingBottom={4}>
              To register, you must be at least 18 years old. Your date of birth will not be shared with Memorable Trip
              users other.{' '}
            </Text>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <Box w='100%'>
                  <CustomInput {...field} placeholder='Email' isInvalid={!!errors.email} />
                  {errors.email && <Text variant='error'>{errors.email.message}</Text>}
                </Box>
              )}
            />
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <Box w='100%'>
                  <CustomInput {...field} placeholder='Password' isInvalid={!!errors.password} type='password' />
                  {errors.password && <Text variant='error'>{errors.password.message}</Text>}
                </Box>
              )}
            />
            <Text color='#535353' fontSize={12} paddingBottom={4}>
              We will email you a receipt and confirmation of your trip{' '}
            </Text>
            <Text color='#535353' fontSize={12}>
              By selecting{' '}
              <Text as='span' fontSize={12}>
                Register
              </Text>
              , I agree with{' '}
              <Text as='b' color='blue' fontSize={12} textDecor='underline'>
                Terms and Service, Payment{' '}
              </Text>{' '}
              và{' '}
              <Text as='b' color='blue' fontSize={12} textDecor='underline'>
                Non-discrimination policy{' '}
              </Text>{' '}
              of Memorable Trip, and also approve{' '}
              <Text as='b' color='blue' fontSize={12} textDecor='underline'>
                Privacy Policy{' '}
              </Text>
            </Text>
            <HStack w='100%' spacing={10} alignItems='start' pt={10}>
              <Button
                type='button'
                isLoading={isSubmitting}
                w='49%'
                bg={'#e4dedf'}
                _hover={{ bg: 'rgba(182, 180, 180, 0.7)' }}
                _active={{ bg: 'rgb(221, 217, 217)' }}
                color='white'
                onClick={() => {
                  setStep(enumRegister.CONFIRM_OTP_REGISTER)
                  onCloseFinish()
                }}
                disabled={!isValid}
              >
                Trở lại
              </Button>
              <Button
                type='submit'
                isLoading={isSubmitting}
                w='49%'
                bg={'#E51D54'}
                _hover={{ bg: 'rgba(251, 132, 132,.7)' }}
                _active={{ bg: 'rgb(251, 132, 132)' }}
                color='white'
                // disabled={!isValid}
              >
                Register
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
