import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import InfoCards from './InfoCards';

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
    <Grid container>
      {Object.keys(table).map((key, index) => (
        // eslint-disable-next-line react/jsx-key
        <InfoCards keys={key} value={table[key]} index={index} styleCards={styleCards} />
      ))}
    </Grid>
  );
}
