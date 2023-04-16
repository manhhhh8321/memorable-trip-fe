import { Box, Button, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router'
import { navigationFn } from '~/routes'
type TStep = {
  stepIndex: number
  setStep: (e?: any) => void
}
export const CommunityStepOne = ({ stepIndex, setStep }: TStep) => {
  const navigate = useNavigate()
  return (
    <VStack hidden={stepIndex === 2} w='100%' alignItems='start'>
      <Text py={6}>
        <Image
          src='https://d1hjkbq40fs2x4.cloudfront.net/2016-10-07/files/aperture-priority-ae-mode_1405-5.jpg'
          w={10}
          h={10}
        />
      </Text>
      <Text fontWeight={600}>Cam kết cộng đồng của chúng tôi</Text>
      <Text fontWeight={700} as='h3' pt={4} fontSize={25}>
      Memorable Trip là nơi mà tất cả mọi người đều có thể cảm thấy là một cộng đồng dành cho họ.
      </Text>
      <Text py={6}>Để đảm bảo điều này, chúng tôi đề nghị bạn cam kết như sau:</Text>
      <Text>
        Tôi đồng ý sẽ đối xử với tất cả mọi người trong cộng đồng Memorable Trip một cách tôn trọng và không phán xét hay thành
        kiến, bất kể chủng tộc, tôn giáo, nguồn gốc quốc gia, dân tộc, màu da, tình trạng khuyết tật, giới tính, bản
        dạng giới, khuynh hướng tình dục hoặc tuổi tác.
      </Text>
      <Text py={4} onClick={() => setStep(stepIndex + 1)} fontWeight={600} textDecoration='underline' cursor='pointer'>
        Tìm hiểu thêm &gt;
      </Text>
      <Text pt={6} pb={2}>
        Điều khoản dịch vụ Memorable Trip
      </Text>
      <Text>
        Tôi cũng chấp nhận{' '}
        <Text as='span' fontWeight={600} textDecoration='underline'>
          Điều khoản dịch vụ, Điều khoản dịch vụ thanh toán, Chính sách quyền riêng tư
        </Text>{' '}
        và{' '}
        <Text as='span' fontWeight={600} textDecoration='underline'>
          Chính sách không phân biệt của Memorable Trip.
        </Text>
      </Text>
      <VStack w='100%' pt={4} spacing={4}>
        <Button bgColor='#E00B41' color='white' w='100%'>
          Đồng ý và tiếp tục
        </Button>
        <Button onClick={() => navigate(navigationFn.HOME)} w='100%'>
          Từ chối
        </Button>
      </VStack>
    </VStack>
  )
}
