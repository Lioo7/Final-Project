import * as React from 'react';
import { useState } from 'react';
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
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow key={props.key}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(row.children && row.children.length > 0 ? !open : false)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.subject}
        </TableCell>
        <TableCell align="center">{row.budget}</TableCell>
        <TableCell align="right">
          {' '}
          <Slider
            onChange={(e) => props.handleVote(row.id, e.target.value)}
            defaultValue={row.budget}
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
              <ChildTable tableData={row.children}/>
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
