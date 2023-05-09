import { Box, Card, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react'
import jwtDecode from 'jwt-decode'
import { debounce } from 'lodash'
import moment from 'moment'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { Icons } from '~/assets'
import { addOrRemoveWishlist } from '~/modules/home/api'

type TImage = {
  image_id: number
  image_url: string
  format: string
}
interface ICard {
  id: number
  title: string
  description: string
  time: string
  distance: string
  price: string
  isFavorite: boolean
  images: TImage[]
  rate: number
}
interface TData {
  data: ICard
}

const fakeImages = [
  'https://www.invert.vn/media/uploads/uploads/2022/12/03143748-12-hinh-anh-dep.jpeg',
  'https://hanoispiritofplace.com/wp-content/uploads/2015/11/canh-dep-viet-nam-1-1.jpg',
  'https://dulichviet.com.vn/images/bandidau/danh-sach-nhung-buc-anh-viet-nam-lot-top-anh-dep-the-gioi.jpg',
  'https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2021/01/agora-best-picture-nature-696x871.jpg?fit=700%2C20000&quality=95&ssl=1',
  'https://upanh123.com/wp-content/uploads/2021/04/anh-dep-viet-nam15-1024x640.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFJWyd4tJRIJVRh3BamtLbsPmsJsOzZ2l7CTkY7J_BymimjpsiqgzEjlNJgk2J78x0OJE&usqp=CAU',
  'https://media-cdn-v2.laodong.vn/storage/newsportal/2017/8/28/551711/Du-Lich_11.jpg',
  'https://kenhhomestay.com/wp-content/uploads/2019/04/%C4%91%E1%BB%8Ba-%C4%91i%E1%BB%83m-ch%E1%BB%A5p-%E1%BA%A3nh-%C4%91%E1%BA%B9p-Qu%E1%BA%A3ng-Nam-1.jpg',
  'https://top10quangnam.vn/wp-content/uploads/2022/10/hinh-anh-quang-nam-3.jpg',
  'https://media.phunumoi.net.vn/files/thanhdung/2021/04/21/hoi-an-1017.jpg',
  'https://tourdulichviet.com/upload/images/2016-04/dat-quang-nam4.jpg',
  'https://dulichviet.com.vn/images/bandidau/NOI-DIA/Da-Nang/chua-cau-hoi-an-du-lich-viet.jpg',
  'https://luhanhtour.com/wp-content/uploads/2022/03/H%E1%BB%99i-An-4.jpg',
  'https://saigonstartravel.com/wp-content/uploads/2019/06/chua-cau-3.png',
  'https://thuthuatphanmem.vn/uploads/2018/09/11/hinh-anh-dep-6_044127357.jpg',
  'https://vcdn1-dulich.vnecdn.net/2021/07/16/3-1-1626444927.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=0nww5sftrDimoUxyn9lM5g',
  'https://thads.moj.gov.vn/noidung/tintuc/PublishingImages/N%C4%83m%202020/Thang%208/ITC/Pic1/003.jpg',
  'https://photo-cms-viettimes.zadn.vn/w666/Uploaded/2023/haovna/2017_08_12/1692716_yuiz.jpg',
  'https://photo-cms-viettimes.zadn.vn/460x306/Uploaded/2023/haovna/2017_08_12/1692704_fksu.jpg'
]

export const CardItem = ({ data, isFavorite }: { data: any; isFavorite: boolean }) => {
  console.log(isFavorite)
  // const { id, title, description, time, distance, price, isFavorite, images, rate } = data
  const [currentUser, setCurrentUser] = React.useState<any>(null)
  const [listFavorite, setListFavorite] = React.useState<any>([])
  const handleWishlist = async (roomId: any) => {
    const user = localStorage.getItem('user')

    if (!user) {
      toast.error('Please login to add to wishlist')
    }

    if (user) {
      const { accessToken } = JSON.parse(user)

      const decode = jwtDecode(accessToken) as any
      setCurrentUser(decode.id)
      try {
        const data = await addOrRemoveWishlist(roomId)
        toast.success(data.data)
        debounce(() => {
          window.location.reload()
        }, 1000)()
      } catch (error) {
        toast.error('Something went wrong')
      }
    }
  }

  return (
    <Box w={'100%'} cursor='pointer'>
      <Box w={'100%'} minH={'300'}>
        <VStack>
          <Box position={'relative'} w={'100%'} h={'0'} pb={'80%'} borderRadius={15} overflow={'hidden'}>
            <Image
              borderRadius={15}
              src={data?.image[0]?.url || fakeImages[Math.floor(Math.random() * fakeImages.length)]}
              w={'100%'}
              h={'100%'}
              objectFit={'cover'}
              objectPosition={'center'}
              position={'absolute'}
              top={'0'}
              left={'0'}
            />
            <Text position={'absolute'} top={5} right={5} cursor='pointer'>
              <Icons.heart
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  handleWishlist(data.id)
                }}
                stroke={isFavorite ? 'red' : 'white'}
                color={isFavorite ? 'red' : 'rgba(0,0,0,.1)'}
              />
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
            <Box fontSize={15}>
              <Text fontSize={15} color='#9B9997' fontWeight={400}>
                {data?.address}
              </Text>
              <Text fontSize={15} color='#9B9997' fontWeight={400}>
                {data?.createdAt && moment(data?.createdAt).format('DD/MM/YYYY')}
              </Text>
              <Text fontSize={15} color='#9B9997' fontWeight={400}>
                <Text as='span' fontWeight={600} color='black'>
                  ${data?.price}
                </Text>{' '}
                / night
              </Text>
            </Box>
          </Box>
        </VStack>
      </Box>
    </Box>
  )
}
