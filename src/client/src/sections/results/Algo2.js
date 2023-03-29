import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Algo1Row from './Algo1Row';
import table from './Table';

export default function Algo2() {
  const [tableData] = useState(table);
  const [totalBudget] = useState(tableData.reduce((total, item) => total + Number(item.budget), 0));

  return (
    <Stack sx={{ display: 'flex', justifyItems: 'center', alignItems: 'center', marginRight: 2 }}>
      <TableContainer sx={{ maxHeight: '1000px', maxWidth: '1000px' }} component={Paper}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow sx={{ fontWeight: 'bold' }}>
              <TableCell align="center" />
              <TableCell sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }} align="center">
                Subject
              </TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }} align="center">
                Old Budget
              </TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }} align="center">
                New Budget
              </TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }} align="center">
                Precent
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <Algo1Row key={row.id} row={row} totalBudget={totalBudget} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
