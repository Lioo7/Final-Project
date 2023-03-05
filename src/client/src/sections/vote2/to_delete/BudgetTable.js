import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

export default function TableBudget({ id, value, maxBudget, handleBudgetChange }) {
  const [budget, setBudget] = useState(value);
  console.log('TableBudget: render',  id, value, maxBudget,);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setBudget(newValue);
    handleBudgetChange(id, newValue);
  };

  return (
    <TextField
      type="number"
      value={budget}
      onChange={handleChange}
      InputProps={{
        inputProps: {
          min: 0,
          max: maxBudget,
        },
      }}
    />
  );
}

TableBudget.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  maxBudget: PropTypes.number.isRequired,
  handleBudgetChange: PropTypes.func.isRequired,
};
