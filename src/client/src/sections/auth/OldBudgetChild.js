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
import OldBudgetRow from './OldBudgetRow';

export default function OldBudgetChild(props) {
  const [tableChilds] = useState(props.childrens);
  const totalBudget = tableChilds.reduce((total, item) => total + Number(item.allocated_budget_amount), 0);


  return (
    <Stack sx={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
      <TableContainer sx={{ maxHeight: '400px', maxWidth: '1000px' }} component={Paper}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="center" />
              <TableCell align="center">Subject</TableCell>
              <TableCell align="center">Old Budget</TableCell>
              <TableCell align="center">Precent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableChilds.map((childs) => (
              <OldBudgetRow
                key={childs.id}
                row={childs}
                parent={tableChilds}
                totalBudget={totalBudget}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

OldBudgetChild.propTypes = {
    childrens: PropTypes.arrayOf(PropTypes.object).isRequired,
};

