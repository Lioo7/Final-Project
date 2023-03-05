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
import ChildTable from './ChildTable';

export default function Row(props) {
  const { row } = props;
  // const [row, setRow] = useState(props.row);

  const [open, setOpen] = useState(false);
  const [budget, setBudget] = useState(row.budget);
  const [childs, setChilds] = useState(row.children);
  const [sumDiff, setSumDiff] = useState(0);
  const [siblings, setSiblings] = useState(props.parent)

  console.log('render Row', row.id)
  
  // useEffect(() => {
  //   setRow(props.row);
  //   console.log('useEffect Row')

  //   // localStorage.setItem('childTableData', JSON.stringify(tableData));
    
  // }, [props.parent]);

  const handleBudgetChange = (_event, value) => {
    const diff = value - budget;
    const totalBudget = props.totalBudget + diff;

    // if (totalBudget <= props.maxBudget && totalBudget >= 0 && !open) {
    //   console.log('totalBudget: ', totalBudget);
    //   console.log('props: ', props.totalBudget);
    //   console.log('maxBudget: ', props.maxBudget);

    //   // update the table (budget column)
    //   props.handleVote(row.id, value);
    //   // update the slider
    //   setBudget(value);
    //   setSumDiff(sumDiff+diff)
    // }
    if (totalBudget !== props.maxBudget && !open) {
      console.log('totalBudget: ', totalBudget);
      console.log('props: ', props.totalBudget);
      console.log('maxBudget: ', props.maxBudget);

      // update the table (budget column)
      props.handleVote(row.id, value,diff);
      // update the slider
      setBudget(value);
      setSumDiff(sumDiff + diff);
      // updateSiblingsBudget(diff,value);
    }
  };

  const updateBudgetChilds = () => {
    if (sumDiff !== 0 && childs.length > 0) {
      if (budget === 0) {
        setChilds((prevChild) => {
          const updatedChild = prevChild.map((child) => {
            return { ...child, budget: 0 };
          });
          setSumDiff(0);
          return updatedChild;
        });
      } else {
        setChilds((prevChild) => {
          const updatedChild = prevChild.map((child) => {
            const newAmount = Number(child.budget) + sumDiff / childs.length;
            const diffPerChild = newAmount > 0 ? newAmount : 0;
            return { ...child, budget: Math.round(Math.min(diffPerChild, budget), 2) };
          });
          setSumDiff(0);
          return updatedChild;
        });
      }
    }
  };
  const updateSiblingsBudget = (diff, value) => {
    setSiblings((prevS) => {
      const updatedSiblings = prevS.map((s) => {
        if (s.id !== row.id) {
          const newAmount = Number(s.budget) - diff / (siblings.length - 1);
          const diffPerChild = newAmount > 0 ? newAmount : 0;
          return { ...s, budget: Math.round(Math.min(diffPerChild, budget), 2) };
        } 
          return { ...s, budget: value };
        
      });
      props.handleVote(updatedSiblings.find((s) => s.id === row.id));
      return updatedSiblings;
    });
  };
  

  return (
    <>
      <TableRow key={props.key}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              console.log('SumDiff: ', sumDiff);
              updateBudgetChilds();
              setOpen(childs && childs.length > 0 ? !open : false);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.subject}
        </TableCell>
        <TableCell align="center">{budget}</TableCell>
        <TableCell align="right">
          {' '}
          <Slider
            // value={sliderValue}
            value={budget}
            onChange={handleBudgetChange}
            // onChange={(e) => props.handleVote(row.id, e.target.value)}
            // defaultValue={row.budget}
            valueLabelDisplay="auto"
            aria-label="Default"
            max={100}
            sx={{ mt: 1.2 }}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <ChildTable tableData={childs} parent={row} maxBudget={Number(budget)} />
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
