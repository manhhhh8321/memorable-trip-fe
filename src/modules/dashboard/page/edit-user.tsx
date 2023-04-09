import React, { useState, useEffect } from 'react'
import { Button, FormControl, FormErrorMessage, FormLabel, Input, useToast } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { User } from '../components/manage-user'
import { useNavigate, useParams } from 'react-router'
import { editUser, getUserDetail } from '../api/user'

type EditUserFormProps = {
  onSubmit: (updatedUser: User) => void
}

export const EditUserForm = ({ onSubmit }: EditUserFormProps) => {
  const navigate = useNavigate()
  const { userId } = useParams<{ userId: string }>()
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<User>()
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) return
        const user = await getUserDetail(userId)
        reset(user)
      } catch (error) {
        console.error(error)
        toast({
          title: 'Error fetching user',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      }
    }
    fetchUser()
  }, [userId, reset, toast])

  const handleFormSubmit = async (updatedUser: User) => {
    setIsLoading(true)
    try {
      if (!userId) return
      const updateUser = await editUser(userId, updatedUser)

      console.log(updateUser, 'aaa')

      onSubmit(updatedUser)
      toast({
        title: 'User updated',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      navigate('/admin/manage-users')
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Error updating user'
      toast({
        title: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/admin/manage-users')
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormControl isInvalid={errors.firstName ? true : undefined}>
          <FormLabel>First Name</FormLabel>
          <Input {...register('firstName', { required: true })} />
          <FormErrorMessage>Please enter a first name</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.lastName ? true : undefined}>
          <FormLabel>Last Name</FormLabel>
          <Input {...register('lastName', { required: true })} />
          <FormErrorMessage>Please enter a last name</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.email ? true : undefined}>
          <FormLabel>Email</FormLabel>
          <Input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
          <FormErrorMessage>Please enter a valid email address</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.phone ? true : undefined}>
          <FormLabel>Phone</FormLabel>
          <Input {...register('phone', { required: true })} />
          <FormErrorMessage>Please enter a valid phone number</FormErrorMessage>
        </FormControl>
        <Button marginTop={30} colorScheme='blue' type='submit' isLoading={isLoading} mr={3}>
          Save
        </Button>
        <Button marginTop={30} onClick={handleCancel}>
          Cancel
        </Button>
      </form>
    </>
  )
}
