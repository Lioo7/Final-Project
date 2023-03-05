import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from './TableBody';
import table from './Table'

function CollapsibleTable() {
  const [tableData, setTableData] = useState(table);
  console.log('CollapsibleTable: render',)
  console.log('CollapsibleTable: ',tableData)

  const handleSubmit = () => {
    // if (totalBudget !== maxBudget) {
    //   window.alert(`Total budget must be ${maxBudget}.`);
    // } else {
    //   console.log('Total budget is 1000.');
    // }
  };
  const handleRowClick = (id) => {
    setTableData((prevTableData) =>
      prevTableData.map((row) => {
        if (row.id === id) {
          return { ...row, isOpen: !row.isOpen };
        }
        return row;
      })
    );
  };

  const handleBudgetChange = (id, newValue) => {
    console.log('handleBudgetChange')

    const updatedTableData = tableData.map((row) => {
      if (row.id === id) {
        return { ...row, budget: newValue };
      } if (row.children) {
        return { ...row, children: updateBudgetInNestedRow(row.children, id, newValue) };
      } 
        return row;
      
    });
    setTableData(updatedTableData);
  };
  
  const updateBudgetInNestedRow = (children, id, newValue) => {
    return children.map((row) => {
      if (row.id === id) {
        return { ...row, budget: newValue };
      }  if (row.children) {
        return { ...row, children: updateBudgetInNestedRow(row.children, id, newValue) };
      }
        return row;
      
    });
  };
  
  const handleVoteChange = (id, newValue) => {
    console.log('handleVoteChange')
    const updatedTableData = tableData.map((row) => {
      if (row.id === id) {
        return { ...row, vote: newValue };
      }  if (row.children) {
        return { ...row, children: updateVoteInNestedRow(row.children, id, newValue) };
      } 
        return row;
      
    });
    setTableData(updatedTableData);
  };
  
  const updateVoteInNestedRow = (children, id, newValue) => {
    return children.map((row) => {
      if (row.id === id) {
        return { ...row, vote: newValue };
      }  if (row.children) {
        return { ...row, children: updateVoteInNestedRow(row.children, id, newValue) };
      } 
        return row;
      
    });
  };
  
  return (
    <Stack sx={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
      <TableContainer sx={{ maxHeight: '500px', maxWidth: '1000px', mr: '10px',}} component={Paper}>
        <Table stickyHeader aria-label="collapsible table">
        <TableHead>
            <TableRow>
              <TableCell />
              {/* sx={{ backgroundColor: '#000', color: 'white', fontWeight: 'bold', fontSize: '25px' }} */}
              <TableCell>Subject</TableCell>
              <TableCell align="left"> Budget</TableCell>
              <TableCell align="left">Vote</TableCell>
            </TableRow>
          </TableHead>
      <TableBody
        tableData={tableData}
        onRowClick={handleRowClick}
        onBudgetChange={handleBudgetChange}
        onVoteChange={handleVoteChange}
      />
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

CollapsibleTable.propTypes = {
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      subject: PropTypes.string.isRequired,
      budget: PropTypes.number.isRequired,
      vote: PropTypes.number.isRequired,
      isOpen: PropTypes.bool.isRequired,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          subject: PropTypes.string.isRequired,
          budget: PropTypes.number.isRequired,
          vote: PropTypes.number.isRequired,
        })
      ),
    })
  ).isRequired,
};

export default CollapsibleTable;
