import React from 'react'
import moment from 'moment'
import { GetAvailableRestaurantData } from '../../services/restaurants'
import { convertMomentTimeLocale } from '../../util/dateTime'
import { 
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles'

import {
  Button,
  Grid,
  Typography,
} from '@material-ui/core'

import {
  AccessTime as AccessTimeIcon
} from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableCellMoreDetailsContainer: {
      padding: theme.spacing(3)
    },
    operationHourTitle: {
      marginBottom: theme.spacing(1)
    },
    operationHourOpeningTimeText: {
      fontWeight: 600
    },
    viewMenuButtonContainer: {
      marginTop: theme.spacing(1)
    }
  }),
)


export const AvailableOrderTableRowMoreDetail = (props: AvailableOrderTableRowMoreDetailProps) => {
  const classes = useStyles()
  const { data } = props
  const { startTime, endTime } = data.operationHours
  const currentTime = moment().format('HHmm')
  const currentDay = moment().format('dddd')
  const availableDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return (
    <React.Fragment>
      <Grid container className={classes.tableCellMoreDetailsContainer}>
        <Grid
          className={classes.operationHourTitle}
          container
          spacing={1}
          alignItems='center'
        >
          <Grid item>
            <AccessTimeIcon/>
          </Grid>
          <Grid item>
            <Typography variant='subtitle2'>
              Operation Hours
            </Typography>
          </Grid>
        </Grid>
        {availableDays.map((value) => {
          return (
            <Grid
              key={`${data.restaurantId}-${value}`} 
              container
            >
              <Grid item xs={2}>
                <Typography 
                  className={`${data.isAvailable && currentDay.includes(value) && classes.operationHourOpeningTimeText}`}
                >
                  {value}
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography 
                  className={
                    `${data.isAvailable &&
                      currentDay.includes(value) && 
                      currentTime > startTime && 
                      currentTime < endTime && classes.operationHourOpeningTimeText}`
                  }
                >
                  {convertMomentTimeLocale(data.operationHours.startTime)} - {convertMomentTimeLocale(data.operationHours.endTime)}
                </Typography>
              </Grid>
            </Grid>
          )
        })}
        <Grid
          className={classes.viewMenuButtonContainer}
          container
          justify='flex-end'
        >
          <Grid>
            <Button color='primary'>
              View menu
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

interface AvailableOrderTableRowMoreDetailProps {
  data: GetAvailableRestaurantData
}