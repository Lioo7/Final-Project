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
        console.log(information);
        setData(information);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setData(data)
    console.log('data',  data)
  }, [data]);


  return (
    <>
      <Cards voters={data.voter_count}/>
      <Box display="flex" gap={30} ali gnItems="center" marginTop={5}>
        <Stack>
          <Typography variant="h6">Ages: </Typography>
          <Ages width={350} ages={data.ages} />
        </Stack>

        <Stack>
          <Typography variant="h6">Gender: </Typography>
          <Gender width={350} gender={data.genders}/>
        </Stack>
      </Box>
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
        console.log(information);
        setData(information);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setData(data)
    console.log('data',  data)
  }, [data]);


  return (
    <>
      <Cards voters={data.voter_count}/>
      <Box display="flex" gap={30} ali gnItems="center" marginTop={5}>
        <Stack>
          <Typography variant="h6">Ages: </Typography>
          <Ages width={350} ages={data.ages} />
        </Stack>

        <Stack>
          <Typography variant="h6">Gender: </Typography>
          <Gender width={350} gender={data.genders}/>
        </Stack>
      </Box>

      <Stack marginTop={5}>
        <Typography variant="h6">Previous budget: </Typography>
        <PreviousBudget />
      </Stack>
    </>
  );
}
      <Stack marginTop={5}>
        <Typography variant="h6">Previous budget: </Typography>
        <PreviousBudget />
      </Stack>
    </>
  );
}