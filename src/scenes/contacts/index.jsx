import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Drawer,
  TextField,
  IconButton,
  MenuItem,
  Snackbar,
  Alert,
  Chip,
  Avatar,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const Contacts = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");

  const [contacts, setContacts] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    type: "",
    address: "",
    pinCode: "",
    dob: "",
    status: "Pending",
  });
  const [filter, setFilter] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

// Function to get random background color
const getRandomColor = () => {
  const colors = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981", "#8b5cf6", "#ec4899"];
  return colors[Math.floor(Math.random() * colors.length)];
};



  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(stored);
  }, []);

  const saveContacts = (data) => {
    localStorage.setItem("contacts", JSON.stringify(data));
    setContacts(data);
  };

  const handleAddContact = () => {
    setEditingContact(null);
    setFormData({
      name: "",
      mobile: "",
      email: "",
      type: "",
      address: "",
      pinCode: "",
      dob: "",
      status: "Pending",
    });
    setOpenDrawer(true);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setFormData(contact);
    setOpenDrawer(true);
  };

  const handleDeleteContact = (id) => {
    const updated = contacts.filter((c) => c._id !== id);
    saveContacts(updated);
    setSnackbar({ open: true, message: "Contact deleted!", severity: "success" });
  };

  const handleSave = () => {
    if (!formData.name || !formData.mobile) {
      alert("Name and Mobile are required.");
      return;
    }

    if (editingContact) {
      const updated = contacts.map((c) =>
        c._id === editingContact._id ? { ...formData, _id: editingContact._id } : c
      );
      saveContacts(updated);
      setSnackbar({ open: true, message: "Contact updated!", severity: "success" });
    } else {
      const newContact = { ...formData, _id: Date.now().toString() };
      saveContacts([...contacts, newContact]);
      setSnackbar({ open: true, message: "Contact added!", severity: "success" });
    }
    setOpenDrawer(false);
  };

  const renderStatusChip = (status) => {
    const colors = {
      Pending: "warning",
      Approved: "success",
      Rejected: "error",
    };
    return <Chip label={status} color={colors[status]} size="small" sx={{ fontWeight: 600 }} />;
  };

  const filteredContacts = contacts.filter((c) =>
    Object.values(c).join(" ").toLowerCase().includes(filter.toLowerCase())
  );

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    const valA = a[sortConfig.key] || "";
    const valB = b[sortConfig.key] || "";
    return sortConfig.direction === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  const paginated = sortedContacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const requestSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={3}>
      <Typography variant="h2" fontFamily={"sans-serif"} fontWeight={700} mb={2}>
        Contacts
      </Typography>



      {/* Search + Add Button */}
<Box
  display="flex"
  flexDirection={{ xs: "column", sm: "row" }}
  gap={2}
  alignItems={{ xs: "stretch", sm: "center" }}
  mb={3}
>
  <TextField
    placeholder="Search contacts..."
    size="medium"
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    fullWidth={isMobile}
    sx={{
      backgroundColor: theme.palette.mode === "dark" ? "#1f1f1fff" : "#f9f9f9",
      borderRadius: 10,
      "& .MuiOutlinedInput-root": {
        borderRadius: 10,
        width: '53vh',
        paddingRight: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#1f1f1f" : "#e9e9e9ff",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    }}
  />

  <Button
    variant="contained"
    onClick={handleAddContact}
    sx={{
      background: "linear-gradient(135deg,#0ea5e9,#3b82f6)",
      color: "#fff",
      fontWeight: 600,
      borderRadius: 3,
      boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
      px: 4,
      py: 1.9,
      "&:hover": {
        background: "linear-gradient(135deg,#3b82f6,#0ea5e9)",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      },
      width: { xs: "100%", sm: "auto" },
    }}
  >
    + Add Contact
  </Button>
</Box>

{/* Desktop Table */}
<TableContainer
  component={Paper}
  sx={{
    borderRadius: 3,
    display: { xs: "none", sm: "block" },
    maxHeight: 500, // <-- Set the table container height limit
    overflowY: "auto", // <-- Enable vertical scroll inside the table body if needed
  }}
>
  <Table stickyHeader>
    <TableHead>
      <TableRow>
        <TableCell>Avatar</TableCell>
        {[
          "name",
          "email",
          "mobile",
          "type",
          "address",
          "pinCode",
          "dob",
          "status",
        ].map((col) => (
          <TableCell
            key={col}
            onClick={() => requestSort(col)}
            sx={{ cursor: "pointer", fontWeight: 700 }}
          >
            {col.charAt(0).toUpperCase() + col.slice(1)}
            {sortConfig.key === col &&
              (sortConfig.direction === "asc" ? (
                <ArrowDropUpIcon fontSize="small" />
              ) : (
                <ArrowDropDownIcon fontSize="small" />
              ))}
          </TableCell>
        ))}
        <TableCell align="right" sx={{ fontWeight: 700 }}>
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {paginated.map((c) => (
        <TableRow key={c._id} hover>
          <TableCell>
            <Avatar sx={{ bgcolor: getRandomColor(), width: 45, height: 45 }}>
              {c.name[0]}
            </Avatar>
          </TableCell>
          <TableCell>{c.name}</TableCell>
          <TableCell>{c.email}</TableCell>
          <TableCell>{c.mobile}</TableCell>
          <TableCell>{c.type}</TableCell>
          <TableCell>{c.address}</TableCell>
          <TableCell>{c.pinCode}</TableCell>
          <TableCell>{c.dob}</TableCell>
          <TableCell>{renderStatusChip(c.status)}</TableCell>
          <TableCell align="right">
            <IconButton color="primary" onClick={() => handleEditContact(c)}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => handleDeleteContact(c._id)}>
              <DeleteOutlineIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}

      {!paginated.length && (
        <TableRow>
          <TableCell colSpan={10} align="center" sx={{ py: 4 }}>
            No contacts found.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>

  {/* Pagination at the bottom */}
  <Box display="flex" justifyContent="flex-end" mt={1} mb={1}>
    <TablePagination
      component="div"
      count={filteredContacts.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[5, 10, 20]}
      labelRowsPerPage="Per page"
    />
  </Box>
</TableContainer>



{/* Mobile Cards */}
<Box
  sx={{
    display: { xs: "grid", sm: "none" },
    gridTemplateColumns: "1fr",
    gap: 2,
    mt: 2,
  }}
>
  {paginated.length ? (
    paginated.map((c) => (
      <Paper
        key={c._id}
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          height: 210, // fixed height for the card
        }}
      >
        {/* Header */}
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: getRandomColor(), width: 45, height: 45 }}>
            {c.name[0]}
          </Avatar>
          <Box sx={{ overflow: "hidden" }}>
            <Typography fontWeight={700} noWrap>
              {c.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {c.email || "-"}
            </Typography>
          </Box>
        </Box>

        {/* Info - scrollable */}
        <Box
          mt={1}
          display="grid"
          gap={0.5}
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            pr: 1,
          }}
        >
          <Typography variant="body2">Mobile: {c.mobile}</Typography>
          <Typography variant="body2">Type: {c.type}</Typography>
          <Typography variant="body2">Address: {c.address}</Typography>
          <Typography variant="body2">DOB: {c.dob}</Typography>
          <Box mt={1}>{renderStatusChip(c.status)}</Box>
        </Box>

        {/* Actions */}
        <Box display="flex" justifyContent="flex-end" gap={1} mt={1}>
          <IconButton
            onClick={() => handleEditContact(c)}
            sx={{
              bgcolor: "#3b82f6",
              color: "#fff",
              "&:hover": { bgcolor: "#2563eb" },
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteContact(c._id)}
            sx={{
              bgcolor: "#ef4444",
              color: "#fff",
              "&:hover": { bgcolor: "#b91c1c" },
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      </Paper>
    ))
  ) : (
    <Typography textAlign="center">No contacts found.</Typography>
  )}
</Box>




      {/* Drawer for Add/Edit */}
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 520 },
            maxWidth: "100%",
            borderBottomLeftRadius: "16px",
            p: { xs: 4, sm: 3 },
            bgcolor: theme.palette.mode === "dark" ? "#000000ff" : "#fff",
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h3" mt={5}>{editingContact ? "Edit Contact" : "Add Contact" }</Typography>
          <IconButton onClick={() => setOpenDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box display="grid" gap={2}>
          {["name", "mobile", "email", "type", "address", "pinCode", "dob", "status"].map((field) =>
            field === "type" || field === "status" ? (
              <TextField
                key={field}
                select
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "22px",
                    background: theme.palette.mode === "dark" ? "rgba(27, 27, 27, 1)" : "rgba(250,250,250,1)",
                  },
                }}
              >
                {field === "type" && ["Lead", "Customer", "Interested", "Other"].map((t) => (
                  <MenuItem key={t} value={t}>{t}</MenuItem>
                ))}
                {field === "status" && ["Pending", "Approved", "Rejected"].map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                type={field === "dob" ? "date" : "text"}
                InputLabelProps={field === "dob" ? { shrink: true } : {}}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "22px",
                    background: theme.palette.mode === "dark" ? "rgba(27, 27, 27, 1)" : "rgba(250,250,250,1)",
                  },
                }}
              />
            )
          )}

<Box
  display="flex"
  flexDirection={{ xs: "column", sm: "row" }}
  justifyContent="flex-end"
  gap={2}
  mt={2}
>
  {/* Cancel Button */}
  <Button
    fullWidth
    variant="outlined"
    onClick={() => setOpenDrawer(false)}
    sx={{
      borderRadius: 20,
      fontWeight: 600,
      height: 50,
      color: theme.palette.mode === "dark" ? "#fff" : "#333",
      borderColor: theme.palette.mode === "dark" ? "#555" : "#ccc",
      backgroundColor: theme.palette.mode === "dark" ? "#ffae00ff" : "#f9f9f9",
      boxShadow: theme.palette.mode === "dark" 
        ? "0 1px 3px rgba(0,0,0,0.5)" 
        : "0 1px 5px rgba(0,0,0,0.1)",
      "&:hover": {
        backgroundColor: theme.palette.mode === "dark" ? "#2c2c2c" : "#eaeaea",
        borderColor: theme.palette.mode === "dark" ? "#777" : "#bbb",
      },
    }}
  >
    Cancel
  </Button>

  {/* Add / Update Button */}
  <Button
    fullWidth
    onClick={handleSave}
    variant="contained"
    sx={{
      borderRadius: 10,
      fontWeight: 600,
      height: 50,
      background: theme.palette.mode === "dark"
        ? "linear-gradient(135deg,#3b82f6,#0ea5e9)"
        : "linear-gradient(135deg,#10b981,#10b981)",
      color: "#fff",
      boxShadow: theme.palette.mode === "dark"
        ? "0 3px 6px rgba(0,0,0,0.5)"
        : "0 3px 6px rgba(0,0,0,0.15)",
      "&:hover": {
        background: theme.palette.mode === "dark"
          ? "linear-gradient(135deg,#0ea5e9,#3b82f6)"
          : "linear-gradient(135deg,#3b82f6,#0ea5e9)",
        boxShadow: theme.palette.mode === "dark"
          ? "0 4px 8px rgba(0,0,0,0.6)"
          : "0 4px 8px rgba(0,0,0,0.2)",
      },
    }}
  >
    {editingContact ? "Update" : "Add"}
  </Button>
</Box>

        </Box>
      </Drawer>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Contacts;
