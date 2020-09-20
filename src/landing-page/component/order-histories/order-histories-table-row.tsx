import React from 'react'
import { GetPastOrdersData } from '../../../services/restaurants'
import { convertToMomentCalendarDate } from '../../../util/dateTime'

import {
  Typography,
  TableCell,
  TableRow,
} from '@material-ui/core'

export const OrderHistoriesTableRow = (props: OrderHistoriesTableRowProps) => {
  /**
   * @description
   * To show the history of order that the user has ordered.
   * This is where the order history table data is set in each of its row.
   */
  const { data } = props
  const formattedOrderedDate = convertToMomentCalendarDate(data.createdOn)
  const formattedDeliveryDate = convertToMomentCalendarDate(data.deliverBy)
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
            {data.menu.price}
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
