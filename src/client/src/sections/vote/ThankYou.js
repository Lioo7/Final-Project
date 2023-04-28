import React from 'react';
import { Stack, Typography } from '@mui/material';

const style = {
  textAlign: 'center',
  color: 'black',
  marginTop: '20px',
  fontFamily: ' system-ui',
  marginBottom: '20px',
  '&:hover': {
    color: 'rgb(0,0,205,0.7)',
  },
};

const styles = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/thank.png)`,
    backgroundSize: '35%',
    backgroundPosition: 'center',
    size: '100px',
    with: '150px',
    height: '180px',
  };

export default function ThankYou() {
  return (
    <div>
      <Typography variant="h1" sx={style}>
        Thank you for voting!<br/>
      </Typography>
      <Stack direction="column" alignItems="center" justifyContent="space-between" mb={1} style={styles}/>
    </div>
  );
}
