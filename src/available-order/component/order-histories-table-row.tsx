import React from 'react'
import { GetPastOrdersData } from '../../services/restaurants'
import moment from 'moment'
import {
  Typography,
  TableCell,
  TableRow,
} from '@material-ui/core'

export const OrderHistoriesTableRow = (props: OrderHistoriesTableRowProps) => {
  const { data } = props

  const formatToCalendarDate = (date: string) => moment(date).calendar({
    sameDay: '[Today], hh:mm a',
    lastDay: '[Yesterday], hh:mm a',
    lastWeek: '[Last] dddd, hh:mm a',
    sameElse: 'DD/MM/YYY, hh:mm a',
    nextDay: '[Tomorrow], hh:mm a',
    nextWeek: 'dddd, hh:mm a'
  })
  const formattedOrderedDate = formatToCalendarDate(data.createdOn)
  const formattedDeliveryDate = formatToCalendarDate(data.deliverBy)
  return (
    <React.Fragment>
      <TableRow>
        <TableCell component='th' scope='row'>
          <Typography variant='h6'>
            {data.name}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant='h6'>
            {data.menu.name}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant='h6'>
            RM {data.menu.price}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant='h6'>
            {formattedOrderedDate}
          </Typography>
        </TableCell>
        <TableCell>
        <Typography variant='h6'>
            {formattedDeliveryDate}
          </Typography>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

interface OrderHistoriesTableRowProps {
  data: GetPastOrdersData
}
