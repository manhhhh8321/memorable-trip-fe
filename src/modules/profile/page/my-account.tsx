import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, Flex, FormControl, FormLabel, Image, Input, Select, Stack } from '@chakra-ui/react'
import { getUserDetail, updateUser } from '../api/profile'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

interface User {
  firstName: string
  lastName: string
  email: string
  gender: string
  phone: string
}

export const MyAccountForm = () => {
  const { register, handleSubmit, setValue } = useForm<User>()
  const [avatar, setAvatar] = useState<string | null>(null)
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    phone: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    // Make API call to fetch user details
    const fetchUser = async () => {
      try {
        const response = await getUserDetail('1')
        console.log(response)
        const data = response.data
        console.log('aa', data)
        setUser(data)
        // Set form data using setValue from react-hook-form
        setValue('firstName', data.firstName)
        setValue('lastName', data.lastName)
        setValue('email', data.email)
        setValue('gender', data.gender)
        setValue('phone', data.phone)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUser()
  }, [setValue])

  const onSubmit = async (data: User) => {
    try {
      const update = await updateUser('1', data)

      toast.success('Update profile successfully')
    } catch (error) {
      toast.error('Update profile failed')
    }
  }

  const handleGoBack = () => {
    navigate('/')
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        setAvatar(e.target?.result as string)
      }

      reader.readAsDataURL(file)
    } else {
      setAvatar(null)
    }
  }

  return (
    <Box maxW='500px' w='100%' mx='auto' mt={8} p={6} bg='white' borderRadius='lg' boxShadow='lg'>
      <Flex justify='center' alignItems='center' flexDirection='column'>
        <Box position='relative' width='100px' height='100px'>
          <Flex justifyContent='center' alignItems='center' position='absolute' top='0' left='0' right='0' bottom='0'>
            {avatar ? (
              <Image src={avatar} alt='avatar' borderRadius='full' boxSize='100px' />
            ) : (
              <Image
                src='https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png'
                alt='default-avatar'
                borderRadius='full'
                boxSize='100px'
              />
            )}
            <Input
              type='file'
              accept='image/*'
              onChange={handleAvatarChange}
              position='absolute'
              top='0'
              left='0'
              right='0'
              bottom='0'
              opacity='0'
              zIndex='-1'
              cursor='pointer'
            />
          </Flex>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} mt={6}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input {...register('firstName')} />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input {...register('lastName')} />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input {...register('email')} type='email' disabled />
            </FormControl>
            <Select {...register('gender')}>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </Select>
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input {...register('phone')} type='tel' />
            </FormControl>
            <Button type='submit' colorScheme='blue'>
              Save Changes
            </Button>
            <Button onClick={handleGoBack}>Go back</Button>
          </Stack>
        </form>
      </Flex>
    </Box>
  )
}
