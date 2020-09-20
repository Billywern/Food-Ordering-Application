import React, { Fragment, useEffect, useState } from 'react'
import { AvailableOrderTable } from './component/available-order/available-order-table'
import { OrderHistoriesTable } from './component/order-histories/order-histories-table'
import { 
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Zoom
} from '@material-ui/core'

import {
  ArrowBack as ArrowBackIcon,
  History as HistoryIcon,
} from '@material-ui/icons'

import { 
  getAvailableRestaurants,
  getPastOrders, 
  GetAvailableRestaurantData,
  GetPastOrdersData
} from '../services/restaurants'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      padding: theme.spacing(7)
    },
    foodOrderApplicationTitle: {
      marginBottom: theme.spacing(3)
    },
    availableOrderTitle: {
      marginBottom: theme.spacing(2)
    },
    orderHistoriesTitle: {
      marginBottom: theme.spacing(3)
    },
    orderHistoriesBackButton: {
      marginBottom: theme.spacing(2)
    }
  }),
)

export const AvailableOrder = () => {
  const classes = useStyles()
  const [ loading, setLoading ] = useState(true)
  const [ loadAvailableOrder, setLoadAvailableOrder ] = useState(false)
  const [ restaurants, setRestaurants ] = useState<GetAvailableRestaurantData[]>([])
  const [ orderHistories, setOrderHistories ] = useState<GetPastOrdersData[]>([])
  const [ loadOrderHistories, setLoadOrderHistories ] = useState(false)

  useEffect(() => {
    const fetchRestaurants = async () => {
      const results = await getAvailableRestaurants()
      setRestaurants(results.data)
      setLoading(false)
      setLoadAvailableOrder(true)
    }
    fetchRestaurants()
  }, [])

  const GoToOrderHistories = async () => {
    setLoadAvailableOrder(false)
    const results = await getPastOrders()
    results.data.reverse()
    setOrderHistories(results.data)
    setLoadOrderHistories(true)
  }
  const GoToAvailableOrders = () => {
    setLoadOrderHistories(false)
    setLoadAvailableOrder(true)
  }
  return (
    <Fragment>
      {loading && 
        <Grid
          className={classes.mainContainer}
          container
          justify='center'
        >
          <Grid item>
            <CircularProgress size={70}/>
          </Grid>
        </Grid>}
      {!loadAvailableOrder &&
      <Zoom in={loadOrderHistories}>
        <Container className={classes.mainContainer}>
          <Typography
            className={classes.orderHistoriesTitle}
            variant='h2'
            align='center'
          >
            Order Histories
          </Typography>
          <Grid 
            container
            className={classes.orderHistoriesBackButton}
          >
            <Grid item>
              <Button
                onClick={GoToAvailableOrders}
                startIcon={<ArrowBackIcon/>}
              >
                Available orders
              </Button>
            </Grid>
          </Grid>
          <OrderHistoriesTable data={orderHistories}/>
        </Container>
      </Zoom>}
      <Zoom in={loadAvailableOrder}>
        <Container className={classes.mainContainer}>
          <Typography
            className={classes.foodOrderApplicationTitle}
            variant='h2'
            align='center'
          >
            Food Order Application
          </Typography>
          <Grid 
            container
            justify='space-between'
          >
            <Grid item>
              <Typography
                className={classes.availableOrderTitle}
                variant='h4'
                component='h1'
              >
                Available Order
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={GoToOrderHistories}
                startIcon={<HistoryIcon/>}
              >
                Order Histories
              </Button>
            </Grid>
          </Grid>
          <AvailableOrderTable data={restaurants}/>
        </Container>
      </Zoom>
    </Fragment>
  )
}
