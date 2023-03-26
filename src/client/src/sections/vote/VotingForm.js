import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Row from './Row';
import table from './Table';

export default function VotingForm() {
  const navigate = useNavigate();

  const [tableData, setTableData] = useState(table);
  const [totalBudget, _setTotalBudget] = useState(tableData.reduce((total, item) => total + Number(item.budget), 0));
  const [newMaxBudget, setNewMaxBudget] = useState(0);
  const maxBudget = 100;

  const findPathById = (idToFind, data, path = []) => {
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].id === idToFind) {
        return path;
      }
      if (data[i].children) {
        const childResult = findPathById(idToFind, data[i].children, [...path, data[i].id]);
        if (childResult) {
          return childResult;
        }
      }
    }
    return null;
  };

  const clearAll = () => {
    const tableClear = clear(tableData);
    // console.log('clear All', tableClear);
    setTableData(tableClear);
  };

  const clear = (data) => {
    return data.map((row) => {
      if (row.children) {
        return { ...row, checked: false, children: clear(row.children) };
      }
      return { ...row, checked: false };
    });
  };

  const TotalBudget = (data) => {
    const newTotalBudget = data.reduce((total, item) => {
      if (item.checked) {
        return total;
      }
      return total + Number(item.budget);
    }, 0);
    setNewMaxBudget(newTotalBudget)
    return newTotalBudget
  };

  // const childTotalBudget = (data) => {
  //   const newTotalBudget = data.reduce((total, item) => {
  //     if (item.checked) {
  //       return total;
  //     }
  //     return total + Number(item.budget);
  //   }, 0);
  //   // setNewMaxBudget(newTotalBudget)
  //   return newTotalBudget
  // };

  useEffect(() => {
    TotalBudget(tableData);
    // const item = findPathById(12, tableData);
    // console.log(item)
    // console.log('useEffect:', tableData);
  }, [tableData]);

  const handleCheckBox = (data, id, status) => {
    const updatedTable = data.map((row) => {
      if (row.id === id) {
        if (row.children) {
          return { ...row, checked: status, children: helperHandleCheck(row.children, status) };
        }
        return { ...row, checked: status };
      }
      return { ...row };
    });

    const path = findPathById(id, tableData);
    if (path.length === 0) {
      setTableData(updatedTable);
    } else {
      const allTableData = tableData.map((row) => {
        if (row.id === path[0]) {
          return recHandleParentTrue(row, path.slice(1), updatedTable);
        }
        return { ...row };
      });
      setTableData(allTableData);
    }
  };

  const recHandleParentTrue = (data, path, updateTableData) => {
    if (path.length === 0) {
      return { ...data, checked: true, children: updateTableData };
    }
    const newData = data.children.map((row) => {
      if (row.id === path[0]) {
        return recHandleParentTrue(row, path.slice(1), updateTableData);
      }
      return { ...row };
    });
    return { ...data, checked: true, children: newData };
  };

  const helperHandleCheck = (table, status) => {
    return table.map((row) => {
      if (row.children) {
        return { ...row, checked: status, children: helperHandleCheck(row.children, status) };
      }
      return { ...row, checked: status };
    });
  };

  const handleSubmit = () => {
    navigate('/peoples_budget/results', { replace: true });
  };

  const recHandle = (data, path, updateTableData) => {
    if (path.length === 0) {
      return { ...data, children: updateTableData };
    }
    const newData = data.children.map((row) => {
      if (row.id === path[0]) {
        return recHandle(row, path.slice(1), updateTableData);
      }
      return { ...row };
    });
    return { ...data, children: newData };
  };

  const handleVote = (data, id, value, diff) => {
    // Update siblings budget
    const max = TotalBudget(data)
    let updatedTableData = updateBudget(data, id, value, diff, max, 0);
    console.log('totalBudget', max)

    // Update childs1 budget
    updatedTableData = updatedTableData.map((row) => {
      if (!row.children) {
        return { ...row };
      }
      const totalChildBudget = row.children.reduce((total, item) => total + Number(item.budget), 0);
      // const totalChildBudget = childTotalBudget(row.children)
      // console.log('totalChildBudget',totalChildBudget)
      const budgetDiff = row.budget - totalChildBudget;
      const childrens = updateBudget(row.children, id, value, budgetDiff, row.budget, 1);
      return { ...row, children: childrens };
    });

    // Update childs2 budget
    updatedTableData = updatedTableData.map((row) => {
      if (!row.children) {
        return { ...row };
      }
      const children2 = row.children.map((child2) => {
        if (!child2.children) {
          return { ...child2 };
        }
        const totalChildBudget = child2.children.reduce((total, item) => total + Number(item.budget), 0);
        const budgetDiff = child2.budget - totalChildBudget;
        const childrens = updateBudget(child2.children, id, value, budgetDiff, child2.budget, 1);
        return { ...child2, children: childrens };
      });
      return { ...row, children: children2 };
    });

    const path = findPathById(id, tableData);
    if (path.length === 0) {
      setTableData(updatedTableData);
    } else {
      const allTableData = tableData.map((row) => {
        if (row.id === path[0]) {
          return recHandle(row, path.slice(1), updatedTableData);
        }
        return { ...row };
      });
      setTableData(allTableData);
    }
  };

  const updateBudget = (data, id, value, diff, currMaxBudget, isChilds) => {
    // console.log('updateBudget', id);
    let updatedTableData = data.slice(); // create a copy of tableData
    let countRows = isChilds ? data.length : data.length - 1; // count of rows to update
    // const rowsIds = data.map((row) => row.id); // array of row IDs

    const downRows = data.filter((row) => row.checked);
    countRows -= downRows.length;
    const checkedRows = data.filter((row) => !row.checked);
    const rowsIds = checkedRows.map((row) => row.id);
    // const checkedRows = rowsIds-downRows;
    let times = 1; // limit the while loop (not to stuck in inifinte loop)

    while (diff !== 0 && times < 20 && countRows > 0) {
      times += 1;
      let removedRows = 0; // count of rows that has reached to their max/0
      let remain = 0; // remaining difference to distribute among rows
      const budgetPerRow = diff / countRows;
      updatedTableData = updatedTableData.map((row) => {
        if (row.checked) {
          return { ...row };
        }
        if (isChilds === 0 && row.id === id) {
          if (value > currMaxBudget) {
            return { ...row, budget: currMaxBudget };
          }
          return { ...row, budget: value };
        }
        if (!rowsIds.includes(row.id)) {
          return { ...row };
        }
        let currBudget = parseFloat(row.budget) + budgetPerRow;
        if (currBudget > currMaxBudget) {
          remain += currBudget - currMaxBudget;
          removedRows += 1;
          const indexToRemove = rowsIds.indexOf(row.id);
          rowsIds.splice(indexToRemove, 1);
          currBudget = currMaxBudget;
        }
        if (currBudget < 0) {
          remain += currBudget;
          removedRows += 1;
          const indexToRemove = rowsIds.indexOf(row.id);
          rowsIds.splice(indexToRemove, 1);
          currBudget = 0;
        }
        return { ...row, budget: currBudget };
      });
      diff = remain;
      countRows -= removedRows;
    }
    return updatedTableData;
  };

  return (
    <Stack sx={{ display: 'flex', justifyItems: 'center', alignItems: 'center', marginRight: 2 }}>
      <TableContainer sx={{ maxHeight: '500px', maxWidth: '1000px' }} component={Paper}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow sx={{ fontWeight: 'bold' }}>
              <TableCell />
              <TableCell align="center">
                <Button onClick={clearAll} sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                  🫵🏽
                </Button>
              </TableCell>
              {/* sx={{ backgroundColor: '#000', color: 'white', fontWeight: 'bold', fontSize: '25px' }} */}

              <TableCell sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }} align="center">
                Subject
              </TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }} align="center">
                Budget
              </TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }} align="center">
                Vote
              </TableCell>
              <TableCell sx={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }} align="center">
                Precent
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <Row
                // key={row.id}
                level={0}
                parent={tableData}
                row={row}
                table={tableData}
                handleVote={handleVote}
                updateBudget={updateBudget}
                handleCheckBox={handleCheckBox}
                totalBudget={totalBudget}
                newMaxBudget={newMaxBudget}
                maxBudget={maxBudget}
                // updateData={updateData}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Button
          id="voteSubmit"
          variant="outlined"
          sx={{ width: '300px', height: '60px', fontWeight: 'bold', fontSize: '25px' }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Stack>
  );
}
