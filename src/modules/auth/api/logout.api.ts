import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { trackPromise } from "react-promise-tracker";
import { clearStorage, setStorage } from "~/helper";
import { useCustomToast } from "~/hooks";
import axiosClient from "~/libs/axios/axiosClient";
import { navigationFn } from "~/routes";

const sleep = (ms: number)=> new Promise(res=>setTimeout(res,ms))

const logoutFn = () =>
  trackPromise(sleep(500));

export const useMutationLogout = () => {
  const { toastSuccess, toastFail } = useCustomToast();

  return useMutation({
    mutationFn: logoutFn,
    mutationKey: "logout",
    onSuccess: (data: any) => {
      clearStorage("user");
      toastSuccess({
        title: "Logout successfully",
      });
    },

    onError: (error: any) => {
      toastFail({
        title: Array.isArray(error.response.data.errors)
          ? error.response.data.errors[0]
          : error.response.data.errors,
      });
    },
  });
};
