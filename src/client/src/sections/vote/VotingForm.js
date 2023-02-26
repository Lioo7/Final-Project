import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Row from './Row';
import table from './Table';

export default function CollapsibleTable() {
  const [tableData, setTableData] = useState(table);
  const totalBudget = tableData.reduce((total, item) => total + item.budget, 0);

  const handleSubmit = () => {
    if (totalBudget !== 1000) {
      window.alert('Error: Total budget must be 1000.');
    } else {
      console.log('Total budget is 1000.');
    }
  };

  const handleVote = (id, value) => {
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
      <TableContainer sx={{ maxHeight: '500px', maxWidth: '1000px' }} component={Paper}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              {/* sx={{ backgroundColor: '#000', color: 'white', fontWeight: 'bold', fontSize: '25px' }} */}
              <TableCell>Subject</TableCell>
              <TableCell align="center">Budget</TableCell>
              <TableCell align="center">Vote</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <Row key={row.id} row={row} handleVote={handleVote}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Button
          variant="outlined"
          sx={{ width: '300px', height: '60px', fontWeight: 'bold', fontSize: '25px' }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Stack>
  );
}
