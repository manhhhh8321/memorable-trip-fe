import { Box, Button, Image, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { CommunityStepOne, CommunityStepSecond } from '../components'

export const CommunityCommitPage = () => {
  const [step, setStep] = useState(1)
  useEffect(()=>{
    window.scrollTo({
        top:0,
        behavior: 'smooth',
    })
  },[step])
  return (
    <VStack w='100%'>
      <VStack w='50%' mt={20} p={6} border='1px solid #ccc' borderRadius={6} alignItems='start'>
        <CommunityStepOne setStep={setStep} stepIndex={step} />
        <CommunityStepSecond setStep={setStep} stepIndex={step} />
      </VStack>
    </VStack>
  )
}
