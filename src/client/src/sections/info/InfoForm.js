import React, { useState, useEffect } from 'react'

import InfoCards from './InfoCards';

export default function InfoForm() {

  const [table, setTable] = useState();
  const url = 'http://localhost:5000/peoples_budget/information';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const information = await response.json();
        console.log(information);
        setTable(information);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <InfoCards />
    </div>
  );
}

