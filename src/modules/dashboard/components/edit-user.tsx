import { Box, Center, Spinner, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EditUserForm } from '../page/edit-user'
import { getUserDetail, editUser } from '../api/user'
import { User } from './manage-user'

export const EditUser = () => {
  const { userId } = useParams<{ userId: string }>()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserDetail(userId ?? '')
        setUser(fetchedUser)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [userId])

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      if (!user) return
      console.log(updatedUser)
      await editUser(user.id, updatedUser)
      setUser(updatedUser)
    } catch (error: any) {
      setError(error.message)
    }
  }

  if (loading) {
    return (
      <Center height='100vh'>
        <Spinner />
      </Center>
    )
  }

  if (error) {
    return (
      <Center height='100vh'>
        <Text color='red.500'>{error}</Text>
      </Center>
    )
  }

  return (
    <Box mt={10}>
      <Text fontSize='2xl' mb={5}>
        Edit User
      </Text>
      {user ? <EditUserForm onSubmit={handleUpdateUser} /> : <Text color='gray.500'>User not found</Text>}
    </Box>
  )
}
