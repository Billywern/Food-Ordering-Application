import React, { useState, Fragment }from 'react'
import { GetAvailableRestaurantData, sendOrders } from '../../services/restaurants'

import { 
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles'

import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core'

import {
  Close as CloseIcon
} from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    checkboxForm: {
      marginBottom: theme.spacing(1)
    },
    totalAmountContainer: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    }
  }),
)

export const OrderMenuDialog = (props: OrderMenuDialogProps) => {
  const classes = useStyles()
  const { open, data, onClose } = props
  const checkboxData = data.menu.map((value) => ({
    ...value,
    chosen: false
  }))
  const [order, setOrder] = useState(checkboxData)
  const [totalPrice, setTotalPrice] = useState(0)
  const handleOrderChanges = (event: React.ChangeEvent<HTMLInputElement>, menuId: string) => {
    let newTotalPrice = 0
    const newOrderChanges = order.map((value) => {
      if (value.menuId === menuId) {
        value.chosen = event.target.checked
      }
      if (value.chosen) {
        newTotalPrice += value.price
      }
      return value
    })
    setOrder(newOrderChanges)
    setTotalPrice(newTotalPrice)
  }
  const getCheckedMenuIds = () => order.filter((value) => value.chosen).map((value) => value.menuId)
  const cannotOrder = () => order.filter((value) => value.chosen).length === 0

  const callSendOrder = async (restaurantId: string, menuIds: string[]) => {
    const { isOrdered } = await sendOrders(restaurantId, menuIds)
    if (isOrdered) {
      setOrder(checkboxData)
      onClose()
    }
  }

  return (
    <Fragment>
      <Dialog open={open}>
        <Grid
          container
          justify='space-between'
          alignItems='center'
        >
          <Grid item>
            <DialogTitle>{data.name} Menu</DialogTitle>
          </Grid>
          <Grid item>
            <IconButton onClick={onClose}>
              <CloseIcon/>
            </IconButton>
          </Grid>
        </Grid>
        <DialogContent>
          {order.map((value, index) => {
            return (
              <Fragment key={`${value.name}-${index}`}>
                <Grid
                  className={classes.checkboxForm}
                  container
                  alignItems='center'
                >
                  <Grid item xs={7}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={value.chosen}
                          onChange={(event) => handleOrderChanges(event, value.menuId)}
                          name={value.name}
                        />
                      }
                      label={value.name}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Typography>RM{value.price}</Typography>
                  </Grid>
                </Grid>
              </Fragment>
            )
          })}
          <Grid
            className={classes.totalAmountContainer}
            container
          >
            <Grid item xs={7}>
              <Typography variant='subtitle2'>
                Total:
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant='subtitle2'>
                RM {totalPrice}
              </Typography>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant='outlined' 
            color='primary'
            disabled={cannotOrder()}
            onClick={() => callSendOrder(data.restaurantId, getCheckedMenuIds())}
          >
            Order
          </Button>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

interface OrderMenuDialogProps {
  data: GetAvailableRestaurantData
  open: boolean
  onClose: () => void
}