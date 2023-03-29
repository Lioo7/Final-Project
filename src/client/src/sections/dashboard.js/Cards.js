import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import CardStructure from './CardStructure';

export default function Cards(props) {
  return (
    <div>
          <Grid container spacing={3} display="flex" >
            <Grid item xs={12} sm={6} md={3} >
              <CardStructure title="Total budget" icon={'mdi:money'} val={'501.B'} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <CardStructure title="Votes amount" color="info" icon={'game-icons:vote'} val={props.voters} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <CardStructure title="Popular office" color="warning" icon={'ep:office-building'} val={'ש.חברתיים'}/>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <CardStructure title="Popular city" color="error" icon={'game-icons:modern-city'} val={'אשקלון'}/>
            </Grid>

          </Grid>
    </div>
  );
}
Cards.propTypes = { voters: PropTypes.number.isRequired };