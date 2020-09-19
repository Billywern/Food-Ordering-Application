import React, { Fragment, useEffect, useState } from 'react'
import { AvailableOrderTable } from './component/available-order-table'
import { 
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import {
  CircularProgress,
  Container,
  Grid,
  Typography,
  Zoom
} from '@material-ui/core'

import { getAvailableRestaurants, GetAvailableRestaurantData } from '../services/restaurants'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      padding: theme.spacing(7)
    },
    availableOrderTitle: {
      marginBottom: theme.spacing(3)
    }
  }),
)

export const AvailableOrder = () => {
  const classes = useStyles()
  const [ load, setLoad] = useState(false)
  const [ restaurants, setRestaurants ] = useState<GetAvailableRestaurantData[]>([])

  useEffect(() => {
    const fetchRestaurants = async () => {
      const results = await getAvailableRestaurants()
      setRestaurants(results.data)
      setLoad(true)
    }
    fetchRestaurants()
  }, [])
  return (
    <Fragment>
      {!load && 
        <Grid
          className={classes.mainContainer}
          container
          justify='center'
        >
          <Grid item>
            <CircularProgress size={70}/>
          </Grid>
        </Grid>}
      <Zoom in={load}>
        <Container className={classes.mainContainer}>
          <Typography
            className={classes.availableOrderTitle}
            variant='h4'
            component='h1'
            align='center'
          >
            Available Order
          </Typography>
          <AvailableOrderTable data={restaurants}/>
        </Container>
      </Zoom>
    </Fragment>
  )
}
