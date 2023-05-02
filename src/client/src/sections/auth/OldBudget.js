import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import OldBudgetRow from './OldBudgetRow';
import LoadingTable from './LoadingTable';

export default function OldBudget(props) {
  return (
    <Stack sx={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
      {props.tableData.length === 0 ? (
        <LoadingTable />
      ) : (
        <TableContainer id="table" sx={{ maxHeight: 'auto', maxWidth: '650PX' }} component={Paper}>
          <Table stickyHeader aria-label="collapsible table">
            <TableHead>
              <TableRow sx={{ fontWeight: 'bold' }}>
                <TableCell align="center" />
                <TableCell sx={{ color: 'black', fontWeight: 'bold', fontSize: '18px' }} align="center">
                  Subject
                </TableCell>
                <TableCell sx={{ color: 'black', fontWeight: 'bold', fontSize: '18px' }} align="center">
                  Old Budget
                </TableCell>
                <TableCell sx={{ color: 'black', fontWeight: 'bold', fontSize: '18px' }} align="center">
                  Precent
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.tableData.map((row) => (
                <OldBudgetRow key={row.id} row={row} totalBudget={props.totalBudget} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
}
