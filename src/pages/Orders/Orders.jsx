import React from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  IconButton,
  useMediaQuery 
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Delete } from '@mui/icons-material';

const Orders = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  
  // Mock order data
  const orders = [
    { id: 1, orderId: 'ORD-001', customerName: 'John Doe', status: 'Pending', total: 150.00 },
    { id: 2, orderId: 'ORD-002', customerName: 'Jane Smith', status: 'Shipped', total: 225.50 },
    { id: 3, orderId: 'ORD-003', customerName: 'Bob Wilson', status: 'Delivered', total: 99.99 },
  ];

  // Table columns
  const columns = [
    { field: 'orderId', headerName: 'Order ID', flex: 1 },
    { field: 'customerName', headerName: 'Customer', flex: 1.5 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'total', headerName: 'Total ($)', flex: 1, type: 'number' },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      renderCell: () => (
        <>
          <IconButton size="small">
            <Edit fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <Delete fontSize="small" />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ 
      p: isMobile ? 1 : 3,
      height: 'calc(100vh - 64px)',
      overflow: 'auto'
    }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Order Management
      </Typography>
      
      <Paper sx={{ 
        height: '70vh',
        '& .MuiDataGrid-root': {
          border: 'none'
        }
      }}>
        <DataGrid
          rows={orders}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight={false}
          density={isMobile ? 'compact' : 'standard'}
          disableSelectionOnClick
        />
      </Paper>
    </Box>
  );
};

export default Orders;