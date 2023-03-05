import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Row from './TableRow';

function TableBody(props) {
  const { tableData, onRowClick, onBudgetChange, onVoteChange } = props;
  console.log('TableBody: render', tableData);
  return (
    <tbody>
      {tableData.map((row) => (
        <React.Fragment key={row.id}>
          <Row row={row} onRowClick={onRowClick} onBudgetChange={onBudgetChange} onVoteChange={onVoteChange} />
          {row.isOpen && row.children && (
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={row.isOpen} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Stack sx={{ display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
                    <TableContainer sx={{ maxHeight: '500px', maxWidth: '1000px', mr: '10px' }} component={Paper}>
                      <Table stickyHeader aria-label="collapsible table">
                        <TableHead>
                          <TableRow>
                            <TableCell />
                            {/* sx={{ backgroundColor: '#000', color: 'white', fontWeight: 'bold', fontSize: '25px' }} */}
                            <TableCell>Subject</TableCell>
                            <TableCell align="left"> Budget</TableCell>
                            <TableCell align="left">Vote</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody
                          tableData={row.children}
                          onRowClick={onRowClick}
                          onBudgetChange={onBudgetChange}
                          onVoteChange={onVoteChange}
                        />
                      </Table>
                    </TableContainer>
                  </Stack>
                </Box>
              </Collapse>
            </TableCell>
          )}
        </React.Fragment>
      ))}
    </tbody>
  );
}
TableBody.propTypes = {
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      subject: PropTypes.string.isRequired,
      budget: PropTypes.number.isRequired,
      vote: PropTypes.number.isRequired,
      isOpen: PropTypes.bool.isRequired,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          subject: PropTypes.string.isRequired,
          budget: PropTypes.number.isRequired,
          vote: PropTypes.number.isRequired,
          isOpen: PropTypes.bool.isRequired,
        })
      ),
    })
  ),
  onRowClick: PropTypes.func.isRequired,
  onBudgetChange: PropTypes.func.isRequired,
  onVoteChange: PropTypes.func.isRequired,
};
export default TableBody;
