import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TableVote from './TableVote';
import TableBudget from './TableBudget';

function Row(props) {
  const { row, onRowClick, onBudgetChange, onVoteChange } = props;
  console.log('Row: render', row);
  return (
    <>
      <TableRow>
        <TableCell>
          {row.children && (
            <IconButton aria-label="expand row" size="small" onClick={() => onRowClick(row.id)}>
              <ExpandMoreIcon style={{ transform: row.isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </IconButton>
          )}
        </TableCell>
        <TableCell component="th" scope="paddingLeft">
          {row.subject}
        </TableCell>
        <TableBudget id={row.id} value={row.budget} handleBudgetChange={onBudgetChange} onVoteChange={onVoteChange} />
        <TableVote
          id={row.id}
          vote={Number.isNan(row.vote) ? row.budget : row.vote}
          onVoteChange={onVoteChange}
          onBudgetChange={onBudgetChange}
        />
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    subject: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
    vote: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.array,
  }).isRequired,
  onRowClick: PropTypes.func.isRequired,
  onBudgetChange: PropTypes.func.isRequired,
  onVoteChange: PropTypes.func.isRequired,
};

export default Row;

//  {/* //   <tr onClick={() => onRowClick(row.id)}>
//     <td>{row.subject}</td>
//     <td><TableBudget id ={row.id} value={row.budget}  handleBudgetChange={onBudgetChange} /></td>
//     <td><TableVote id ={row.id} vote={row.vote}  onVoteChange={onVoteChange} /></td>
//   </tr> */}
