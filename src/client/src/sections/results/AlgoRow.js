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
import AlgoChild from './AlgoChild';

export default function AlgoRow(props) {
  const [row] = useState(props.row);
  const [open, setOpen] = useState(false);
  const [childs] = useState(typeof row === 'number' ? null : row);
  const [budget] = useState(typeof row === 'number' ? row : row.total);

  const [rowAlgo] = useState(props.rowAlgo);
  const [childsAlgo] = useState(typeof rowAlgo === 'number' ? null : rowAlgo);
  const [newBudget] = useState(typeof rowAlgo === 'number' ? rowAlgo : rowAlgo.total);

  return (
    <>
      <TableRow key={props.key}>
        <TableCell align="center">
          <IconButton
            id={`iconTree${props.key}`}
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(childs ? !open : false);
            }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {props.name}
        </TableCell>
        <TableCell align="center">{budget}</TableCell>
        <TableCell align="center">{newBudget}</TableCell>
        <TableCell align="center">
          {Math.max(Math.min(((newBudget / 596770415) * 100).toFixed(1), 100), 0)}
          %
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>{childs && <AlgoChild childrens={childs} childrensAlgo={childsAlgo}/>}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

AlgoRow.propTypes = {
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
