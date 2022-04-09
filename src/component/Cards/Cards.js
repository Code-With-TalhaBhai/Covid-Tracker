import React from 'react'
import {Card, CardContent, Typography, Grid} from '@mui/material';
import CountUp from 'react-countup';
import styles from './Cards.module.css';
import cx from 'classnames' // For multiple classes

// function Cards(props) {
function Cards(props) {
  // console.log(props)
  console.log(props.data.cases,props.data.recovered,props.data.deaths)
  if(!props){
    return '...Loading'
  }
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)} style={{backgroundColor:'rgba(0, 0, 255, 0.5)',padding:'40px 30px'}}>
          <CardContent>
            {/* <Typography color="textSecondary" gutterBottom>Infected</Typography> */}
            <Typography variant='h5' color="#fafafa" gutterBottom>Infected</Typography>
            <Typography variant='h3' color="#fafafa">
              <CountUp
                start={0}
                end={props.data.cases===''?0:props.data.cases}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="#fafafa">{new Date(props.data.updated || Date.now()).toDateString()}</Typography>
            <Typography variant='body2'>Number of active cases of COVID-19</Typography>
          </CardContent>
        </Grid>
        
        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recoverd)} style={{backgroundColor:'rgba(0, 255, 0, 0.5)',padding:'40px 30px'}}>
          <CardContent>
          <Typography variant='h5' color="#fafafa" gutterBottom>Recovered</Typography>
            <Typography variant='h3' color="#fafafa">
              <CountUp
                start={0}
                end={props.data.recovered}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">{new Date(props.data.updated || Date.now()).toDateString()}</Typography>
            <Typography variant='body2'>Number of recovered cases from COVID-19</Typography>
          </CardContent>
        </Grid>

        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)} style={{backgroundColor:'rgba(255, 0, 0, 0.5)',padding:'40px 30px'}}>
          <CardContent>
          <Typography variant='h5' color="#fafafa" gutterBottom>Deaths</Typography>
            <Typography variant='h3' color="#fafafa">
              <CountUp
                start={0}
                end={props.data.deaths}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">{new Date(props.data.updated || Date.now()).toDateString()}</Typography>
            <Typography variant='body2'>Number of deaths caused by COVID-19</Typography>
          </CardContent>
        </Grid>
        
      </Grid>
    </div>
  )
}

export default Cards