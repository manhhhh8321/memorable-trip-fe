import { Box, Button, HStack, Input, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { PhoneNumberInput } from '~/components'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormSchema, OTPFormSchema, PhoneFormSchema } from '~/validations'
import { Countries } from '~/mocks'
import { enumRegister } from '../models'
import OtpInput from 'react18-input-otp'
import postVerifyOtp from '../api/verify-code.api'
import { toast } from 'react-toastify'

type TRegisterPhone = {
  code: string
  phone: string
}
interface IRegisterPhone {
  hidden?: boolean
  setStep?: any
  onCloseAuth?: any
  onOpenFinish?: any
}

const initialValuesPhone = {
  code: '',
  phone: ''
} as TRegisterPhone

export const OTPFormPhone = ({ hidden, setStep, onCloseAuth, onOpenFinish }: IRegisterPhone) => {
  const [value, setValue] = useState('')
  const { isOpen, onClose } = useDisclosure()

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isValid }
  } = useForm<TRegisterPhone>({
    defaultValues: initialValuesPhone,
    resolver: zodResolver(OTPFormSchema)
  })
  const onSubmit = async (data: TRegisterPhone) => {
    const phone = localStorage.getItem('phone') || ''

    data = { ...data, phone }

    try {
      const response = await postVerifyOtp(data)

      if (response) {
        setStep(enumRegister.FINISH_REGISTER)
        onOpenFinish()
        toast.success(response.data.message)
      }
    } catch (error: any) {
      toast.error('Something went wrong')
      console.log(error)
    }
  }

  return (
    <VStack hidden={hidden} mt={10} w={'100%'} as='form' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name='code'
        render={({ field: { value, onChange } }) => (
          <Box w={'100%'}>
            <OtpInput
              inputStyle={{ border: '1px solid black', padding: 10, width: 40, height: 40 }}
              shouldAutoFocus={true}
              value={value}
              onChange={onChange}
              numInputs={6}
              separator={<span>-</span>}
              // separateAfter={3}
              onSubmit={onSubmit}
            />
            {errors.code && <Text variant='error'>{errors.code.message}</Text>}
          </Box>
        )}
      />

      <HStack w='100%' spacing={10} alignItems='start' pt={10}>
        <Button
          type='button'
          isLoading={isSubmitting}
          w='49%'
          bg={'#e4dedf'}
          _hover={{ bg: 'rgba(182, 180, 180, 0.7)' }}
          _active={{ bg: 'rgb(221, 217, 217)' }}
          color='white'
          onClick={() => setStep(enumRegister.PHONE_REGISTER)}
          disabled={!isValid}
        >
          Back
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
          Continue
        </Button>
      </HStack>
    </VStack>
  )
}
