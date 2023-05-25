import React, { useState, useEffect } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import Ages from './Ages';
import Gender from './Gender';
import PreviousBudget from './PreviousBudget';
import Cards from './Cards';

export default function DashForm() {

  const [data, setData] = useState({});
  const url = 'http://localhost:5000/peoples_budget/dashboard';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const information = await response.json();
        setData(information);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setData(data)
  }, [data]);


  return (
    <>
      <Cards voters={data.voter_count}/>
      <Box display="flex" gap={25} ali gnItems="center" marginTop={8}>
        <Stack>
          <Typography variant="h6" style={{marginLeft: '340px'}}>Ages </Typography>
          <Ages width={400} ages={data.ages} />
        </Stack>

        <Stack>
          <Typography variant="h6" style={{marginLeft: '340px'}}>Gender </Typography>
          <Gender width={400} gender={data.genders}/>
        </Stack>
      </Box>

      <Stack marginTop={8}>
        <Typography variant="h6" style={{marginLeft: '890px'}}>Previous budget </Typography>
        <PreviousBudget />
      </Stack>
    </>
  );
}