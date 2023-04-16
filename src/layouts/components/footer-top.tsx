import { Box, Grid } from '@chakra-ui/react'
import React from 'react'
import { FooterTopItem } from './footer-top-item'
import { airbnb, communities, guests, supports } from '../models'

const data = [
  {
    title: 'Support',
    listTexts: supports
  },
  {
    title: 'Community',
    listTexts: communities
  },
  {
    title: 'Hosting',
    listTexts: guests
  },
  {
    title: 'Airbnb',
    listTexts: airbnb
  }
]
export const FooterTop = () => {
  return (
    <Grid templateColumns={'repeat(4,1fr)'}>
      {data.map((v, i) => (
        <FooterTopItem key={i} title={v.title} listTexts={v.listTexts} />
      ))}
    </Grid>
  )
}
