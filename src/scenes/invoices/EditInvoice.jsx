import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
  Backdrop,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { m } from "framer-motion";

const EditInvoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const invoice = location.state?.invoice;

  const [form, setForm] = useState({
    _id: "",
    name: "",
    phone: "",
    email: "",
    cost: "",
    agencyFee: "",
    date: "",
    status: "Pending",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (invoice) setForm(invoice);
  }, [invoice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!form.name || !form.phone || !form.email || !form.cost || !form.date) {
      alert("Please fill all required fields!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
      const updatedInvoices = storedInvoices.map((inv) =>
        inv._id === form._id
          ? {
              ...form,
              totalCost:
                parseFloat(form.cost) +
                (form.agencyFee ? parseFloat(form.agencyFee) : 0),
            }
          : inv
      );
      localStorage.setItem("invoices", JSON.stringify(updatedInvoices));

      setLoading(false);
      setSuccess(true);

      setTimeout(() => navigate("/admin/invoices"), 1200);
    }, 800);
  };

  const handleCancel = () => navigate("/admin/invoices");

  return (
    <Box
      m="20px"
      position="relative"
      sx={{
        bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "#fff",
        backdropFilter: theme.palette.mode === "dark" ? "blur(8px)" : "none",
        borderRadius: "16px",
        p: 4,
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 8px 32px rgba(0,0,0,0.3)"
            : "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
   <Typography
  variant="h6"
  mb={5}
  fontWeight={700}
  sx={{
    color: theme.palette.mode === "dark" ? "#fff" : "text.primary",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 1,
  }}
>
  Edit Invoice
  <Box
    component="span"
    sx={{
      ml: 1,
      fontWeight: 800,
      background: theme.palette.mode === "dark"
        ? "linear-gradient(90deg, #ffb300ff, #f65713ff)"
        : "linear-gradient(90deg, #43e99cff, #38f9d7)",
      textShadow: theme.palette.mode === "dark"
        ? "0 2px 8px rgba(0,0,0,0.5)"
        : "0 1px 3px rgba(0,0,0,0.2)",
      fontSize: "1.2rem",
    }}
  >
    #{form._id}
  </Box>
</Typography>

<Grid container spacing={2}>
  {["name", "phone", "email", "cost", "agencyFee", "date"].map((field) => (
    <Grid
      item
      xs={12}       // full width on mobile
      sm={field === "email" ? 12 : 6} // two columns on small+ screens
      key={field}
    >
      <TextField
        name={field}
        label={
          field === "agencyFee"
            ? "Agency Fee (Optional)"
            : field.charAt(0).toUpperCase() + field.slice(1)
        }
        fullWidth
        value={form[field]}
        onChange={handleChange}
        type={
          field === "cost" || field === "agencyFee"
            ? "number"
            : field === "date"
            ? "date"
            : "text"
        }
        InputLabelProps={field === "date" ? { shrink: true } : {}}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.05)"
                : "rgba(250,250,250,1)",
            color: theme.palette.mode === "dark" ? "#fff" : "text.primary",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(245,245,245,1)",
            },
          },
          "& .MuiInputLabel-root": {
            color: theme.palette.mode === "dark" ? "rgba(255,255,255,0.7)" : "text.secondary",
          },
        }}
      />
    </Grid>
  ))}

  <Grid item xs={12}>
    <TextField
      select
      label="Status"
      name="status"
      fullWidth
      value={form.status}
      onChange={handleChange}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.05)"
              : "rgba(250,250,250,1)",
          color: theme.palette.mode === "dark" ? "#fff" : "text.primary",
          transition: "all 0.3s ease",
          "&:hover": {
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.1)"
                : "rgba(245,245,245,1)",
          },
        },
        "& .MuiInputLabel-root": {
          color: theme.palette.mode === "dark" ? "rgba(255,255,255,0.7)" : "text.secondary",
        },
      }}
    >
      {["Pending", "Paid", "Overdue"].map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  </Grid>
</Grid>

      <Box mt={3} display="flex" gap={2}>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            background: "linear-gradient(90deg, #008cff, #0066cc)",
            fontWeight: "bold",
            px: 3,
            py: 1,
            borderRadius: "12px",
          }}
        >
          Save Changes
        </Button>

        <Button
          onClick={handleCancel}
          variant="contained"
          sx={{
            background: "linear-gradient(90deg, #ffae00, #cc8800)",
            fontWeight: "bold",
            px: 3,
            py: 1,
            borderRadius: "12px",
          }}
        >
          Cancel
        </Button>
      </Box>

      {/* Loading Backdrop */}
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: 9999 }}>
        <CircularProgress color="inherit" />
        <Typography ml={2}>Updating Invoice...</Typography>
      </Backdrop>

      {/* Success Snackbar */}

      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ borderRadius: "8px" }}>
        Edit Successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditInvoice;
