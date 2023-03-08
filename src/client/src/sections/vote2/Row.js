import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';

import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';

import TextField from '@mui/material/TextField';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import ChildTable from './ChildTable'

export default function Row(props) {
  const { row, handleVote,calcBudget, totalBudget, maxBudget } = props;
  console.log('Row: render', row,totalBudget, maxBudget);
  const [open, setOpen] = useState(false);
  const { id, subject, budget, children } = row;
  // const [totalChildBudget,setTotalChildBudget] = useState(children ? children.reduce((total, item) => total + Number(item.budget), 0) : 0)


  // console.log('Row: render', id, subject, budget, children);

  const handleChange = (event) => {
    console.log('Row: handleChange', event.target.value);

    const { value } = event.target;
    if (value > maxBudget) {
      event.target.value = maxBudget;
    } else if (value < 0) {
      event.target.value = 0;
    }
    event.target.value = parseInt(event.target.value, 10)
    // const budgetPerRow = calcBudget(id, event.target.value,diff)
    const diff =  event.target.value - budget
    handleVote(id, event.target.value,diff);
    
    // if (children){
    //   children.forEach(item => {
    //     console.log("child:", item.id);
    //     const childBudget =  parseInt(item.budget,10) + diff/ children.length;
    //     handleVote(item.id, childBudget,1);

    //   });
    // }
    // handleBudget(id, parseInt(event.target.value, 10));
  };

  return (
    <React.Fragment key={row.id}>
      <TableRow >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(children && children.length > 0 ? !open : false);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {subject}
        </TableCell>
        <TableCell align="center">
          <TextField
            type="number"
            variant="outlined"
            value ={budget}
            defaultValue={budget}
            InputProps={{ inputProps: { min: 0, max: maxBudget } }}
            onChange={handleChange}
          />
        </TableCell>
        <TableCell align="right">
          {' '}
          <Slider
            value={budget}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-label="Default"
            max={100}
            sx={{ mt: 1.2 }}
          />
        </TableCell>
        <TableCell align="center">{((budget / totalBudget) * 100).toFixed(1)}%</TableCell>
      </TableRow>
      {children && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {/* <Stack sx={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}> */}
              <TableContainer sx={{ maxHeight: '400px', maxWidth: '1000px' }} component={Paper}>
                <Table stickyHeader aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      {/* sx={{ backgroundColor: '#000', color: 'white', fontWeight: 'bold', fontSize: '25px' }} */}
                      <TableCell>Subject</TableCell>
                      <TableCell align="left"> Budget</TableCell>
                      <TableCell align="left">Vote</TableCell>
                      <TableCell align="center">Precent</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {children.map((child) => (
                      <Row
                        key={child.id}
                        row={child}
                        handleVote={handleVote}
                        totalBudget={children.reduce((total, item) => total + Number(item.budget), 0)}
                        maxBudget={budget}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* </Stack>  */}
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
}

Row.propTypes = {
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
  handleVote: PropTypes.func.isRequired,
  totalBudget: PropTypes.number.isRequired,
  totalChildBudget: PropTypes.number.isRequired,
  maxBudget: PropTypes.number.isRequired,
  fromChild: PropTypes.number,
};
