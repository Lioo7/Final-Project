import * as React from 'react';
import { useState } from 'react';
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
  const [tableData, setTableData] = useState(props.tableData);


  const childHandleVote = (id, value) => {
      setTableData((prevTableData) => {
        const updatedTableData = prevTableData.map((row) => {
          if (row.id === id) {
            return { ...row, budget: value };
          }
          return row;
        });
        return updatedTableData;
      });
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
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <Row key={row.id} row={row} handleVote={childHandleVote}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

ChildTable.propTypes = {
  tableData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    subject: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        subject: PropTypes.string.isRequired,
        budget: PropTypes.number.isRequired,
      })
    ),
  }),
};
