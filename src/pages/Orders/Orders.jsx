import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Orders.css';
import Table from '../../components/Table/Table';
import Button from '../../components/Button/Button';
import { FiPlus, FiDownload, FiMoreVertical } from 'react-icons/fi';
import FilterDropdown from '../../components/FilterDropdown/FilterDropdown';
import * as XLSX from 'xlsx';
import CreateOrderModal from '../../components/CreateOrderModal/CreateOrderModal';
import OrderJourneyModal from '../../components/OrderJourneyModal/OrderJourneyModal';
import EditOrderModal from '../../components/EditOrderModal/EditOrderModal';

const Orders = () => {
  

  const [activeTab, setActiveTab] = useState('all');
  const [exporting, setExporting] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isJourneyModalOpen, setIsJourneyModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [orders, setOrders] = useState()
    const orderData =[
    { id: 2, orderId: 'ORD-002', customerName: 'Jane Smith', orderDate: '2024-03-14', status: 'Processing', totalAmount: '$2,300.00' },
    { id: 3, orderId: 'ORD-003', customerName: 'Bob Johnson', orderDate: '2024-03-13', status: 'Completed', totalAmount: '$800.00' },
    { id: 4, orderId: 'ORD-004', customerName: 'Alice Brown', orderDate: '2024-03-12', status: 'Shipped', totalAmount: '$1,200.00' },
    { id: 5, orderId: 'ORD-005', customerName: 'Charlie Wilson', orderDate: '2024-03-11', status: 'Cancelled', totalAmount: '$500.00' },
    { id: 6, orderId: 'ORD-006', customerName: 'Emma Davis', orderDate: '2024-03-10', status: 'Pending', totalAmount: '$1,750.00' },
    { id: 7, orderId: 'ORD-007', customerName: 'Michael Clark', orderDate: '2024-03-09', status: 'Processing', totalAmount: '$950.00' },
    { id: 8, orderId: 'ORD-008', customerName: 'Sarah Wilson', orderDate: '2024-03-08', status: 'Completed', totalAmount: '$2,100.00' },
    { id: 9, orderId: 'ORD-009', customerName: 'David Lee', orderDate: '2024-03-07', status: 'Shipped', totalAmount: '$1,600.00' },
    { id: 10, orderId: 'ORD-010', customerName: 'Lisa Anderson', orderDate: '2024-03-06', status: 'Pending', totalAmount: '$890.00' },
    { id: 11, orderId: 'ORD-011', customerName: 'James Taylor', orderDate: '2024-03-05', status: 'Processing', totalAmount: '$1,450.00' },
    { id: 12, orderId: 'ORD-012', customerName: 'Emily White', orderDate: '2024-03-04', status: 'Cancelled', totalAmount: '$700.00' },
    { id: 13, orderId: 'ORD-013', customerName: 'Daniel Brown', orderDate: '2024-03-03', status: 'Completed', totalAmount: '$2,500.00' },
    { id: 14, orderId: 'ORD-014', customerName: 'Sophia Martinez', orderDate: '2024-03-02', status: 'Shipped', totalAmount: '$1,900.00' },
    { id: 15, orderId: 'ORD-015', customerName: 'William Johnson', orderDate: '2024-03-01', status: 'Pending', totalAmount: '$1,150.00' },
    { id: 16, orderId: 'ORD-016', customerName: 'Olivia Garcia', orderDate: '2024-02-29', status: 'Processing', totalAmount: '$2,800.00' },
    { id: 17, orderId: 'ORD-017', customerName: 'Henry Wilson', orderDate: '2024-02-28', status: 'Completed', totalAmount: '$950.00' },
    { id: 18, orderId: 'ORD-018', customerName: 'Isabella Moore', orderDate: '2024-02-27', status: 'Cancelled', totalAmount: '$1,700.00' },
    { id: 19, orderId: 'ORD-019', customerName: 'Alexander Lee', orderDate: '2024-02-26', status: 'Shipped', totalAmount: '$2,200.00' },
    { id: 20, orderId: 'ORD-020', customerName: 'Ava Thompson', orderDate: '2024-02-25', status: 'Pending', totalAmount: '$1,300.00' },
    { id: 21, orderId: 'ORD-021', customerName: 'Lucas Martin', orderDate: '2024-02-24', status: 'Processing', totalAmount: '$1,850.00' },
    { id: 22, orderId: 'ORD-022', customerName: 'Mia Anderson', orderDate: '2024-02-23', status: 'Completed', totalAmount: '$2,400.00' },
    { id: 23, orderId: 'ORD-023', customerName: 'Ethan Davis', orderDate: '2024-02-22', status: 'Shipped', totalAmount: '$1,100.00' },
    { id: 24, orderId: 'ORD-024', customerName: 'Charlotte Wilson', orderDate: '2024-02-21', status: 'Cancelled', totalAmount: '$900.00' },
    { id: 25, orderId: 'ORD-025', customerName: 'Mason Brown', orderDate: '2024-02-20', status: 'Pending', totalAmount: '$2,700.00' },
    { id: 26, orderId: 'ORD-026', customerName: 'Amelia Taylor', orderDate: '2024-02-19', status: 'Processing', totalAmount: '$1,550.00' },
    { id: 27, orderId: 'ORD-027', customerName: 'Sebastian Clark', orderDate: '2024-02-18', status: 'Completed', totalAmount: '$2,000.00' },
    { id: 28, orderId: 'ORD-028', customerName: 'Harper White', orderDate: '2024-02-17', status: 'Shipped', totalAmount: '$1,400.00' },
    { id: 29, orderId: 'ORD-029', customerName: 'Jack Thompson', orderDate: '2024-02-16', status: 'Pending', totalAmount: '$2,900.00' },
    { id: 30, orderId: 'ORD-030', customerName: 'Victoria Moore', orderDate: '2024-02-15', status: 'Processing', totalAmount: '$1,650.00' }
  ];
  const closeAllModals = () => {
    setIsCreateModalOpen(false);
    setIsJourneyModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedOrder(null);
    setOpenMenuId(null);
  };
  const handleCreateClick = () => {
    closeAllModals();
    setIsCreateModalOpen(true);
  };

  const handleJourneyClick = (row) => {
    closeAllModals();
    setSelectedOrder(row);
    setIsJourneyModalOpen(true);
  };

  const handleEditClick = (row) => {
    closeAllModals();
    setSelectedOrder(row);
    setIsEditModalOpen(true);
  };
  // Define orderColumns
    // Update the actions render function
    const orderColumns = [
        { key: 'orderId', header: 'Order ID', sortable: true },
        { key: 'customerName', header: 'Customer Name', sortable: true },
        { 
          key: 'status', 
          header: 'Status',
          sortable: true,
          render: (row) => (
            <span className={`status-badge status-${row.status.toLowerCase().replace(' ', '-')}`}>
              {row.status}
            </span>
          )
        },
        { key: 'orderDate', header: 'Order Date', sortable: true },
        { key: 'totalAmount', header: 'Total Amount', sortable: true },
        {
            key: 'actions',
            header: '',
            render: (row) => (
              <div style={{ position: 'relative' }}>
                <button
                  className="sku-actions-btn"
                  onClick={e => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === row.id ? null : row.id);
                  }}
                >
                  <FiMoreVertical />
                </button>
                {openMenuId === row.id && (
                  <div className="sku-actions-dropdown">
                    <button onClick={() => window.location.href = `/order/${row.orderId}`}>View</button>
                    <button onClick={() => {
                      setSelectedOrder(row);
                      setIsJourneyModalOpen(true);
                      setOpenMenuId(null);
                    }}>Track Journey</button>
                    <button onClick={() => {
                      setSelectedOrder(row);
                      setIsEditModalOpen(true);
                      setOpenMenuId(null);
                    }}>Edit</button>
                    <button onClick={() => alert(`Delete ${row.orderId}`)}>Delete</button>
                  </div>
                )}
              </div>
            )
          }
        ];
    

  const [visibleColumns, setVisibleColumns] = useState(orderColumns.map(col => col.key));
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  
  // Filter data based on active tab
  const filteredOrders = orderData.filter(item => {
    // Tab filter
    if (activeTab === 'pending' && item.status !== 'Pending') return false;
    if (activeTab === 'completed' && item.status !== 'Completed') return false;
    // Status filter
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    // Search filter
    if (search && !item.customerName.toLowerCase().includes(search.toLowerCase()) && !item.orderId.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleRowClick = (row) => {
    setSelectedOrder(row);
    setIsJourneyModalOpen(true);
  };
  
  const handleExport = () => {
    // Get the visible columns (excluding actions)
    const exportColumns = orderColumns.filter(col => 
      visibleColumns.includes(col.key) && col.key !== 'actions'
    );

    // Create worksheet data
    const wsData = [
      // Header row
      exportColumns.map(col => col.header),
      // Data rows
      ...filteredOrders.map(order => 
        exportColumns.map(col => {
          if (col.key === 'status') {
            return order[col.key];
          }
          return order[col.key];
        })
      )
    ];

    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `orders_export_${timestamp}.xlsx`;

    // Save file
    XLSX.writeFile(wb, filename);
  };

  const handleCreateOrder = (orderData) => {
    // Here you would typically make an API call to create the order
    console.log('Creating order:', orderData);
    const newOrder = {
      id: orders.length + 1, // Changed from orderData to orders
      orderId: `ORD-${String(orders.length + 1).padStart(3, '0')}`, // Changed from orderData to orders
      customerName: orderData.customerName,
      orderDate: new Date().toISOString().split('T')[0],
      status: orderData.status,
      totalAmount: `$${orderData.products.reduce((sum, product) => 
        sum + (parseFloat(product.price) * parseInt(product.quantity)), 0).toFixed(2)}`
    };
    setOrders([newOrder, ...orders]);
  };

  const handleEditOrder = (updatedOrder) => {
    const updatedOrders = orderData.map(order => 
      order.id === updatedOrder.id ? updatedOrder : order
    );
    setOrders(updatedOrders);
  };


  return (
    <div className="orders-page-container">
      <div className="page-header">
        <div className="header-title-section">
          <h1>Orders</h1>
        </div>
        <div className="header-actions">
          <FilterDropdown
            columns={orderColumns}
            visibleColumns={visibleColumns}
            onChange={setVisibleColumns}
          />
         <Button 
  variant="secondary" 
  className="action-button"
  onClick={handleExport}
  disabled={exporting}
>
  <FiDownload /> {exporting ? 'Exporting...' : 'Export'}
</Button>
          <Button 
            variant="primary" 
            className="add-order-button"
            onClick={handleCreateClick}
          >
            <FiPlus /> New Order
          </Button>
        </div>
      </div>

      <div className="sku-stats-cards">
        <div className="stat-card">
          <div className="stat-value">{orderData.length}</div>
          <div className="stat-label">Total Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{orderData.filter(item => item.status === 'Pending').length}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{orderData.filter(item => item.status === 'Processing').length}</div>
          <div className="stat-label">Processing</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{orderData.filter(item => item.status === 'Completed').length}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>
      
      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Orders
          </button>
          <button
            className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending ({orderData.filter(item => item.status === 'Pending').length})
          </button>
          <button
            className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      <Table
        data={filteredOrders}
        columns={orderColumns.filter(col => visibleColumns.includes(col.key) || col.key === 'actions')}
        searchPlaceholder="Search Orders..."
        onRowClick={handleRowClick}
        itemsPerPage={5}
      />

      <CreateOrderModal
        isOpen={isCreateModalOpen}
        onClose={closeAllModals}
        onSubmit={handleCreateOrder}
      />
       <OrderJourneyModal
        isOpen={isJourneyModalOpen}
        onClose={closeAllModals}
        order={selectedOrder}
      />
      
      <EditOrderModal
        isOpen={isEditModalOpen}
        onClose={closeAllModals}
        order={selectedOrder}
        onSubmit={handleEditOrder}
      />
    </div>
  );
};

export default Orders;
