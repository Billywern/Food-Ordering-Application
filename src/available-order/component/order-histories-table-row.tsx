import React from 'react'
import { GetPastOrdersData } from '../../services/restaurants'
import moment from 'moment'

import { 
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import {
  Typography,
  TableCell,
  TableRow,
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableCellCollapse: {
      paddingTop: 0,
      paddingBottom: 0
    }
  }),
)

export const OrderHistoriesTableRow = (props: OrderHistoriesTableRowProps) => {
  const { data } = props
  const currentDate = moment()
  const orderedDate = moment(data.createdOn)
  const formattedOrderedDate = orderedDate.diff(currentDate) <= 1 ? orderedDate.calendar({
    sameDay: '[Today], hh:mm a',
    lastDay: '[Yesterday], hh:mm a'
  }) : orderedDate.format('DD/MM/YYYY hh:mm a')
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
      </TableRow>
    </React.Fragment>
  )
}

interface OrderHistoriesTableRowProps {
  data: GetPastOrdersData
}
