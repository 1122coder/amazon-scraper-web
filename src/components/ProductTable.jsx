import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import useMediaQuery from '@mui/material/useMediaQuery';

const ProductTable = ({ products, loading }) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: (params) => (
        <img src={params.value} alt={params.row.title} style={{ width: 50, height: 50, objectFit: 'cover' }} />
      ),
    },
    { field: 'title', headerName: 'Title', width: 300, flex: 1 },
    { 
      field: 'price', 
      headerName: 'Price', 
      width: 100, 
      valueFormatter: ({ value }) => `$${value.toFixed(2)}`,
      flex: 0.5,
    },
    { field: 'total_reviews', headerName: 'Reviews', width: 150, flex: 0.5 },
    { field: 'monthly_sales', headerName: 'Sales', width: 150, flex: 0.5 },
    { field: 'scraped_at', headerName: 'Scraped At', width: 200, flex: 1 },
  ];

  const mobileColumns = columns.filter(col => ['image', 'title', 'price'].includes(col.field));

  const rows = products.map((product, index) => ({
    id: index,
    image: product.image_url,
    ...product,
  }));

  if (loading) {
    return (
      <Box sx={{ height: 600, width: '100%' }}>
        <Skeleton variant="rectangular" height={400} />
      </Box>
    );
  }

  return (
    <Box sx={{ height: 550, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={isMobile ? mobileColumns : columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        sx={{
          '& .MuiDataGrid-cell': {
            wordBreak: 'break-word',
          },
        }}
      />
    </Box>
  );
};

export default ProductTable;