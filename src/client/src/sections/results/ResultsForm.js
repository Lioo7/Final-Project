import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import Loading from './Loading';
import Algo from './Algo';
import LoadingVote from './LoadingVote';

export default function ResultsForm() {
  const [loading, setLoading] = useState(false);
  const [displayGraph1, setDisplayGraph1] = useState(false);
  const [displayGraph2, setDisplayGraph2] = useState(false);
  const [clicked1, setClicked1] = useState(false);
  const [clicked2, setClicked2] = useState(false);

  // const [loadingPage, setLoadingPage] = useState(true);

  const [oldBudget, setOldBudget] = useState({});
  const [algo1, setAlgo1] = useState({});
  // const [algo2, setAlgo2] = useState({});
  const [lastTime, setLastTime] = useState('');
  const url = 'http://localhost:5000/peoples_budget/results';

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const information = await response.json();
      console.log('information', information);

      setOldBudget(JSON.parse(information.current_budget));
      setAlgo1(JSON.parse(information.median_algorithm));
      setLastTime(information.time);

      // setAlgo2(information.average_algorithm);
    } catch (error) {
      console.error(error);
      alert(error.message); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleButtonClick = (number) => {
    if (!loading) {
      setDisplayGraph1(false);
      setDisplayGraph2(false);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setDisplayGraph1(number === 0);
        setDisplayGraph2(number === 1);
      }, 3000);
      setClicked1(number === 0);
      setClicked2(number === 1);
    }
  };

  return Object.keys(oldBudget).length === 0 ? (
    <LoadingVote />
  ) : (
    <div>
      <Typography variant="h3" align="center" marginBottom={5}>
        Select an option:
      </Typography>

      <Box marginBottom={1} gap={12} align="center">
        <Box>
          <Button
            id="algo1"
            sx={{
              marginRight: '180px',
              width: '200px',
              height: '80px',
              fontSize: '20px',
            }}
            variant={clicked1 ? 'contained' : 'outlined'}
            onClick={() => handleButtonClick(0)}
          >
            Median Algorithm
          </Button>
          <Button
            id="algo2"
            sx={{ width: '200px', height: '80px', fontSize: '20px', color: clicked2 ? 'primary' : 'default' }}
            variant={clicked2 ? 'contained' : 'outlined'}
            onClick={() => handleButtonClick(1)}
          >
            Average Algorithm
          </Button>
        </Box>
      </Box>

      {(displayGraph1 || displayGraph2) && (
        <Typography variant="h6" align="center" marginBottom={2}>
          {lastTime}
        </Typography>
      )}
      {loading && <Loading />}
      {displayGraph1 && <Algo oldBudget={oldBudget} algo={algo1} />}
      {displayGraph2 && <Algo oldBudget={oldBudget} algo={algo1} />}
    </div>
  );
}
