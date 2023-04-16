import {
  Box,
  Text,
  Input,
  InputGroup,
  useDisclosure,
  useOutsideClick,
  InputLeftElement,
  Flex,
  Icon
} from '@chakra-ui/react'
import Countries from '../../../mocks/countries.json';
import Flag from 'react-world-flags'

import { AsYouType } from 'libphonenumber-js'
import { useState, useEffect, useRef } from 'react'
import { Country, SearchOnList } from './searchOnList';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'

type PhoneNumberInputProps = {
  value?: string;
  onChange: (arg: string) => void
}

export const PhoneNumberInput = ({ onChange }: PhoneNumberInputProps) => {
  const ref = useRef(null)
  const [number, setNumber] = useState('+84')
  const [country, setCountry] = useState('')
  const [countryFlag, setCountryFlag] = useState(`vn`)
  const { isOpen, onToggle, onClose } = useDisclosure()

  useOutsideClick({
    ref: ref,
    handler: () => onClose()
  })

  useEffect(() => {
    if (country !== '' || number !== '') {
      onChange(`${country}${number}`)
    }
  }, [country, number, onChange])
  console.log(number)

  const onCountryChange = (item: Country) => {
    const parsedNumber = new AsYouType().input(`${country}${number}`)
    // console.log(item)
    setCountry(item?.dial_code)
    setCountryFlag(item?.code)
    onChange(parsedNumber)
    onClose()
  }

  const onPhoneNumberChange = (event: any) => {
    const value = event.target.value
    const parsedNumber = new AsYouType().input(`${country}${number}`)
    console.log(parsedNumber)
    // console.log(parsedNumber)
    setNumber(value)
    onChange(parsedNumber)
  }

  return (
    <>
      <Box as='section' ref={ref} position='relative'>
        <InputGroup>
          <InputLeftElement width='5em' cursor='pointer' onClick={onToggle}>
            <Flex pl={2} width='100%' alignItems='center'>
              {countryFlag ? (
                <Box mr='4px' width='50%' flex={1}>
                  <Flag height='1rem' code={countryFlag || ''} />
                </Box>
              ) : (
                <Icon name='phone' />
              )}
            </Flex>
            {isOpen ? <ChevronUpIcon boxSize={6} color='gray.500' /> : <ChevronDownIcon boxSize={6} color='gray.500' />}
          </InputLeftElement>
          <Input
            pl='5em'
            type='tel'
            value={number}
            pattern='^[0-9+]+$'
            placeholder='Enter your phone number'
            onChange={onPhoneNumberChange}
          />
        </InputGroup>

        {isOpen ? <SearchOnList data={Countries} onChange={onCountryChange} /> : null}
      </Box>
    </>
  )
}

// import React, { useState, useEffect } from 'react'
// import { Box, Flex, Icon, Input, Select, InputGroup, InputLeftElement } from '@chakra-ui/react'
// import Flag from 'react-world-flags'
// import { AsYouType } from 'libphonenumber-js'

// interface PhoneNumberInputProps {
//   size?: string
//   value?: any
//   country?: string
//   options?: { label: string; value: string; flag: string }[]
//   onChange?: (value: string) => void
//   placeholder?: string
// }

// export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
//   size = 'md',
//   value,
//   country,
//   options = [],
//   onChange = (value: string) => {},
//   placeholder = '',
//   ...rest
// }) => {
//   let [number, setNumber] = useState(value || '')
//   let [selectedCountry, setSelectedCountry] = useState<string | undefined>('VN')
//   let [countryCode, setCountryCode] = useState<string>('+84')

//   const onCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     let value = e.target.value
//     const flag = e.target.selectedOptions[0].dataset.tag

//     setCountryCode(value)
//     setSelectedCountry(flag)
//     onChange(value)
//   }

//   const onPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let value = e.target.value
//     let parsedNumber = new AsYouType().input(`${countryCode}${value}`)

//     setNumber(value)
//     onChange(parsedNumber)
//   }
//   return (
//     <InputGroup size={size} {...rest} h={10}>
//       <InputLeftElement width={countryCode ? '8rem' : '4rem'}>
//         <Select
//           top='0'
//           left='0'
//           zIndex={1}
//           bottom={0}
//           opacity={0}
//           height='40px'
//           position='absolute'
//           value={selectedCountry}
//           onChange={onCountryChange}
//         >
//           <option value='' />
//           {options.map((option) => {
//             return (
//               <option key={option.label} data-tag={option.flag} value={option.value}>
//                 {option.label}
//               </option>
//             )
//           })}
//         </Select>
//         <Flex pl={2} width='100%' alignItems='center'>
//           {selectedCountry ? (
//             <Box mr='4px' width='50%' flex={1}>
//               <Flag height='1rem' code={selectedCountry || ''} />
//             </Box>
//           ) : (
//             <>
//               <Icon name='phone' />
//             </>
//           )}
//         </Flex>
//         {countryCode && <Input border='none' w={60} h={'calc(100% - 4px)'} pl={1} pr={0} value={countryCode} />}
//       </InputLeftElement>
//       <Input
//         pl={countryCode ? '8rem' : '3rem'}
//         type='tel'
//         defaultValue={number}
//         value={value}
//         pattern='^[0-9+]+$'
//         placeholder={placeholder}
//         onChange={onPhoneNumberChange}
//       />
//     </InputGroup>
//   )
// }
