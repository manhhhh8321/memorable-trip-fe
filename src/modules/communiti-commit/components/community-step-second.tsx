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
        Introduction to Community Commitment
      </Text>
      <Text fontWeight={600} pt={1} fontSize={18}>
        Why did Memorable Trip create this commitment?
      </Text>
      <Text fontSize={18} color='#222222'>
        This commitment is an important step towards creating a global community where everyone can feel like they
        belong. Discrimination makes hosts, guests, and their families feel unwelcome and unable to connect, and we do
        not accept that. Building an Memorable Trip community where everyone can feel like they belong depends on
        everyone in the community understanding and agreeing to help us achieve this mission.
      </Text>
      <Text fontWeight={600} pt={2} fontSize={18}>
        What if I refuse to make this commitment?
      </Text>
      <Text fontSize={18} color='#222222'>
        If you refuse the commitment, you won't be able to list or book on Memorable Trip, and you may choose to delete
        your account. Once you delete your account, any upcoming trips you've booked will be canceled. You'll still be
        able to browse Memorable Trip but won't be able to book or host.
      </Text>
      <Text fontWeight={600} fontSize={18} pt={4} pb={4}>
        As a host, what if I have safety concerns when accepting bookings from someone?
      </Text>
      <Text fontSize={18} color='#222222'>
        If you're sharing your living space with guests, you may choose to only accept guests of the same gender.
      </Text>
      <Text fontSize={18} color='#222222'>
        Under this policy, you can also decline guests for other reasons, as long as they're not based on race,
        religion, national origin, ethnicity, sexual orientation, or age.
      </Text>
      <Text fontSize={18} color='#222222'>
        In general, please carefully consider the reason when considering a booking request to ensure fairness.
      </Text>
      <Text fontWeight={600} pt={2} fontSize={18}>
        What if local laws restrict me from hosting certain guests?
      </Text>
      <Text fontSize={18} color='#222222'>
        Please post information about the restrictions on renting out your home/room, but be sure to state that this is
        a legal requirement in your area and that you're complying with local laws.
      </Text>
      <Text fontWeight={600} pt={2} fontSize={18}>
        Can I refuse guests with disabilities if I think my home isn't suitable for them?
      </Text>
      <Text fontSize={18} color='#222222'>
        In many cases, Memorable Trip hosts are not required to comply with the standards for accessible housing set
        forth in the US Americans with Disabilities Act (ADA). However, you cannot refuse a guest because they are or
        are perceived to be disabled. You should make every effort to provide accurate information about features
        suitable for people with special needs (or the absence of such features), allowing disabled guests to decide
        whether the home is suitable for their personal needs.
      </Text>
      <Text fontWeight={600} pt={2} fontSize={18}>
        What if I have other questions related to this commitment?
      </Text>
      <Text fontSize={18} color='#222222'>
        Check out our specific Frequently Asked Questions in the Non-Discrimination Help Center. You can also view our
        resources for hosts, which include frequently asked questions from hosts about Memorable Trip's
        non-discrimination policy.
      </Text>
      <VStack w='100%' pt={4} spacing={4}>
        <Button onClick={() => setStep(stepIndex - 1)} w='100%'>
          Quay lại
        </Button>
      </VStack>
    </VStack>
  )
}
