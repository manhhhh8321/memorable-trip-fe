import React from 'react'
import { PhoneNumberInput } from '~/components'

export const RegisterForm = () => {
  return (
    <div>
      <PhoneNumberInput onChange={console.log} />
    </div>
  )
}