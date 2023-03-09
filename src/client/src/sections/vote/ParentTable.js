// import * as React from 'react';
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
import data from './Table';

export default function ParentTable() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState(data);
  

  // console.log('ParentTable: render', tableData);
  const totalBudget = tableData.reduce((total, item) => total + Number(item.budget), 0);
  const maxBudget = 100;

  const [tree, setTree] = useState({});
  const url = 'http://localhost:5000/peoples_budget/voting';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const information = await response.json();
        console.log(information);
        setTree(information);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTree(tree)
  }, [tree]);


  const handleSubmit = async () => {
    navigate('/peoples_budget/results', { replace: true });
    const url = 'http://localhost:5000/peoples_budget/voting';  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          maxBudget: { maxBudget },
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.status === 'succeed') {
        navigate('/peoples_budget/results', { replace: true });
      } else {
        throw new Error('Error!, User was not successfully registered');
      }
    } catch (error) {
      console.error(error);
      // TODO: throw message to the user
    }
};

  const handleVote = (id, value, diff) => {
    console.log('ParentTable: handleVote', id, value, diff);
    const updatedTableData = tableData.map((row) => {
      if (row.id === id) {
        return { ...row, budget: value };
      }
      const siblingBudget = parseInt(row.budget, 10) - diff / (tableData.length - 1);
      const finalBudget = siblingBudget > 0 ? siblingBudget : 0;

      return { ...row, budget: finalBudget };
    });
    setTableData(updatedTableData);
  };

  useEffect(() => {
    setTableData(tableData);
  }, [tableData]);

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
              <Row key={row.id} row={row} handleVote={handleVote} totalBudget={totalBudget} maxBudget={maxBudget} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Button
          id='voteSubmit'
          variant='outlined'
          sx={{ width: '300px', height: '60px', fontWeight: 'bold', fontSize: '25px' }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Stack>
  );
}
