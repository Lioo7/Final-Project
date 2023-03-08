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
import Row from './Row';

export default function ChildTable(props) {
  const [tableData, setTableData] = useState(props.row);
  console.log('ChildTable: render', tableData, props.totalBudget);

  // Calculate the sum of the budget of the children

  const childHandleVote = (id, value) => {
    const diff = value - tableData.find((row) => row.id === id).budget;
    const updatedTableData = tableData.map((row) => {
      if (row.id === id) {
        return { ...row, budget: value };
      } 
      if (row.parentId === id) {
        const childBudget = row.budget - diff / (tableData.length - 1);
        return { ...row, budget: childBudget };
      }
      return row;
    });
    setTableData(updatedTableData);
  };

  useEffect(() => {
    setTableData(props.tableData);
  }, [props.tableData]);

  
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
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <Row
                key={row.id}
                row={row}
                handleVote={props.handleVote}
                totalBudget={props.totalBudget}
                maxBudget={props.maxBudget}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

ChildTable.propTypes = {
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      subject: PropTypes.string.isRequired,
      budget: PropTypes.number.isRequired,
      parentId: PropTypes.number,
    })
  ),
  maxBudget: PropTypes.number.isRequired,
};

