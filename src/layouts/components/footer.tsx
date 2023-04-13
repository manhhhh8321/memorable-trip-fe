import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Grid, VStack, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'react-router'
import { FooterTop } from './footer-top'
import { FooterBottom } from './footer-bottom'
import { FooterTopItem } from './footer-top-item'

type TFooter = {

}

export const Footer = (props: TFooter) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const location = useLocation();
  return (
    <VStack
      pos='fixed'
      bottom={0}
      zIndex={10}
      px={{ xl: 8, '2xl': 20 }}
      bg='white'
      w={'100%'}
      borderTop='1px solid #ccc'
    >
      {/* <FooterTop /> */}
      <FooterBottom onOpen={onOpen} />
      <Drawer placement='bottom' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderTopLeftRadius={10} borderTopRightRadius={10} minH={300}>
          {/* <DrawerHeader borderBottomWidth='1px'>Basic Drawer</DrawerHeader> */}
          <DrawerCloseButton />
          <DrawerBody py={0} mt={12} mb={16} px={{ xl: 8, '2xl': 20 }}>
            <FooterTop />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </VStack>
  )
}
