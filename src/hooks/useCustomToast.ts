import { useToast } from '@chakra-ui/react'

export const useCustomToast = () => {
  const toast = useToast()

  const toastSuccess = ({ title }: { title: string }) => {
    toast({
      title,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right'
    })
  }

  const toastFail = ({ title }: { title: string }) => {
    toast({
      title,
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top-right'
    })
  }

  return { toastSuccess, toastFail }
}
