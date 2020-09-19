import React, { useEffect, useState } from 'react'
import { AvailableOrderTable } from './component/available-order-table'
import { 
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import {
  Container,
  Typography
} from '@material-ui/core'

import { getAvailableRestaurants, GetAvailableRestaurantData } from '../services/restaurants'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      padding: theme.spacing(7)
    }
  }),
)

export const AvailableOrder = () => {
  const classes = useStyles()
  const [ restaurants, setRestaurants ] = useState<GetAvailableRestaurantData[]>([])

  useEffect(() => {
    const fetchRestaurants = async () => {
      const results = await getAvailableRestaurants()
      setRestaurants(results.data)
    }
    fetchRestaurants()
  }, [])
  return (
    <Container className={classes.mainContainer}>
      <Typography  
        variant='h4'
        component='h1'
        align='center'
      >
        Available Order
      </Typography>
      <AvailableOrderTable data={restaurants}/>
    </Container>
  )
}
