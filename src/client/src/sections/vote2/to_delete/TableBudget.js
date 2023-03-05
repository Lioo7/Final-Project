import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';

const maxBudget = 1000;

export default function TableBudget({ id, value, handleBudgetChange,onVoteChange }) {
  const [budget, setBudget] = useState(value);
  console.log('TableBudget render', id, value, maxBudget)
  const handleChange = (event) => {
    const newValue = event.target.value;
    setBudget(newValue);
    console.log('handleChange',newValue)
    handleBudgetChange(id, newValue);
    onVoteChange(id,newValue)
  };

  return (
    <TableCell align="left">
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
   </TableCell>

  );
}

TableBudget.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  maxBudget: PropTypes.number.isRequired,
  handleBudgetChange: PropTypes.func.isRequired,
};
