import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import AlgoRow from './AlgoRow';

export default function Algo(props) {
  const [tableOldBudget] = useState(props.oldBudget);
  const [tableAlgo] = useState(props.algo);

  return (
    <Stack sx={{ display: 'flex', justifyItems: 'center', alignItems: 'center', marginRight: 2 }}>
      <TableContainer sx={{ maxHeight: '1000px', maxWidth: '1000px' }} component={Paper}>
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
                New Budget
              </TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold', fontSize: '18px' }} align="center">
                Precent
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(tableOldBudget).map((key, index) =>
              key !== 'total' ? (
                <AlgoRow key={index} name={key} row={tableOldBudget[key]} rowAlgo={tableAlgo[key]} />
              ) : null
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
