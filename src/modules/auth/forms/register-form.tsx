import { Box, Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { PhoneNumberInput } from '~/components'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormSchema } from '~/validations'
import { Countries } from '~/mocks'
import { RegisterFormPhone } from './phone-register-form'

type TRegisterPhone = {
  phone: string
}

const initialValuesPhone = {
  phone: ''
} as TRegisterPhone

export const RegisterForm = () => {
  const [value, setValue] = useState('')
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isValid }
  } = useForm<TRegisterPhone>({
    defaultValues: initialValuesPhone,
    resolver: zodResolver(LoginFormSchema)
  })
  const countryOptions = Countries.map(({ name, code, dial_code }) => ({
    label: name,
    value: dial_code,
    flag: code
  }))

  return (
    <Box mt={10} w={'100%'}>
      <RegisterFormPhone />
    </Box>
  )
}
