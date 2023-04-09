import { Button, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Icons } from '~/assets'
type TStep = {
  stepIndex: number
  setStep: (e?: any) => void
}
export const CommunityStepSecond = ({ stepIndex, setStep }: TStep) => {
  return (
    <VStack hidden={stepIndex === 1} w='100%' alignItems='start'>
      <Text
        pb={2}
        fontSize={25}
        cursor='pointer'
        ml='-12px'
        p={2}
        transition='ease 1s'
        _hover={{ bgColor: '#d6d4d4', borderRadius: 50 }}
        _active={{ bgColor: '#e2dfdffdf', borderRadius: 50 }}
        onClick={() => setStep(stepIndex - 1)}
      >
        <Icons.chevronLeft />
      </Text>
      <Text fontWeight={500} fontSize={26}>
        Giới thiệu về Cam kết cộng đồng
      </Text>
      <Text fontWeight={600} pt={1} fontSize={18}>
        Tại sao Airbnb lại tạo ra cam kết này?
      </Text>
      <Text fontSize={18} color='#222222'>
        Cam kết này là một bước quan trọng để tạo ra một cộng đồng toàn cầu, nơi mọi người đều có thể thấy mình là một
        phần trong đó. Sự phân biệt đối xử khiến chủ nhà, khách và gia đình của họ cảm thấy không thể hòa nhập và không
        được hoan nghênh, và chúng tôi không chấp nhận điều đó. Việc xây dựng một cộng đồng Airbnb nơi mọi người đều có
        thể cảm thấy mình là một phần trong đó phụ thuộc vào việc mọi người trong cộng đồng đều hiểu và đồng ý giúp
        chúng tôi thực hiện sứ mệnh này.
      </Text>
      <Text fontWeight={600} pt={2} fontSize={18}>
        Nếu tôi từ chối cam kết thì sao?
      </Text>
      <Text fontSize={18} color='#222222'>
        Nếu bạn từ chối cam kết, bạn sẽ không thể cho thuê hoặc đặt phòng/nhà trên Airbnb, và bạn có thể lựa chọn xoá
        tài khoản của mình. Ngay khi bạn xóa tài khoản, tất cả các chuyến đi đã đặt trong tương lai sẽ bị huỷ. Bạn sẽ
        vẫn có thể duyệt trang Airbnb nhưng không thể đặt chỗ hoặc đón tiếp khách.
      </Text>
      <Text fontWeight={600} fontSize={18} pt={4} pb={4}>
        Với tư cách chủ nhà, nếu tôi có các lo ngại về an toàn khi chấp nhận đặt phòng từ ai đó thì sao?
      </Text>
      <Text fontSize={18} color='#222222'>
        Nếu định chia sẻ không gian sống của mình với khách, bạn có thể chỉ nhận khách cùng giới tính.
      </Text>
      <Text fontSize={18} color='#222222'>
        Theo chính sách này, bạn cũng có thể từ chối khách vì các lý do khác, miễn là không phải lý do chủng tộc, tôn
        giáo, nguồn gốc quốc gia, dân tộc, khuynh hướng tình dục hoặc tuổi tác.
      </Text>
      <Text fontSize={18} color='#222222'>
        Nhìn chung, hãy cân nhắc kỹ lý do khi bạn xem xét yêu cầu đặt phòng để đảm bảo sự công bằng.
      </Text>
      <Text fontWeight={600} pt={2} fontSize={18}>
        Nếu luật pháp địa phương hạn chế tôi tiếp đón một số khách nhất định thì sao?
      </Text>
      <Text fontSize={18} color='#222222'>
        Vui lòng đăng thông tin về quy định hạn chế đối với nhà/phòng cho thuê của bạn nhưng phải nêu rõ rằng đây là yêu
        cầu pháp lý tại khu vực của bạn và bạn đang tuân thủ luật pháp địa phương
      </Text>
      <Text fontWeight={600} pt={2} fontSize={18}>
        Tôi có thể từ chối khách khuyết tật nếu tôi nghĩ nhà mình không phù hợp với họ được không?
      </Text>
      <Text fontSize={18} color='#222222'>
        Trong nhiều trường hợp, chủ nhà Airbnb không bắt buộc phải tuân thủ các tiêu chuẩn về nhà được quy định trong
        Đạo luật Người khuyết tật Hoa Kỳ (ADA). Tuy nhiên, bạn không thể từ chối khách vì lý do khách là, hoặc bị cho là
        người khuyết tật. Bạn cần cố gắng hết sức cung cấp thông tin chính xác về các đặc điểm phù hợp cho người có nhu
        cầu đặc biệt (hoặc việc không có các đặc điểm này), cho phép khách khuyết tật tự quyết định liệu nhà có phù hợp
        với nhu cầu cá nhân của họ hay không.
      </Text>
      <Text fontWeight={600} pt={2} fontSize={18}>
        Nếu tôi có các thắc mắc khác liên quan đến cam kết này thì sao?
      </Text>
      <Text fontSize={18} color='#222222'>
        Kiểm tra các Câu hỏi thường gặp cụ thể của chúng tôi tại Trung tâm trợ giúp về Không phân biệt đối xử. Bạn cũng
        có thể xem tài nguyên dành cho chủ nhà của chúng tôi, trong đó có các câu hỏi thường gặp của chủ nhà về Chính
        sách không phân biệt của Airbnb.
      </Text>
      <VStack w='100%' pt={4} spacing={4}>
        <Button onClick={() => setStep(stepIndex - 1)} w='100%'>
          Quay lại
        </Button>
      </VStack>
    </VStack>
  )
}
