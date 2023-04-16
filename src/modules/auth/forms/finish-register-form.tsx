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

type TFinishRegister = {
  name: string
  email: string
  dob: string
  surname: string
}
interface IRegisterPhone {
  hidden?: boolean
  isOpenFinish: boolean
  setStep?: any
  onCloseFinish?: any
  onOpenFinishRegister?: any
}

const initialValuesFinish = {
  name: '',
  email: '',
  dob: '',
  surname: ''
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
  const onSubmit = (data: any) => {
    // setStep(enumRegister.FINISH_REGISTER)
    // onCloseFinish()
    onOpenFinishRegister()
    console.log(data)
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
          Hoàn tất đăng ký
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems={'left'} hidden={hidden} w={'100%'} as='form' onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <Box w='100%'>
                  <CustomInput {...field} placeholder='Ten' isInvalid={!!errors.name} />
                  {errors.name && <Text variant='error'>{errors.name.message}</Text>}
                </Box>
              )}
            />
            <Controller
              name='surname'
              control={control}
              render={({ field }) => (
                <Box w='100%'>
                  <CustomInput {...field} placeholder='Ho' isInvalid={!!errors.surname} />
                  {errors.surname && <Text variant='error'>{errors.surname.message}</Text>}
                </Box>
              )}
            />
            <Text color='#535353' fontSize={12} paddingBottom={4}>
              Đảm bảo rằng tên của bạn nhập khớp với tên trên giấy tời tùy thân do chính phủ cung cấp
            </Text>
            <Controller
              name='dob'
              control={control}
              render={({ field }) => (
                <Box w='100%'>
                  <Text variant='menuLabelLight' paddingBottom={4}>
                    Email{' '}
                    <Text as='span' color='white'>
                      *
                    </Text>
                  </Text>
                  <CustomInput
                    {...field}
                    placeholder='Ngay sinh'
                    pr={8}
                    isInvalid={!!errors.email}
                    minLength={8}
                    maxLength={100}
                  />
                  {errors.dob && <Text variant='error'>{errors.dob.message}</Text>}
                </Box>
              )}
            />
            <Text color='#535353' fontSize={12} paddingBottom={4}>
              Để đăng ký, bạn phải đủ 18 tuổi trỏ lên. Ngày sinh của bạn sẽ không được chia sẻ với người dùng Airbnb
              khác.
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
            <Text color='#535353' fontSize={12} paddingBottom={4}>
              Chúng tôi sẽ gửi phiếu thu và xác nhận chuyến đi qua mail cho bạn
            </Text>
            <Text color='#535353' fontSize={12}>
              Bằng việc chọn{' '}
              <Text as='span' fontSize={12}>
                Đăng ký
              </Text>
              , tôi đồng ý với{' '}
              <Text as='b' color='blue' fontSize={12} textDecor='underline'>
                Điều khoản và dịch vụ, thanh toán
              </Text>{' '}
              và{' '}
              <Text as='b' color='blue' fontSize={12} textDecor='underline'>
                Chính sách không phân biệt
              </Text>{' '}
              của Airbnb, đồng thời chấp thuận{' '}
              <Text as='b' color='blue' fontSize={12} textDecor='underline'>
                Chính sách về quyền riêng tư
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
                Đăng ký
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
