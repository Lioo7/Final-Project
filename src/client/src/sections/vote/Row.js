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
import Checkbox from '@mui/material/Checkbox';
import { debounce } from 'lodash';
import Childs from './Childs';

export default function Row(props) {
  const [row, setRow] = useState(props.row);
  const [open, setOpen] = useState(false);
  const [budget, setBudget] = useState(Number(row.allocated_budget_amount));
  const [childs, setChilds] = useState(row.children);
  const [checkBox, setCheckBox] = useState(row.checked);
  // console.log('Row:', row)

  useEffect(() => {
    setRow(props.row);
    setChilds(props.row.children);
    // console.log('Row:', row)
  }, [props.row]);

  useEffect(() => {
    setCheckBox(row.checked);
    // console.log('checkbox:', row.id, checkBox);
  }, [row.checked]);

  const handleChangeSlider = debounce((event) => {
    const { value } = event.target;
    if (value > props.maxBudget) {
      event.target.value = props.maxBudget;
    } else if (value < 0) {
      event.target.value = 0;
    }
    if (!checkBox) {
      event.target.value = parseInt(event.target.value, 10);
      const diff = row.allocated_budget_amount - event.target.value;
      props.handleVote(props.parent, row.id, event.target.value, diff);
      setBudget(event.target.value);
    }
  }, 250);

  const handleChangeText = (event) => {
    const { value } = event.target;
    if (value > props.maxBudget) {
      event.target.value = props.maxBudget;
    } else if (value < 0) {
      event.target.value = 0;
    }

    event.target.value = parseInt(event.target.value, 10);
    // If delete the value without setting a new one
    if (!event.target.value) {
      event.target.value = 0;
    }
    if (!checkBox) {
      const diff = row.allocated_budget_amount - event.target.value;
      props.handleVote(props.parent, row.id, event.target.value, diff);
      setBudget(event.target.value);
    }
  };

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
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          <Checkbox
            id={`checkbox${row.id}`}
            size="small"
            checked={row.checked}
            onClick={() => props.handleCheckBox(props.parent, row.id, !checkBox)}
            // onChange={() => {
            //   setOpen(!checkBox ? open : false);
            // }}
          />
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">
          <TextField
            id={`budgetText${row.id}`}
            type="number"
            variant="outlined"
            value={Math.round(Number(row.allocated_budget_amount) * 10) / 10}
            defaultValue={Number(budget)}
            InputProps={{ inputProps: { min: 0, max: 1000000000 } }}
            onChange={handleChangeText}
          />
        </TableCell>
        <TableCell align="center">
          {/* {' '} */}
          <Slider
            id={`slider${row.id}`}
            value={Math.round(Number(row.allocated_budget_amount) * 10) / 10}
            onChange={handleChangeSlider}
            // step={10000}
            // marks
            valueLabelDisplay="auto"
            // getAriaValueText={abbreviate(Number(row.allocated_budget_amount))}
            aria-label="Default"
            max={props.maxBudget}
            sx={{ mt: 1.2 }}
          /> 
         </TableCell> 
        <TableCell align="center">
          {props.totalBudget === 0
            ? 0
            : Math.max(Math.min(((row.allocated_budget_amount / props.totalBudget) * 100).toFixed(1), 100), 0)}
          %
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {childs.length >0 && (
                <Childs
                  childrens={childs}
                  parent={row.children}
                  maxBudget={Number(row.allocated_budget_amount)}
                  updateBudget={Number(props.updateBudget)}
                  handleCheckBox={props.handleCheckBox}
                  handleVote={props.handleVote}
                />
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    allocated_budget_amount: PropTypes.number.isRequired,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        allocated_budget_amount: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  // key: PropTypes.number.isRequired,
  handleVote: PropTypes.func.isRequired,
  handleCheckBox: PropTypes.func.isRequired,
  updateBudget: PropTypes.func.isRequired,
  maxBudget: PropTypes.number.isRequired,
  totalBudget: PropTypes.number.isRequired,
  parent: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      allocated_budget_amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};
