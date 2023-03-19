import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function VotingForm() {
  const navigate = useNavigate();

  const [tableData, setTableData] = useState(table);
  const totalBudget = tableData.reduce((total, item) => total + Number(item.budget), 0);
  const maxBudget = 100;

  const handleSubmit = () => {
    navigate('/peoples_budget/results', { replace: true });
  };

  // const handleVote = (id, value, diff) => {
  //   // Update siblings budget
  //   let updatedTableData = updateBudget(tableData, id, value, diff, maxBudget, 0);

  //   // Update childs1 budget
  //   updatedTableData = updatedTableData.map((row) => {
  //     if (!row.children) {
  //       return { ...row };
  //     }
  //     const totalChildBudget = row.children.reduce((total, item) => total + Number(item.budget), 0);
  //     const budgetDiff = row.budget - totalChildBudget;
  //     const childrens = updateBudget(row.children, id, value, budgetDiff, row.budget, 1);
  //     return { ...row, children: childrens };
  //   });
  //   setTableData(updatedTableData);
  // };

  const handleVote = (id, value, diff) => {
    // Update siblings budget
    let updatedTableData = updateBudget(tableData, id, value, diff, maxBudget, 0);

    // Update childs1 budget
    updatedTableData = updatedTableData.map((row) => {
      if (!row.children) {
        return { ...row };
      }
      const totalChildBudget = row.children.reduce((total, item) => total + Number(item.budget), 0);
      const budgetDiff = row.budget - totalChildBudget;
      const childrens = updateBudget(row.children, id, value, budgetDiff, row.budget, 1);
      return { ...row, children: childrens };
    });

    // Update childs2 budget
    updatedTableData = updatedTableData.map((row) => {
      if (!row.children) {
        return { ...row };
      }
      const children2 = row.children.map((child2) => {
        if (!child2.children) {
          return { ...child2 };
        }
        const totalChildBudget = child2.children.reduce((total, item) => total + Number(item.budget), 0);
        const budgetDiff = child2.budget - totalChildBudget;
        const childrens = updateBudget(child2.children, id, value, budgetDiff, child2.budget, 1);
        return { ...child2, children: childrens };
      });
      return { ...row, children: children2 };
    });
    setTableData(updatedTableData);
  };

  const updateBudget = (data, id, value, diff, currMaxBudget, isChilds) => {
    // - data (array): An array of objects representing the current budget data for the table.
    // - id (number): The ID of the row to update.
    // - value (number): The new budget value for the row.
    // - diff (number): The difference between the old and new budget values for the row.
    // - currMaxBudget (number): The maximum allowed budget for a row.
    // - isChilds (boolean): A flag indicating whether to update child rows as well.

    let updatedTableData = data.slice(); // create a copy of tableData
    let countRows = isChilds ? data.length : data.length - 1; // count of rows to update
    const rowsIds = data.map((row) => row.id); // array of row IDs
    let times = 1; // limit the while loop (not to stuck in inifinte loop)

    while (diff !== 0 && times < 20 && countRows > 0) {
      times += 1;
      let removedRows = 0; // count of rows that has reached to their max/0
      let remain = 0; // remaining difference to distribute among rows
      const budgetPerRow = diff / countRows;
      updatedTableData = updatedTableData.map((row) => {
        if (isChilds === 0 && row.id === id) {
          return { ...row, budget: value };
        }
        if (!rowsIds.includes(row.id)) {
          return { ...row };
        }
        let currBudget = parseFloat(row.budget) + budgetPerRow;
        if (currBudget > currMaxBudget) {
          remain += currBudget - currMaxBudget;
          removedRows += 1;
          const indexToRemove = rowsIds.indexOf(row.id);
          rowsIds.splice(indexToRemove, 1);
          currBudget = currMaxBudget;
        }
        if (currBudget < 0) {
          remain += currBudget;
          removedRows += 1;
          const indexToRemove = rowsIds.indexOf(row.id);
          rowsIds.splice(indexToRemove, 1);
          currBudget = 0;
        }
        return { ...row, budget: currBudget };
      });
      diff = remain;
      countRows -= removedRows;
    }
    return updatedTableData;
  };

  return (
    <Stack sx={{ display: 'flex', justifyItems: 'center', alignItems: 'center', marginRight: 2 }}>
      <TableContainer sx={{ maxHeight: '500px', maxWidth: '1000px' }} component={Paper}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              {/* sx={{ backgroundColor: '#000', color: 'white', fontWeight: 'bold', fontSize: '25px' }} */}
              <TableCell>Subject</TableCell>
              <TableCell align="center">Budget</TableCell>
              <TableCell align="center">Vote</TableCell>
              <TableCell align="center">Precent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <Row
                // key={row.id}
                level={0}
                row={row}
                table={tableData}
                handleVote={handleVote}
                updateBudget={updateBudget}
                totalBudget={totalBudget}
                maxBudget={maxBudget}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Button
          id ='voteSubmit'
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
