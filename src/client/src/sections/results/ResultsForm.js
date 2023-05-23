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
  const [algo2, setAlgo2] = useState({});
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
      setAlgo2(JSON.parse(information.generalized_median_algorithm));
      setLastTime(information.time);
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
      <Typography variant="h3" align="center" style={{ fontFamily: 'Ubuntu', marginBottom: '10' }}>
        Select an option:
      </Typography>

      {/* <div style={{marginTop: '-10', display: 'flex', justifyContent: 'center' }}>
        <img src={`${process.env.PUBLIC_URL}/img_bg/home2.png`} alt="Logo" style={{marginTop: '-10', width: '250px' }} />
      </div> */}

      <Box marginBottom={1} marginTop={7} gap={12} align="center">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            
          }}
        >
          <Button
            id="algo1"
            sx={{
              // marginRight: '180px',
              minWidth: '222px',
              width: '222px',
              height: '80px',
              fontSize: '20px',
              fontFamily: 'Ubuntu',
            }}
            variant={clicked1 ? 'contained' : 'outlined'}
            onClick={() => handleButtonClick(0)}
          >
            Median <br />
            Algorithm
          </Button>
          <img
            src={`${process.env.PUBLIC_URL}/img_bg/results.png`}
            alt="Logo"
            style={{ marginLeft: '40px', marginTop: '-95px', width: '300px' }}
          />
          <Button
            id="algo2"
            sx={{
              minWidth: '222px',
              width: '222px',
              height: '80px',
              fontSize: '20px',
              color: clicked2 ? 'primary' : 'default',
              fontFamily: 'Ubuntu',
            }}
            variant={clicked2 ? 'contained' : 'outlined'}
            onClick={() => handleButtonClick(1)}
          >
            generalized median algorithm
          </Button>
        </div>
      </Box>

      {(displayGraph1 || displayGraph2) && (
        <Typography variant="h6" align="center" marginBottom={2}>
          {lastTime}
        </Typography>
      )}
      {loading && <Loading />}
      {displayGraph1 && <Algo oldBudget={oldBudget} algo={algo1} />}
      {displayGraph2 && <Algo oldBudget={oldBudget} algo={algo2} />}
    </div>
  );
}
