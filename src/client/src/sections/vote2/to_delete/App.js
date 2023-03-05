import * as React from 'react';
import ParentTable from '../ParentTable';
import table from '../Table';

const App = () => {
  const [tableData, setTableData] = React.useState(table);

  return (
    <div>
      <ParentTable tableData={tableData} setTableData={setTableData} maxBudget={500} />
    </div>
  );
};

export default App;
