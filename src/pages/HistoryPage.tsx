import React from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid2';
import { useStore } from '../store';

interface HistoryItem {
  word: string,
  result: string,
  timestamp: string
};

function createData(
  id: number,
  word: string,
  result: string,
  timestamp: string
) {
  return { id, word, result, timestamp };
}
const HistoryPage = () => {
  const { history } = useStore();
  const historyString = localStorage.getItem('history');
  const getHistoryRows = () => {
    const historyData: HistoryItem[] = history || [];

    return historyData.map((item: HistoryItem, index: number) => {
      return createData(index + 1, item.word, item.result, item.timestamp);
    });
  };
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 25 },
    {
      field: 'word',
      headerName: 'Word',
      type: 'string',
      width: 90
    },
    {
      field: 'result',
      headerName: 'Result',
      type: 'string',
      width: 80
    },
    {
      field: 'timestamp',
      headerName: 'Timestamp',
      type: 'string',
      width: 160
    }
  ];
  const paginationModel = { page: 0, pageSize: 5 };

  if (!historyString) return (
    <h3>No data</h3>
  );

  return (
    <div>
      <h2>History</h2>
      <Grid container spacing={2}>
        <Grid size={{xs: 12, md: 6}}>
          <Paper sx={{height: 'auto', width: '100%'}}>
            <DataGrid
              rows={getHistoryRows()}
              columns={columns}
              initialState={{pagination: {paginationModel}}}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{border: 0}}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default HistoryPage;
