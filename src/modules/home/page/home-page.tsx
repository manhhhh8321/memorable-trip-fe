import { Box, Grid, Stack, calc } from '@chakra-ui/react'
import React from 'react'
import { CardItem } from '~/components'

export const HomePage = () => {
  return (
    <Grid templateColumns={{lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)', '2xl': 'repeat(5, 1fr)' }} gap={7}>
      {Array(11)
        .fill(0)
        .map((v, i) => (
          <Box key={i} w={'100%'}>
            <CardItem />
          </Box>
        ))}
    </Grid>
  )
}
