import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Paper,
  Button,
  Grid,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, Outlet } from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNotifications } from "../../context/NotificationContext";


// Inside your component




const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [rows, setRows] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);
  const [success, setSuccess] = useState(false);

  const fetchInvoices = () => {
    const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    setRows(storedInvoices);
  };

  const saveInvoices = (data) => {
    localStorage.setItem("invoices", JSON.stringify(data));
    setRows(data);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleDeleteClick = (invoice) => {
    setInvoiceToDelete(invoice);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    const updatedInvoices = rows.filter((i) => i._id !== invoiceToDelete._id);
    saveInvoices(updatedInvoices);
    addNotification(`🗑 Invoice #${invoiceToDelete._id} deleted`);
    setSuccess(true);
    setDeleteDialogOpen(false);
    setInvoiceToDelete(null);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setInvoiceToDelete(null);
  };

  const handleStatusClick = (invoice) => {
    if (invoice.status === "Pending") {
      const updatedInvoice = { ...invoice, status: "Paid" };
      const updatedInvoices = rows.map((i) =>
        i._id === invoice._id ? updatedInvoice : i
      );
      saveInvoices(updatedInvoices);
      addNotification(`✅ Invoice #${invoice._id} marked as Paid`);
    }
  };

const totalInvoices = rows.length;

const totalRevenue = rows
  .reduce(
    (sum, i) => sum + (parseFloat(i.cost || 0) + parseFloat(i.agencyFee || 0)),
    0
  )
  .toFixed(2);

const pendingInvoices = rows.filter((i) => i.status === "Pending").length;


const statusColors = {
  Paid: { bg: "#209e27ff", color: "white", width: { xs: 60, sm: 70 } },
  Pending: { bg: "#e6b524ee", color: "white", width: { xs: 70, sm: 90 } },
  Overdue: { bg: "#d53403f3", color: "white", width: { xs: 70, sm: 90 } },
};

const columns = [
  { field: "_id", headerName: "ID", flex: 0.4 },
  { field: "name", headerName: "Client Name", flex: 1 },
  { field: "phone", headerName: "Phone", flex: 0.8 },
  { field: "email", headerName: "Email", flex: 1.2 },
  {
    field: "totalCost",
    headerName: "Amount",
    flex: 0.8,
    renderCell: (params) => {
      const total =
        parseFloat(params.row.cost || 0) + parseFloat(params.row.agencyFee || 0);
      return (
        <Typography fontWeight="bold" color={colors.greenAccent[500]}>
          PKR {total.toFixed(2)}
        </Typography>
      );
    },
  },
  { field: "date", headerName: "Date", flex: 0.7 },
  {
    field: "status",
    headerName: "Status",
    flex: 0.7,
    renderCell: (params) => {
      const status = params.row.status;
      const isPending = status === "Pending";

      const width = isMobile
        ? statusColors[status]?.width.xs || "fit-content"
        : statusColors[status]?.width.sm || "fit-content";

      return (
        <Box
          onClick={() => isPending && handleStatusClick(params.row)}
          sx={{
            backgroundColor: statusColors[status]?.bg || "#eee",
            color: statusColors[status]?.color || "#333",
            width: width,
            minWidth: 60,
            px: 1.5,
            py: 0.5,
            borderRadius: "8px",
            textAlign: "center",
            cursor: isPending ? "pointer" : "default",
            "&:hover": { opacity: isPending ? 0.8 : 1 },
            transition: "0.3s",
            fontWeight: 500,
            fontSize: "0.85rem",
          }}
        >
          {status}
        </Box>
      );
    },
  },
    
    {
      field: "actions",
      headerName: "Actions",
      flex: isMobile ? 1.5 : 1,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={isMobile ? 0.5 : 1}>
          <Button
            size="small"
            startIcon={<VisibilityIcon />}
            onClick={() =>
              navigate(`/admin/invoices/view/${params.row._id}`, {
                state: { invoice: params.row },
              })
            }
            sx={{
              color: "RoyalBlue",
              borderColor: "RoyalBlue",
              "&:hover": { backgroundColor: "rgba(0, 47, 255, 0.1)" },
            }}
          />

          
          <Button
            color="warning"
            size="small"
            startIcon={<EditIcon />}
            onClick={() =>
              navigate(`/admin/invoices/edit/${params.row._id}`, {
                state: { invoice: params.row },
              })
            }
          />
          <Button
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteClick(params.row)}
          />
        </Box>
      ),
    },
  ];

  return (
    <Box m={isMobile ? "10px" : "10px"}>
      <Header title="INVOICES" subtitle="Invoice Management System" />

   <Grid container spacing={2} mt={1}>
  {[
    {
      icon: (
        <ReceiptLongOutlinedIcon
          sx={{ fontSize: 30, color: colors.greenAccent[400] }}
        />
      ),
      value: totalInvoices,
      label: "Total Invoices",
    },
    {
      icon: (
        <MonetizationOnOutlinedIcon
          sx={{ fontSize: 30, color: "#00c3ffff" }}
        />
      ),
      value: `PKR ${totalRevenue}`,
      label: "Total Revenue",
    },
   {
  icon: (
    <PendingActionsOutlinedIcon
      sx={{ fontSize: 30, color: "#ef4444" }} // red for pending
    />
  ),
  value: pendingInvoices.toLocaleString(), // use the variable
  label: "Pending Invoices",
},

  ].map((card, index) => (
    <Grid item xs={12} sm={4} key={index}>
      <Paper
        elevation={5}
        sx={{
          p: isMobile ? 3.5 : 5,
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          gap: 2,
          justifyContent: "flex-start",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(145deg, #011336ff, #011336ff)"
              : "linear-gradient(145deg, #ffffff, #f3f3f3)",
          transition: "all 0.3s ease",
        }}
      >
        {card.icon}
        <Box>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            fontWeight="bold"
          >
            {card.value}
          </Typography>
          <Typography
            color={colors.grey[300]}
            fontSize={isMobile ? "0.8rem" : "1rem"}
          >
            {card.label}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  ))}
</Grid>



{/* Responsive Modern Mobile Cards */}
<Box mt={4}>
  {isMobile ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxHeight: "75vh",
        overflowY: "auto",
        pr: 1,
      }}
    >
      {rows.map((row) => (
        <Paper
          key={row._id}
          elevation={3}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            borderRadius: 3,
            backdropFilter: "blur(12px)",
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(20, 25, 50, 0.6)"
                : "rgba(255,255,255,0.9)",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 6px 20px rgba(0,0,0,0.6)"
                : "0 4px 20px rgba(0,0,0,0.1)",
            transition: "transform 0.25s, box-shadow 0.25s",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 10px 25px rgba(0,0,0,0.7)"
                  : "0 6px 25px rgba(0,0,0,0.15)",
            },
          }}
        >
          {/* Top Info */}
<Box display="flex" flexDirection="column" gap={0.5}>
  <Typography fontWeight={700} fontSize="1rem">
    {row.name}
  </Typography>
  <Typography fontSize="0.75rem" color="text.secondary">
    {row.phone || "-"} | {row.email || "-"}
  </Typography>
</Box>

{/* Status */}
<Box
  sx={{
    mt: 0.5,
    px: 2,
    py: 0.5,
    borderRadius: 2,
    backgroundColor: statusColors[row.status]?.bg || "#eee",
    color: statusColors[row.status]?.color || "#333",
    fontWeight: 600,
    fontSize: "0.8rem",
    width: "fit-content",
    textAlign: "center",
  }}
>
  {row.status}
</Box>

{/* Amount + Date */}
<Box display="flex" justifyContent="space-between" mt={1}>
  <Typography fontSize="0.85rem" color={colors.greenAccent[500]} fontWeight={600}>
    PKR {(parseFloat(row.cost || 0) + parseFloat(row.agencyFee || 0)).toFixed(2)}
  </Typography>
  <Typography fontSize="0.8rem" color="text.secondary">
    {row.date}
  </Typography>
</Box>

          {/* Actions */}
          <Box display="flex" gap={1} mt={1}>
            <IconButton
              size="small"
              onClick={() =>
                navigate(`/admin/invoices/view/${row._id}`, { state: { invoice: row } })
              }
              sx={{
                bgcolor: theme.palette.mode === "dark" ? "#0288d1aa" : "#00f5e9ff",
                "&:hover": { bgcolor: theme.palette.mode === "dark" ? "#0288d1cc" : "#bbdefb" },
                transition: "0.3s",
              }}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() =>
                navigate(`/admin/invoices/edit/${row._id}`, { state: { invoice: row } })
              }
              sx={{
                bgcolor: theme.palette.mode === "dark" ? "#ffa000aa" : "#ffc400ff",
                "&:hover": { bgcolor: theme.palette.mode === "dark" ? "#ffb300cc" : "#ffe0b2" },
                transition: "0.3s",
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => handleDeleteClick(row)}
              sx={{
                bgcolor: theme.palette.mode === "dark" ? "#d32f2faa" : "#ffebee",
                "&:hover": { bgcolor: theme.palette.mode === "dark" ? "#e53935cc" : "#ffcdd2" },
                transition: "0.3s",
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      ))}
    </Box>
  ) : (
    // Desktop Table
    <Box
      height="65vh"
      sx={{
        "& .MuiDataGrid-root": { border: "none" },
        "& .MuiDataGrid-columnHeaders": {
          fontSize: "0.9rem",
          fontWeight: 600,
          background: theme.palette.mode === "dark" ? "#273552" : "#f3f3f3",
        },
        "& .MuiDataGrid-cell": { fontSize: "0.9rem", whiteSpace: "nowrap" },
      }}
    >
      <DataGrid rows={rows} columns={columns} hideFooter getRowId={(row) => row._id} />
    </Box>
  )}
</Box>




      {/* Add Button */}
      <Box mt={10} display="flex" justifyContent="flex-end">
        <Button
          onClick={() => navigate("/admin/invoices/add")}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background: "linear-gradient(90deg, #008CFF, #0057D9)",
            fontWeight: "bold",
            px: isMobile ? 2.5 : 3,
            py: isMobile ? 0.8 : 1,
            borderRadius: "12px",
            fontSize: isMobile ? "0.75rem" : "1rem",
          }}
        >
          {isMobile ? "" : "+ New Invoice"}
        </Button>
      </Box>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteClose} maxWidth="xs">
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this invoice?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ borderRadius: "8px" }}>
          Action completed successfully!
        </Alert>
      </Snackbar>

      <Outlet />
    </Box>
  );
};

export default Invoices;
