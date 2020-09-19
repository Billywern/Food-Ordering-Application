import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { 
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import {
  Collapse,
  Container,
  Grid,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper
} from '@material-ui/core'

import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon
} from '@material-ui/icons'

import { getAvailableRestaurants, GetAvailableRestaurantData } from '../services/restaurants'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      padding: theme.spacing(7)
    },
    tableCellCollapse: {
      paddingTop: 0,
      paddingBottom: 0
    }
  }),
);

const convertMomentTimeLocale = (time: string) => moment(time, 'HHmm').format('h:mma')

const AvailableOrderTableRowMoreDetail = (props: AvailableOrderTableRowMoreDetailProps) => {
  const { data } = props
  const availableDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return (
    <React.Fragment>
      <Grid container>
        <Typography variant='subtitle2'>
          Operation Hours
        </Typography>
        {availableDays.map((value) => {
          return (
            <Grid>
            </Grid>
          )
        })}
      </Grid>
    </React.Fragment>
  )

}
const AvailableOrderTableRow = (props: AvailableOrderTableRowProps) => {
  const classes = useStyles()
  const { data } = props
  const [ open, setOpen ] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow>
        <TableCell component="th" scope="row">
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
            <React.Fragment>
              <Typography variant='h6' color='error'>Close</Typography>
              <Typography variant='caption'>Opens at {convertMomentTimeLocale(data.operationHours.startTime)}</Typography>
            </React.Fragment>}
        </TableCell>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.tableCellCollapse}>
          <Collapse
            in={open}
            timeout='auto'
            unmountOnExit
          >
            <Grid container>
              <Typography>
                Hello collapse
              </Typography>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
const AvailableOrderTable = (props: AvailableOrderTableProps) => {
  const { data } = props
  const rowsPerPage = 10
  const [ page, setPage ] = useState(0)

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  }
  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableCell sortDirection='asc'>Restaurant Name</TableCell>
            <TableCell sortDirection='desc'>Status</TableCell>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((restaurantDetail, index) => (
              <AvailableOrderTableRow 
                key={`availableOrderRow-${index}`}
                data={restaurantDetail}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[10]}
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
      />
    </React.Fragment>
  )
}
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
  console.log('restaurants', restaurants)
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

interface AvailableOrderTableProps {
  data: GetAvailableRestaurantData[]
}

interface AvailableOrderTableRowProps {
  data: GetAvailableRestaurantData
}

interface AvailableOrderTableRowMoreDetailProps {
  data: GetAvailableRestaurantData
}