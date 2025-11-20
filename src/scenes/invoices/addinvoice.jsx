import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
  Drawer,
  Divider,
  IconButton,
  Slide,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const AddInvoice = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [open, setOpen] = useState(true);
  const [form, setForm] = useState({
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
      const totalCost =
        parseFloat(form.cost) + (form.agencyFee ? parseFloat(form.agencyFee) : 0);

      const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
      const newInvoice = {
        _id: Date.now().toString(),
        ...form,
        totalCost,
      };

      const updatedInvoices = [...storedInvoices, newInvoice];
      localStorage.setItem("invoices", JSON.stringify(updatedInvoices));

      setLoading(false);
      setSuccess(true);

      setTimeout(() => navigate("/admin/invoices"), 1200);
    }, 800);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => navigate("/admin/invoices"), 300);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      transitionDuration={{ enter: 800, exit: 500 }}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 500 },
          p: 3,
          display: "flex",
          flexDirection: "column",
          height: "100%",
            bgcolor: theme.palette.mode === "dark" ? "#000000ff" : "#fff",
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={3} mb={6}>
        <Typography variant="h4" color={isDark ? "#fff" : "#000"}>
          Add New Invoice
        </Typography>
        <IconButton onClick={handleClose} sx={{ color: isDark ? "#fff" : "#000" }}>
          <CloseIcon />
        </IconButton>
      </Box>


      <Box flexGrow={1} overflow="auto">
        <Grid container spacing={2}>
          {["name", "phone", "email", "cost", "agencyFee", "date"].map((field) => (
            <Grid  item xs={field === "email" ? 12 : 6} key={field}>
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
                  backgroundColor: isDark ? "#2f2f2fff" : "#fff",
                  input: { color: isDark ? "#fff" : "#000" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: isDark ? "#555" : "#ccc" },
                    "&:hover fieldset": { borderColor: isDark ? "#777" : "#888" },
                  },
                  "& .MuiInputLabel-root": { color: isDark ? "#aaa" : "#555" },
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
                backgroundColor: isDark ? "#2f2f2fff" : "#fff",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: isDark ? "#555" : "#ccc" },
                  "&:hover fieldset": { borderColor: isDark ? "#777" : "#888" },
                },
                "& .MuiInputLabel-root": { color: isDark ? "#aaa" : "#555" },
                "& .MuiSelect-select": { color: isDark ? "#fff" : "#000" },
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
      </Box>

      <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={loading}
          sx={{
            background: "linear-gradient(90deg, #ffae00ff, #ffae00ff)",
            fontWeight: "bold",
            px: 5,
            py: 1,
            borderRadius: "32px",
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Add Invoice"}
        </Button>

        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{ color: isDark ? "#fff" : "#000", px: 5,
            py: 1.5, borderRadius: '30px', borderColor: isDark ? "#ffffffff" : "#000000ff" }}
        >
          Cancel
        </Button>
      </Box>

      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ borderRadius: "8px" }}>
          Invoice Added Successfully!
        </Alert>
      </Snackbar>
    </Drawer>
  );
};

export default AddInvoice;
