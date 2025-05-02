// ... existing code ...
const DashboardCheckout = () => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [expandAll, setExpandAll] = useState(false);

  const handleExpandAllCheckbox = (e) => {
    const checked = e.target.checked;
    setExpandAll(checked);
    setExpandedRows(checked ? mockData.map(row => row.id) : []);
  };

  // ... existing code ...

  return (
    <div className="dashboard-container">
      <h2>Checkout Table</h2>
      <div style={{ marginBottom: 16 }}>
        <label style={{ marginRight: 16 }}>
          <input
            type="checkbox"
            checked={expandAll}
            onChange={handleExpandAllCheckbox}
            style={{ marginRight: 6 }}
          />
          Expand All
        </label>
        {/* ...other buttons if needed... */}
      </div>
      {/* ...existing table code... */}
    </div>
  );
};
// ... existing code ...