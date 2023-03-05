import React, { useState } from 'react';
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
    }, 3000); // 5 seconds
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
            <Button sx={{ width: '200px', height: '50px', fontSize: '20px' }} fullWidth onClick={handleButtonClick1}>
              Algo 1
            </Button>
            <Button sx={{ width: '200px', height: '50px', fontSize: '20px' }} fullWidth onClick={handleButtonClick2}>
              Algo 2
            </Button>
            <Button sx={{ width: '200px', height: '50px', fontSize: '20px' }} fullWidth onClick={handleButtonClick3}>
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
