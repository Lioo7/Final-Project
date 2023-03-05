import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import Slider from '@mui/material/Slider';

export default function TableVote(props) {
  const {id, vote, onVoteChange,onBudgetChange } = props;
  console.log('TableVote render', id, vote)


  const handleVoteChange = (event, newValue) => {
    console.log('handleVoteChange',newValue)

    onVoteChange(id,newValue);
    onBudgetChange(id,newValue);
  };

  return (
    <TableCell align="left">

      <Slider
        value={vote}
        onChange={handleVoteChange}
        min={0}
        max={100}
        marks={[{ value: 0, label: '0%' }, { value: 50, label: '50%' }, { value: 100, label: '100%' }]}
        valueLabelDisplay="auto"
      />
    </TableCell>
  );
}

TableVote.propTypes = {
  id: PropTypes.number.isRequired,
  vote: PropTypes.number.isRequired,
  onVoteChange: PropTypes.func.isRequired,
};
