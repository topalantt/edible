import React from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid2';
import { useStore } from '../store';

function createData(
  id: number,
  name: string
) {
  return { id, name };
}

const ProductListPage = () => {
  const { edibleList, inedibleList } = useStore();
  const edibleListRows = edibleList.map((item, index) => {
    return createData(index + 1, item);
  });
  const inedibleListRows = inedibleList.map((item, index) => {
    return createData(index + 1, item);
  });
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'name',
      headerName: 'Name',
      type: 'string',
      width: 90
    }
  ];
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Grid container spacing={2}>
      <Grid size={{xs: 12, md: 6}}>
        <h2>Edible products</h2>
        <Paper sx={{height: 'auto', width: '100%'}}>
          <DataGrid
            rows={edibleListRows}
            columns={columns}
            initialState={{pagination: {paginationModel}}}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{border: 0}}
          />
        </Paper>
      </Grid>
      <Grid size={{xs: 12, md: 6}}>
        <h2>Inedible products</h2>
        <Paper sx={{height: 'auto', width: '100%'}}>
          <DataGrid
            rows={inedibleListRows}
            columns={columns}
            initialState={{pagination: {paginationModel}}}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{border: 0}}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProductListPage;
