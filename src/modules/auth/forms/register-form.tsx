import { Box, Button, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { PhoneNumberInput } from '~/components'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormSchema } from '~/validations'
import { Countries } from '~/mocks'
import { RegisterFormPhone } from './phone-register-form'
import { OTPFormPhone } from './otp-register-form'
import { FinishRegisterForm } from './finish-register-form'
import { enumRegister } from '../models'

type TRegisterPhone = {
  phone: string
}
interface IRegister {
  onCloseAuth?: any
}

const initialValuesPhone = {
  phone: ''
} as TRegisterPhone

export const RegisterForm = ({ onCloseAuth }: IRegister) => {
  const [value, setValue] = useState('')
  const [step, setStep] = useState(1)
  const { isOpen: isOpenFinish, onOpen: onOpenFinish, onClose: onCloseFinish } = useDisclosure()

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isValid }
  } = useForm<TRegisterPhone>({
    defaultValues: initialValuesPhone,
    resolver: zodResolver(LoginFormSchema)
  })

  return (
    <Box mt={10} w={'100%'}>
      <RegisterFormPhone hidden={step !== 1} setStep={setStep} />
      <OTPFormPhone onOpenFinish={onOpenFinish} onCloseAuth={onCloseAuth} hidden={step !== 2} setStep={setStep} />
      <FinishRegisterForm
        isOpenFinish={isOpenFinish}
        onOpenFinishRegister={() => {
          onOpenFinish()
          onCloseAuth()
        }}
        onCloseFinish={onCloseFinish}
        hidden={step !== enumRegister.FINISH_REGISTER}
        setStep={setStep}
      />
    </Box>
  )
}
