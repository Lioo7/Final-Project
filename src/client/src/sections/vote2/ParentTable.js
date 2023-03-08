import * as React from 'react';
import { useState, useEffect } from 'react';
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
import data from './Table';

export default function ParentTable() {
  const [tableData, setTableData] = useState(data);

  console.log('ParentTable: render', tableData);
  const totalBudget = tableData.reduce((total, item) => total + Number(item.budget), 0);
  const maxBudget = 100;

  const handleSubmit = () => {
    console.log('Total budget is ', maxBudget);

    if (totalBudget !== maxBudget) {
      window.alert("Error: Total budget must be 100.");
    } else {
      console.log('Total budget is ',totalBudget);
    }
  };

  const handleVote = (id, value,diff) => {
    const currSum= value
    console.log('ParentTable: handleVote', id, value, diff);
    const updatedTableData = tableData.map((row) => {
      if (row.id === id) {
        return { ...row, budget: value };
      }
      const siblingBudget = parseInt(row.budget,10) - (diff) / (tableData.length-1);
      const finalBudget = siblingBudget > 0 ? siblingBudget : 0;
      // console.log('ParentTable: handleVote (sibling)',Math.round(Math.min(finalBudget, row.budget), 2))

      return { ...row, budget: finalBudget };

    });
    console.log(currSum)
    setTableData(updatedTableData);
  };

  const calcBudget = (id,value,diff)=> {
    // let currSum = value;
    // while (currSum !== maxBudget){
    const updatedTableData = tableData.map((row) => {
      if (row.id === id) {
        return { ...row, budget: value };
      }

      const siblingBudget = parseInt(row.budget,10) - (diff) / (tableData.length-1);
      const finalBudget = siblingBudget > 0 ? siblingBudget : 0;
      // if (finalBudget === 0){
      //   currSum = parseInt(row.budget,10)
      // }
      console.log('ParentTable: handleVote (sibling)',Math.round(Math.min(finalBudget, row.budget), 2))

      return { ...row, budget: finalBudget };

      // return { ...row, budget: childBudget };
});
  // }
}



  // useEffect(() => {
  //   setTableData(tableData);
  // }, [tableData]);

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
            {tableData.map((row) => (
              <Row
                key={row.id}
                row={row}
                handleVote={handleVote}
                calcBudget={calcBudget}
                totalBudget={totalBudget}
                maxBudget={maxBudget}
              />
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
