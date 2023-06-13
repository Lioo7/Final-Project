import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import InfoCards from './InfoCards';

// The design of the information cards
const styleCards = {
  boxShadow: 20,
  textAlign: 'center',
  marginLeft: 14,
  marginRight: 4,
  marginTop: 14,
  fontSize: '15px',
  borderRadius: '50%',
  backgroundColor: '#007bff',
  color: 'black',
  width: '120px',
  height: '120px',
  fontFamily: ' system-ui',
};

export default function InfoForm() {
  const [table, setTable] = useState({});
  const url = 'http://localhost:5000/peoples_budget/information';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const information = JSON.parse(await response.json());
        setTable(information);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={3}>
      {Object.keys(table).map((key, index) => (
        <Grid item xs={6} sm={6} md={3} key={index}>
          <InfoCards keys={key} value={table[key]} index={index} styleCards={styleCards} />
        </Grid>
      ))}
    </Grid>
  );
}
