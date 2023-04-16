import { useNavigate } from 'react-router-dom'
import { trackPromise } from 'react-promise-tracker'
import { useMutation } from 'react-query'
import { useCustomToast } from '~/hooks'
import axiosClient from '~/libs/axios/axiosClient'
import { navigationFn } from '~/routes'

type TVerifyCode = {
  otp: string
  phone: string
}

const verifyCodeFn = (body: TVerifyCode) => trackPromise(axiosClient.post('/auth/verify-otp', body))

export const useMutationVerifyCode = (email: string, code: string) => {
  const { toastSuccess, toastFail } = useCustomToast()
  const navigate = useNavigate()

  return useMutation({
    mutationKey: 'verify-otp',
    mutationFn: verifyCodeFn,
    onSuccess: () => {
      toastSuccess({
        title: 'Verify otp successfully'
      })
      navigate(navigationFn.RESET_PASSWORD, {
        state: {
          email,
          code
        }
      })
    },
    onError: () => {
      toastFail({
        title: 'Verify code failed'
      })
    }
  })
}

const postVerifyOtp = async (body: any) => {
  const response = await axiosClient.post('/auth/verify-otp', body)
  return response
}

export const postSendOtp = async (body: any) => {
  const response = await axiosClient.post('/auth/send-otp', body)
  return response
}

export default postVerifyOtp
