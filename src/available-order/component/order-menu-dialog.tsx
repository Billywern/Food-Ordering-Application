import React, { useState, Fragment }from 'react'
import moment from 'moment'
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
  TextField,
  Typography,
} from '@material-ui/core'

import {
  Close as CloseIcon
} from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dateAndTimePickerContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: theme.spacing(2)
    },
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
  const [ order, setOrder ] = useState(checkboxData)
  const [ totalPrice, setTotalPrice ] = useState(0)
  const [ deliverBy, setDeliverBy ] = useState('')
  const [ dateAndTimePickerError, setdateAndTimePickerError ] = useState(false)
  const [ dateAndTimePickerErrorMessage, setDateAndTimePickerErrorMessage ] = useState('Please choose a date within a week from now.')

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
  const handleDeliveredDateChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    const chosenDateAndTime = moment(event.target.value)
    const { offDays, operationHours} = data
    const startTime = operationHours.startTime
    const endTime = operationHours.endTime
    if (chosenDateAndTime.isBefore(moment())) {
      setDateAndTimePickerErrorMessage('Please choose the correct date.')
      setdateAndTimePickerError(true)
    } else if (offDays.includes(chosenDateAndTime.format('dddd'))) {
      setDateAndTimePickerErrorMessage('Restaurant is not avaiable on this date.')
      setdateAndTimePickerError(true)
    } else if (startTime > chosenDateAndTime.format('HHmm') || endTime < chosenDateAndTime.format('HHmm')) {
      setDateAndTimePickerErrorMessage('Restaurant is not opened at this hour.')
      setdateAndTimePickerError(true)
    } else if (chosenDateAndTime.diff(moment(), 'days') >= 7) {
      setDateAndTimePickerErrorMessage('Please choose a date within a week from now.')
      setdateAndTimePickerError(true)
    } else {
      setDeliverBy(chosenDateAndTime.format())
      setDateAndTimePickerErrorMessage('')
      setdateAndTimePickerError(false)
    }
  }
  const getCheckedMenuIds = () => order.filter((value) => value.chosen).map((value) => value.menuId)
  const cannotOrder = () => order.filter((value) => value.chosen).length === 0

  const callSendOrder = async () => {
    const { isOrdered } = await sendOrders(data.restaurantId, getCheckedMenuIds(), deliverBy)
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
          <form className={classes.dateAndTimePickerContainer} noValidate>
            <TextField
              error={dateAndTimePickerError}
              id="datetime-local"
              label="Delivered by"
              type="datetime-local"
              onChange={handleDeliveredDateChanges}
              InputLabelProps={{
                shrink: true,
              }}
              variant='outlined'
              helperText={dateAndTimePickerErrorMessage}
            />
          </form>
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
            disabled={cannotOrder() || dateAndTimePickerError}
            onClick={() => callSendOrder()}
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