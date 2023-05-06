import React, { useState } from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast
} from '@chakra-ui/react'
import { useMutationLogin } from '../api/login.api'
import { getUserDetail } from '../api/user'

type TLogin = {
  email: string
  password: string
}

export const AdminLoginLayout = () => {
  const { mutate, isLoading } = useMutationLogin()
  const [loginData, setLoginData] = useState<TLogin>({
    email: '',
    password: ''
  })

  const toast = useToast()

  const handleLogin = async () => {
    mutate(loginData)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setLoginData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link>
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input type='email' name='email' value={loginData.email} onChange={handleInputChange} />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input type='password' name='password' value={loginData.password} onChange={handleInputChange} />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500'
                }}
                isLoading={isLoading}
                onClick={handleLogin}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
