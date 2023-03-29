import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import Loading from './Loading';
import Algo1 from './Algo1';
import Algo2 from './Algo2';
// import BothAlgo from './BothAlgo';

export default function ResultsForm() {
  const [loading, setLoading] = useState(false);
  const [displayGraph1, setDisplayGraph1] = useState(false);
  const [displayGraph2, setDisplayGraph2] = useState(false);
  const [clicked1, setClicked1] = useState(false);
  const [clicked2, setClicked2] = useState(false);

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
    setData(data);
  }, [data]);

  const handleButtonClick = (number) => {
    if (!loading){
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

  return (
    <div>
      <Typography variant="h3" align="center" marginBottom={5}>
        Select an option:
      </Typography>

      <Box marginBottom={5} gap={12} align="center">
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
            Algo 1
          </Button>
          <Button
            id="algo2"
            sx={{ width: '200px', height: '80px', fontSize: '20px', color: clicked2 ? 'primary' : 'default' }}
            variant={clicked2 ? 'contained' : 'outlined'}
            onClick={() => handleButtonClick(1)}
          >
            Algo 2
          </Button>
        </Box>
      </Box>
      {loading && <Loading />}
      {displayGraph1 && <Algo1 />}
      {displayGraph2 && <Algo2 />}
    </div>
  );
}
