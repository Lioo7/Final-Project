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
import Childs1 from './Childs1';

export default function Row(props) {
  // const { row } = props;
  const [row, setRow] = useState(props.row);
  const [open, setOpen] = useState(false);
  const [budget, setBudget] = useState(row.budget);
  const [childs, setChilds] = useState(row.children);
  const [table, setTable] = useState(props.table);
  const [checkBox, setCheckBox] = useState(row.checked);

  let childComponent = null;

  useEffect(() => {
    setRow(props.row);
    // setTable(props.table);
    setChilds(props.row.children);
    // console.log('Row:', row)

  }, [props.row]);

  useEffect(() => {
    setCheckBox(row.checked)
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
      const diff = row.budget - event.target.value;
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
      const diff = row.budget - event.target.value;
      props.handleVote(props.parent, row.id, event.target.value, diff);
      setBudget(event.target.value);
    }
  };

  switch (props.level) {
    case 0:
      childComponent = (
        <Childs1
          childrens={childs}
          parent={row.children}
          maxBudget={Number(row.budget)}
          table={props.table}
          updateBudget={props.updateBudget}
          handleCheckBox={props.handleCheckBox}
          handleVote={props.handleVote}

        />
      );
      break;
    case 1:
      childComponent = (
        <Childs1
          childrens={childs}
          parent={row.children}
          maxBudget={Number(row.budget)}
          table={props.table}
          updateBudget={props.updateBudget}
          handleCheckBox={props.handleCheckBox}
          handleVote={props.handleVote}

        />
      );
      break;
    case 2:
      childComponent = (
        <Childs1
          childrens={childs}
          parent={row}
          maxBudget={Number(row.budget)}
          table={props.table}
          updateBudget={props.updateBudget}
          handleCheckBox={props.handleCheckBox}


        />
      );
      break;
    case 3:
      childComponent = (
        <Childs1
          childrens={childs}
          parent={row}
          maxBudget={Number(row.budget)}
          table={props.table}
          updateBudget={props.updateBudget}
          handleCheckBox={props.handleCheckBox}
        />
      );
      break;
    case 4:
      childComponent = (
        <Childs1
          childrens={childs}
          parent={row}
          maxBudget={Number(row.budget)}
          table={props.table}
          updateBudget={props.updateBudget}
          handleCheckBox={props.handleCheckBox}
          updateData={props.updateData}
        />
      );
      break;
    default:
      childComponent = null;
  }
  return (
    <>
      <TableRow key={row.id}>
        <TableCell align="center">
          <IconButton
            id={`iconTree${row.id}`}
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(childs && childs.length > 0 ? !open : false);

              // setOpen(childs && checkBox && childs.length > 0 ? !open : false);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell >
        {props.level === 0 ? <TableCell align="center" component="th" scope="row">
          <Checkbox
            id={`checkbox${row.id}`}
            size="small"
            checked={row.checked}
            onClick={() => props.handleCheckBox(props.parent, row.id, !checkBox)
            }
            // onChange={() => {
            //   setOpen(!checkBox ? open : false);
            // }}
          />
        </TableCell> : null}
        <TableCell align="center" component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">
          <TextField
            id={`budgetText${row.id}`}
            type="number"
            variant="outlined"
            value={Math.round(Number(row.budget) * 10) / 10}
            // value={Number(row.budget).toFixed(1)}
            defaultValue={Number(budget)}
            InputProps={{ inputProps: { min: 0, max: 100 } }}
            onChange={handleChangeText}
          />
        </TableCell>
        <TableCell align="center">
          {' '}
          <Slider
            id={`slider${row.id}`}
            // value={Number(row.budget).toFixed(1)}
            value={Math.round(Number(row.budget) * 10) / 10}
            onChange={handleChangeSlider}
            step={10}
            marks
            // defaultValue={row.budget}
            valueLabelDisplay="auto"
            aria-label="Default"
            max={props.maxBudget}
            sx={{ mt: 1.2 }}
          />
        </TableCell>
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
            <Box sx={{ margin: 1 }}>
              {
                childs && childComponent

                // <Childs1
                //   childrens={childs}
                //   parent={row}
                //   maxBudget={Number(row.budget)}
                //   // handleChange={handleChange}
                //   // sibilingLength={childs.length}
                //   // handleVote={props.handleVote}
                //   // totalBudget={totalBudget}
                //   table={props.table}
                // />
              }
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
    budget: PropTypes.number.isRequired,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        budget: PropTypes.number.isRequired,
      })
    ),
  }),
  key: PropTypes.number.isRequired,
  handleVote: PropTypes.func.isRequired,
};
