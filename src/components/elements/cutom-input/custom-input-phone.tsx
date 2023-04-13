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
  // value: string;
  onChange: (arg: string) => void
}

export const PhoneNumberInput = ({ onChange }: PhoneNumberInputProps) => {
  const ref = useRef(null)
  const [number, setNumber] = useState('')
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

  const onCountryChange = (item: Country) => {
    const parsedNumber = new AsYouType().input(`${country}${number}`)

    setCountry(item?.dial_code)
    setCountryFlag(item?.code)
    onChange(parsedNumber)
    onClose()
  }

  const onPhoneNumberChange = (event: any) => {
    const value = event.target.value
    const parsedNumber = new AsYouType().input(`${country}${number}`)

    setNumber(value)
    onChange(parsedNumber)
  }

  return (
    <>
      {`${country}${number}`}
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
              {/* <Icon name="chevron-down" /> */}
            </Flex>
            {/* <Text as="span" mr={3}>
              {countryFlag}
            </Text> */}
            {isOpen ? <ChevronUpIcon boxSize={6} color='gray.500' /> : <ChevronDownIcon boxSize={6} color='gray.500' />}
          </InputLeftElement>
          <Input
            pl='5em'
            type='tel'
            value={number}
            placeholder='Entrer votre numéro de téléphone'
            onChange={onPhoneNumberChange}
          />
        </InputGroup>

        {isOpen ? <SearchOnList data={Countries} onChange={onCountryChange} /> : null}
      </Box>
    </>
  )
}
