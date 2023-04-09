import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { trackPromise } from 'react-promise-tracker'
import { setStorage } from '~/helper'
import { useCustomToast } from '~/hooks'
import axiosClient from '~/libs/axios/axiosClient'
import { navigationFn } from '~/routes'

type TLogin = {
  email: string
  password: string
}

const loginFn = (body: TLogin) =>
  trackPromise(axiosClient.post("/auth/login", body));

export const useMutationLogin = () => {
  const { toastSuccess, toastFail } = useCustomToast();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginFn,
    mutationKey: "login",
    onSuccess: (data: any) => {
      console.log(data)
      setStorage("user", data);
      navigate(navigationFn.COMMUNITY_COMMIT)
      toastSuccess({
        title: 'Login successfully'
      })
    },

    onError: (error: any) => {
      toastFail({
        title: Array.isArray(error.response.data.errors) ? error.response.data.errors[0] : error.response.data.errors
      })
    }
  })
}
