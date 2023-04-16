import { Box, Button, HStack, Input, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { PhoneNumberInput } from '~/components'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormSchema, OTPFormSchema, PhoneFormSchema } from '~/validations'
import { Countries } from '~/mocks'
import { enumRegister } from '../models'
import OtpInput from 'react18-input-otp'

type TRegisterPhone = {
  otp: string
}
interface IRegisterPhone {
  hidden?: boolean
  setStep?: any
  onCloseAuth?: any
  onOpenFinish?: any
}

const initialValuesPhone = {
  otp: ''
} as TRegisterPhone

export const OTPFormPhone = ({ hidden, setStep,onCloseAuth, onOpenFinish }: IRegisterPhone) => {
  const [value, setValue] = useState('')
  const {isOpen, onClose} = useDisclosure()

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isValid }
  } = useForm<TRegisterPhone>({
    defaultValues: initialValuesPhone,
    resolver: zodResolver(OTPFormSchema)
  })
  const onSubmit = (data: any) => {
    setStep(enumRegister.FINISH_REGISTER)
    // onCloseAuth()
    onOpenFinish()
  }

  return (
    <VStack hidden={hidden} mt={10} w={'100%'} as='form' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name='otp'
        render={({ field: { value, onChange } }) => (
          <Box w={'100%'}>
            <OtpInput
              inputStyle={{ border: '1px solid black', padding: 10, width: 40, height: 40 }}
              shouldAutoFocus={true}
              value={value}
              onChange={onChange}
              numInputs={4}
              separator={<span>-</span>}
              // separateAfter={3}
              // onSubmit={console.log(otp)}
            />
            {errors.otp && <Text variant='error'>{errors.otp.message}</Text>}
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
          onClick={()=>setStep(enumRegister.PHONE_REGISTER)}
          disabled={!isValid}
        >
          Tiếp tục
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
          Tiếp tục
        </Button>
      </HStack>
    </VStack>
  )
}
