import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Create context object
export const TableContext = createContext();

export const TableProvider = ({ children }) => {
  const [tableData, setTableData] = useState([]);

  // Define function to update budget for a row by id
  const updateBudgetById = (id, budget) => {
    setTableData((prevTableData) => {
      // Find the row with the given id
      const updatedTableData = prevTableData.map((row) => {
        if (row.id === id) {
          // Update the budget for the row
          return { ...row, budget };
        }
        return row;
      });
      return updatedTableData;
    });
  };

  // Define context value
  const value = {
    tableData,
    setTableData,
    updateBudgetById,
  };

  // Return the provider with the value set
  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
};

// Define propTypes
TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
