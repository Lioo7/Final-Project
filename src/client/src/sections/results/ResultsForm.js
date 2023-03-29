import React, { useState, useEffect } from 'react';
import { Typography, ButtonGroup, Box, Button } from '@mui/material';
import Loading from './Loading';
import Algo1 from './Algo1';
import Algo2 from './Algo2';
import BothAlgo from './BothAlgo';

export default function ResultsForm() {
  const [loading, setLoading] = useState(false);
  const [displayGraph1, setDisplayGraph1] = useState(false);
  const [displayGraph2, setDisplayGraph2] = useState(false);
  const [displayGraph3, setDisplayGraph3] = useState(false);

  const [data, setData] = useState({});
  const url = 'http://localhost:5000/peoples_budget/results';

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
  }, [data]);

  const handleButtonClick1 = () => {
    setDisplayGraph1(false);
    setDisplayGraph2(false);
    setDisplayGraph3(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDisplayGraph1(true);
    }, 3000); // 5 seconds
  };

  const handleButtonClick2 = () => {
    setDisplayGraph1(false);
    setDisplayGraph2(false);
    setDisplayGraph3(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDisplayGraph2(true);
    }, 3000); 
  };

  const handleButtonClick3 = () => {
    setDisplayGraph1(false);
    setDisplayGraph2(false);
    setDisplayGraph3(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDisplayGraph3(true);
    }, 3000); // 5 seconds
  };

  return (
    <div>
      <Box marginBottom={7} gap={12} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h5">Select an option:</Typography>
        <Box>
          <ButtonGroup size="large" variant="contained" aria-label="large button group">
            <Button id='algo1' sx={{ width: '200px', height: '50px', fontSize: '20px' }} fullWidth onClick={handleButtonClick1}>
              Algo 1
            </Button>
            <Button id='algo2' sx={{ width: '200px', height: '50px', fontSize: '20px' }} fullWidth onClick={handleButtonClick2}>
              Algo 2
            </Button>
            <Button id='both' sx={{ width: '200px', height: '50px', fontSize: '20px' }} fullWidth onClick={handleButtonClick3}>
              Both
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
      {loading && <Loading />}
      {displayGraph1 && <Algo1 />}
      {displayGraph2 && <Algo2 />}
      {displayGraph3 && <BothAlgo />}
    </div>
  );
}
