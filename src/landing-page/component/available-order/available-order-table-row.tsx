import React from 'react'
import { GetAvailableRestaurantData } from '../../../services/restaurants'
import { convertMomentTimeLocale } from '../../../util/dateTime'
import { AvailableOrderTableRowMoreDetail } from './available-order-table-row-more-details'

import { 
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import {
  Collapse,
  IconButton,
  Typography,
  TableCell,
  TableRow,
} from '@material-ui/core'

import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon
} from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableCellCollapse: {
      paddingTop: 0,
      paddingBottom: 0
    }
  }),
)

export const AvailableOrderTableRow = (props: AvailableOrderTableRowProps) => {
  /**
   * @description
   * To show the list of available restaurants based on operation hours, off days
   * and also allow user to order food. This is where the data is set to each of its row. 
   */
  const classes = useStyles()
  const { data } = props
  const [ open, setOpen ] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow>
        <TableCell component='th' scope='row'>
          <Typography variant='h6'>
            {data.name}
          </Typography>
        </TableCell>
        <TableCell>
          {data.isAvailable ?
            <React.Fragment>
              <Typography variant='h6' color='secondary'>Open</Typography>
              <Typography variant='caption'>Closes at {convertMomentTimeLocale(data.operationHours.endTime)}</Typography>
            </React.Fragment> :
            <Typography variant='h6' color='error'>Close</Typography>
            }
        </TableCell>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.tableCellCollapse} colSpan={6}>
          <Collapse
            in={open}
            timeout='auto'
            unmountOnExit
          >
            <AvailableOrderTableRowMoreDetail data={data}/>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

interface AvailableOrderTableRowProps {
  data: GetAvailableRestaurantData
}
