import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import OldBudgetChild from './OldBudgetChild';

export default function OldBudgetRow(props) {
  const [row] = useState(props.row);
  const [open, setOpen] = useState(false);
  const [childs] = useState(row.children);

  return (
    <>
      <TableRow key={row.id} sx={{ backgroundColor: row.checked ? '#F4F6F8' : 'white' }}>
        <TableCell align="center">
          <IconButton
            id={`iconTree${row.id}`}
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(childs && childs.length > 0 ? !open : false);
            }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.budget}</TableCell>
        <TableCell align="center">
          {props.totalBudget === 0
            ? 0
            : Math.max(Math.min(((row.budget / props.totalBudget) * 100).toFixed(1), 100), 0)}
          %
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>{childs && <OldBudgetChild childrens={childs} parent={row.children} />}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

OldBudgetRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        budget: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  totalBudget: PropTypes.number.isRequired,
};
