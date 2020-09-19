import React from 'react'
import { GetAvailableRestaurantData } from '../../services/restaurants'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core'
export const OrderMenuDialog = (props: OrderMenuDialogProps) => {
  const { open, data } = props

  return (
    <React.Fragment>
      <Dialog open={open}>
        <DialogTitle>{data.name} Menu</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

interface OrderMenuDialogProps {
  data: GetAvailableRestaurantData
  open: boolean
}