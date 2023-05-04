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
      <Text fontWeight={600}>Our Community Commitment</Text>
      <Text fontWeight={700} as='h3' pt={4} fontSize={25}>
        Memorable Trip is a place where everyone can feel like a community for them.{' '}
      </Text>
      <Text py={6}>To ensure this, we ask that you commit to the following</Text>
      <Text>
        I agree to treat everyone in the Memorable Trip community with respect and non-judgment or prejudice, regardless
        of race, religion, national origin, ethnicity, color, disability, sex, gender, gender identity, sexual
        orientation or age.
      </Text>
      <Text py={4} onClick={() => setStep(stepIndex + 1)} fontWeight={600} textDecoration='underline' cursor='pointer'>
        Learn more &gt;
      </Text>
      <Text pt={6} pb={2}>
        Terms of Service Memorable Trip{' '}
      </Text>
      <Text>
        I also accept{' '}
        <Text as='span' fontWeight={600} textDecoration='underline'>
          Terms of Service, Payment Terms of Service, Privacy Policy
        </Text>{' '}
        và{' '}
        <Text as='span' fontWeight={600} textDecoration='underline'>
          Memorable Trip's nondiscrimination policy.
        </Text>
      </Text>
      <VStack w='100%' pt={4} spacing={4}>
        <Button onClick={() => navigate(navigationFn.HOME)} bgColor='#E00B41' color='white' w='100%'>
          Agree and continue
        </Button>
        <Button onClick={() => navigate(navigationFn.HOME)} w='100%'>
          Refuse{' '}
        </Button>
      </VStack>
    </VStack>
  )
}
