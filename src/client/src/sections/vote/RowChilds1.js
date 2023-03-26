import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Slider from '@mui/material/Slider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TextField from '@mui/material/TextField';
import Childs2 from './Childs2';

export default function RowChilds1(props) {
  // const { row } = props;
  const [row, setRow] = useState(props.row);
  const [open, setOpen] = useState(false);
  const [budget, setBudget] = useState(row.budget);
  const [childs, setChilds] = useState(row.children);
  const [table, setTable] = useState(props.table);
  const [totalBudget, setTotalBudget] = useState(props.totalBudget);


  useEffect(() => {
    setRow(props.row);
    setTable(props.table);
  }, [props.row]);

  const handleChange = (_event, value) => {
    const diff = value - budget;
    setTotalBudget(totalBudget-diff)

    if (totalBudget !== props.maxBudget && !open) {
      // update the table (budget column)
      props.handleVote(row.id, value, diff);
      // update the slider
      setBudget(value);
    }
  };


  return (
    <>
      <TableRow key={row.id}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(childs && childs.length > 0 ? !open : false);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.subject}
        </TableCell>
        <TableCell align="center">
          <TextField
            id="budgetText"
            type="number"
            variant="outlined"
            value={row.budget}
            defaultValue={budget}
            InputProps={{ inputProps: { min: 0, max: 100 } }}
            onChange={handleChange}
          />
        </TableCell>
        <TableCell align="right">
          {' '}
          <Slider
            value={Math.round(row.budget)}
            onChange={handleChange}
            // defaultValue={row.budget}
            valueLabelDisplay="auto"
            aria-label="Default"
            max={props.maxBudget}
            sx={{ mt: 1.2 }}
          />
        </TableCell>
        <TableCell align="center">
          {Math.max(Math.min(((row.budget / props.totalBudget) * 100).toFixed(1), 100), 0)}%
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {childs && (
                <Childs2
                  childrens={childs}
                  parent={row}
                  maxBudget={Number(row.budget)}
                  handleChange={handleChange}
                  handleVote={props.handleVote}
                //   sibilingLength={childs.length}
                />
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

RowChilds1.propTypes = {
  row: PropTypes.shape({
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
  key: PropTypes.number.isRequired,
  handleVote: PropTypes.func.isRequired,
};
