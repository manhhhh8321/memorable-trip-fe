import { Box, Card, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Icons } from '~/assets'

type TImage = {
  image_id: number;
  image_url: string;
  format: string;
}
interface ICard {
  id: number;
  title: string;
  description: string;
  time: string;
  distance: string;
  price: string;
  isFavorite: boolean;
  images: TImage[];
  rate: number;
}
interface TData {
  data: ICard;
}

export const CardItem = ({ data }: any) => {
  // const { id, title, description, time, distance, price, isFavorite, images, rate } = data
  return (
    <Box w={'100%'} cursor='pointer'>
      <Box w={'100%'} minH={'300'}>
        <VStack>
          <Box position={'relative'}>
            <Image borderRadius={15} src={data?.image[0]?.image_url || 'https://d1hjkbq40fs2x4.cloudfront.net/thumbnails/landscape-photography_1601-t-thumb-small.jpg'} w={'100%'} h={{ lg: 300, xl: 290, '2xl': 280 }} />
            <Text position={'absolute'} top={5} right={5} cursor='pointer'>
              <Icons.heart stroke={data?.isActive ? 'red' : 'white'} color={data?.isActive ? 'red' : 'rgba(0,0,0,.1)'} />
            </Text>
          </Box>
          <Box w='100%'>
            <HStack w='100%' justifyContent='space-between' alignItems='start'>
              <Text fontWeight={600} fontSize={15}>
                {data?.roomName}
              </Text>
              <Flex flexDirection='row' justifyContent={'center'} alignItems='center'>
                <Icons.star />
                <Text>{data?.numberOfLivingRoom}</Text>
              </Flex>
            </HStack>
            <Text fontSize={15}>
              <Text fontSize={15} color='#9B9997' fontWeight={400}>
                {data?.address}
              </Text>
              <Text fontSize={15} color='#9B9997' fontWeight={400}>
                {data?.createdAt}
              </Text>
              <Text fontSize={15} color='#9B9997' fontWeight={400}>
                <Text as='span' fontWeight={600} color='black'>
                  ₫{data?.price}
                </Text>{' '}
                đêm
              </Text>
            </Text>
          </Box>
        </VStack>
      </Box>
    </Box>
  )
}
