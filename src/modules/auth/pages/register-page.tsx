import React from 'react'
import { PhoneNumberInput } from '~/components'

export const Register = () => {
  return (
    <div>
      <PhoneNumberInput onChange={console.log} />
    </div>
  )
}