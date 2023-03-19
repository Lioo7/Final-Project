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

export default function Childs1(props) {
  const [tableChilds, setTableChilds] = useState(props.childrens);
  // Calculate the sum of the budget of the children
  const totalChildBudget = tableChilds.reduce((total, item) => total + Number(item.budget), 0);
  // const [table, setTable] = useState(props.table);

  useEffect(() => {
    setTableChilds(props.childrens);
  }, [props.childrens]);

  console.log('Childs1: ', tableChilds);

  const handleVote = (id, value, diff) => {
    // Update siblings budget
    let updatedTableData = props.updateBudget(tableChilds, id, value, diff, props.maxBudget, 0);
    // Update childs budget
    updatedTableData = updatedTableData.map((row) => {
      if (!row.children) {
        return { ...row };
      }
      const totalChildBudget = row.children.reduce((total, item) => total + Number(item.budget), 0);
      const budgetDiff = row.budget - totalChildBudget;
      const childrens = props.updateBudget(row.children, id, value, budgetDiff, row.budget, 1);
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
        const childrens = props.updateBudget(child2.children, id, value, budgetDiff, child2.budget, 1);
        return { ...child2, children: childrens };
      });
      return { ...row, children: children2 };
    });

    setTableChilds(updatedTableData);
  };

  // const handleVote = (id, value, diff) => {
  //   // Update siblings budget
  //   let updatedTableData = props.updateBudget (tableChilds, id,value,diff, props.maxBudget,0);
  //   // Update childs budget
  //   updatedTableData = updatedTableData.map((row) => {
  //     if (!row.children) {
  //       return { ...row };
  //     }
  //     const totalChildBudget = row.children.reduce((total, item) => total + Number(item.budget), 0);
  //     const budgetDiff = row.budget - totalChildBudget;
  //     const childrens =  props.updateBudget (row.children, id,value,budgetDiff, row.budget,1);
  //     return { ...row, children: childrens };
  //   });
  //   console.log("Child1:handleVote ", updatedTableData)

  //   setTableChilds(updatedTableData);
  // };

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
            {tableChilds.map((child1) => (
              <Row
                level={0}
                row={child1}
                handleVote={handleVote}
                updateBudget={props.updateBudget}
                totalBudget={totalChildBudget}
                maxBudget={props.maxBudget}
                table={props.table}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

Childs1.propTypes = {
  tableChilds: PropTypes.shape({
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
