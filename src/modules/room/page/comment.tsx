import React from 'react'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

const ReviewComment = ({ username, avatarUrl, comment, date }) => {
  return (
    <Box p={4} boxShadow='md' borderRadius='md' mb={4}>
      <Flex alignItems='center' mb={2}>
        <Avatar size='sm' src={avatarUrl} mr={2} />
        <Text fontWeight='bold'>{username}</Text>
      </Flex>
      <Text mb={2}>{comment}</Text>
      <Flex justifyContent='space-between'>
        <Text color='gray.500'>{date}</Text>
        <Box>
          <Text color='yellow.500' fontWeight='bold' mr={1}>
            ★★★★★
          </Text>
          <Text color='gray.500' display='inline-block'>
            5/5
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}

const ReviewComments = () => {
  const comments = [
    {
      id: 1,
      username: 'John Smith',
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      comment:
        'I stayed at this property with my family and we had an amazing time. The location is great, close to everything we wanted to see and do. The rooms were clean and comfortable, and the amenities were top-notch. Highly recommend!',
      date: 'February 12, 2022'
    },
    {
      id: 2,
      username: 'Jane Doe',
      avatarUrl: 'https://randomuser.me/api/portraits/women/42.jpg',
      comment:
        'My friends and I stayed at this property for a weekend getaway and it was perfect. The location is ideal, with lots of great restaurants and bars nearby. The rooms were spacious and well-appointed, and the staff was friendly and helpful. Would definitely stay here again!',
      date: 'January 28, 2022'
    },
    {
      id: 3,
      username: 'Bob Johnson',
      avatarUrl: 'https://randomuser.me/api/portraits/men/87.jpg',
      comment:
        "I've stayed at a lot of vacation rentals over the years, and this one is definitely one of the best. The property is beautiful and well-maintained, with all the amenities you could ask for. The location is also great, close to lots of great shopping and dining options. Highly recommend!",
      date: 'December 5, 2021'
    }
  ]

  return (
    <Box>
      {comments.map((comment) => (
        <ReviewComment
          key={comment.id}
          username={comment.username}
          avatarUrl={comment.avatarUrl}
          comment={comment.comment}
          date={comment.date}
        />
      ))}
    </Box>
  )
}

export default ReviewComments
