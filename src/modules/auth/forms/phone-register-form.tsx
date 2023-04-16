import { Box, Button, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { PhoneNumberInput } from '~/components'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormSchema, PhoneFormSchema } from '~/validations'
import { Countries } from '~/mocks'
import { enumRegister } from '../models'
import { toast } from 'react-toastify'
import { postSendOtp } from '../api/verify-code.api'

type TRegisterPhone = {
  phone: string
}
interface IRegisterPhone {
  hidden?: boolean
  setStep?: any
}

const initialValuesPhone = {
  phone: ''
} as TRegisterPhone

export const RegisterFormPhone = ({ hidden, setStep }: IRegisterPhone) => {
  const [value, setValue] = useState('')
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors, isValid }
  } = useForm<TRegisterPhone>({
    defaultValues: initialValuesPhone,
    resolver: zodResolver(PhoneFormSchema)
  })
  const onSubmit = async (data: any) => {
    try {
      const sendOtp = await postSendOtp(data)

      console.log('aaaaa', sendOtp)
      if (sendOtp) {
        setStep(enumRegister.CONFIRM_OTP_REGISTER)
        localStorage.setItem('phone', data.phone)
        toast.success('OTP sent successfully')
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.log(error)
    }
  }
  const countryOptions = Countries.map(({ name, code, dial_code }) => ({
    label: name,
    value: dial_code,
    flag: code
  }))

  return (
    <VStack hidden={hidden} mt={10} w={'100%'} as='form' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name='phone'
        render={({ field: { value, onChange } }) => (
          <Box w={'100%'}>
            <PhoneNumberInput
              // value={value}
              // options={countryOptions}
              // placeholder='Enter phone number'
              onChange={(value) => {
                // setValue(value)
                onChange(value)
              }}
            />
            {errors.phone && <Text variant='error'>{errors.phone.message}</Text>}
          </Box>
        )}
      />
      <Text fontSize={13} mt={3}>
        We will call or text you to confirm your phone number. Standard data and message rates may apply.{' '}
        <Text as='span' textDecor='underline' fontSize={13}>
          Privacy policy
        </Text>
      </Text>
      <Button
        type='submit'
        isLoading={isSubmitting}
        w='100%'
        mt={10}
        bg={'#E51D54'}
        _hover={{ bg: 'rgba(251, 132, 132,.7)' }}
        _active={{ bg: 'rgb(251, 132, 132)' }}
        color='white'
        // disabled={!isValid}
      >
        Continue
      </Button>
    </VStack>
  )
}
