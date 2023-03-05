import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import Ages from './Ages';
import Gender from './Gender';
import Cities from './Cities';
import Cards from './Cards';

export default function DashForm() {
  return (
    <>
    <Cards/>
      <Box display="flex" gap={30} ali  gnItems="center" marginTop={5}>
        <Stack>
          <Typography variant="h6">Ages: </Typography>
          <Ages width={350} />
        </Stack>

        <Stack>
          <Typography variant="h6">Gender: </Typography>
          <Gender width={350} />
        </Stack>
      </Box>

      <Stack marginTop={5}>
        <Typography variant="h6">Cities: </Typography>
        <Cities />
      </Stack>
    </>
  );
}
