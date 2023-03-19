import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import RowChilds1 from './RowChilds1';

export default function Childs5(props) {
  const [tableChilds, setTableChilds] = useState(props.childrens);
  // Calculate the sum of the budget of the children
  const totalChildBudget = tableChilds.reduce((total, item) => total + Number(item.budget), 0);
  const [table, setTable] = useState(props.table);

  const handleVote = (id, value, diff) => {
    // console.log('ParentTable: handleVote', id, value, diff);
    const updatedTableData = table.map((row) => {
      if (row.id === id) {
        return { ...row, budget: value };
      }
      const siblingBudget = parseInt(row.budget, 10) - diff / (table.length - 1);
      const finalBudget = siblingBudget > 0 ? siblingBudget : 0;

      return { ...row, budget: finalBudget };
    });

    setTable(updatedTableData);
  };

  return (
    <Stack sx={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
      <TableContainer sx={{ maxHeight: '400px', maxWidth: '1000px' }} component={Paper}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Subject</TableCell>
              <TableCell align="center">Budget</TableCell>
              <TableCell align="center">Vote</TableCell>
              <TableCell align="center">Precent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableChilds.map((child1) => (
              <RowChilds1
                // key={child1.id}
                row={child1}
                // handleChange={props.handleChange}
                handleVote={handleVote}
                // handleVote={childHandleVote}
                totalBudget={totalChildBudget}
                maxBudget={props.maxBudget}
                table={props.table}
                // sibilingLength={props.sibilingLength}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
