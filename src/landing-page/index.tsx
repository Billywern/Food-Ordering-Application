import React from 'react'
import { 
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import {
  Container,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      padding: theme.spacing(7)
    },
  }),
);

export const Landing = () => {
  const classes = useStyles()
  return (
    <Container
      className={classes.mainContainer}
      maxWidth='sm'
    >
      <Typography  
        variant='h4'
        component='h1'
        align='center'
      >
        Available Order
      </Typography>
    </Container>
  )
}
