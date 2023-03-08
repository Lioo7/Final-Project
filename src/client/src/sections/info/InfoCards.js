import React from 'react';
import { Grid } from '@mui/material';
import InfoCardStructure from './InfoCardStructure';

export default function InfoCards() {
  return (
    <div>
      <Grid container spacing={3} display="flex">
        <Grid item xs={12} sm={6} md={3}>
          <InfoCardStructure  val={'כלכלה'} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <InfoCardStructure color="info" val={'חינוך'} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <InfoCardStructure color="warning" val={'ביטחון'} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <InfoCardStructure color="error" val={'תרבות'} />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <InfoCardStructure val={'ספורט'} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <InfoCardStructure color="info" val={'כלכלה'} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <InfoCardStructure color="warning" val={'רווחה'} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <InfoCardStructure color="error" val={'תחבורה'} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <InfoCardStructure  val={'דתות'} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <InfoCardStructure color="info" val={'כלכלה'} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <InfoCardStructure color="warning" val={'תרבות'} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <InfoCardStructure color="error" val={'תקשורת'} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <InfoCardStructure  val={'בריאות'} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <InfoCardStructure color="info" val={'מדע'} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <InfoCardStructure color="warning" val={'אוצר'} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <InfoCardStructure color="error" val={'הגנת הסביבה'} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <InfoCardStructure  val={'בריאות'} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <InfoCardStructure color="info" val={'מדע'} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <InfoCardStructure color="warning" val={'אוצר'} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <InfoCardStructure color="error" val={'הגנת הסביבה'} />
        </Grid>
      </Grid>
    </div>
  );
}
