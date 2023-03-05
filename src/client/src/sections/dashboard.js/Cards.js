import React from 'react';
import { Grid } from '@mui/material';
import CardStructure from './CardStructure';

export default function Cards() {
  return (
    <div>
          <Grid container spacing={3} display="flex" >
            <Grid item xs={12} sm={6} md={3} >
              <CardStructure title="Total budget" icon={'mdi:money'} val={'100.m'} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <CardStructure title="Votes amount" color="info" icon={'game-icons:vote'} val={'6.m'} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <CardStructure title="Popular office" color="warning" icon={'ep:office-building'} val={'ביטחון'}/>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <CardStructure title="Viewers" color="error" icon={'ic:outline-remove-red-eye'} val={'12520'}/>
            </Grid>

          </Grid>

    </div>
  );
}
