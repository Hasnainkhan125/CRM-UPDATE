import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  InputAdornment,
  Fade,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = () => {
    if (!email || !newPassword || !confirmPassword) {
      setSnackbar({ open: true, message: "All fields are required!", severity: "error" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setSnackbar({ open: true, message: "Passwords do not match!", severity: "error" });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const stored = localStorage.getItem("team-members");
      let users = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(users)) users = [users];

      const userIndex = users.findIndex(u => u.email?.toLowerCase() === email.toLowerCase());
      if (userIndex === -1) {
        setLoading(false);
        setSnackbar({ open: true, message: "Email is not registered!", severity: "error" });
        return;
      }

      users[userIndex].password = newPassword;
      localStorage.setItem("team-members", JSON.stringify(users));

      setLoading(false);
      setSnackbar({ open: true, message: "Password reset successfully!", severity: "success" });
      setEmail(""); setNewPassword(""); setConfirmPassword("");

      setTimeout(() => navigate("/login"), 1500);
    }, 2000);
  };

  if (showLoader) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "radial-gradient(circle at top left, #f5f5f5, #ffffff)" }}>
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
          style={{ width: 80, height: 80, borderRadius: "50%", border: "10px solid rgba(0,0,0,0.1)", borderTop: "10px solid #ffb300", marginBottom: 30 }}
        />
        <motion.h2 animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }} style={{ fontSize: "2rem", color: "#333", textAlign: "center" }}>
          Loading, please wait...
        </motion.h2>
      </Box>
    );
  }

  const textFieldSx = {
    mb: 3,
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      height: 60,
      "& fieldset": { borderColor: "rgba(0,0,0,0.2)" },
      "&:hover fieldset": { borderColor: "#ffb300" },
      "&.Mui-focused fieldset": { borderColor: "#ffb300" },
    },
    "& .MuiInputLabel-root": { fontSize: "1.1rem", color: "#000" },
    "& input": { fontSize: "1rem", padding: "15px" },
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #ececec 0%, #fff 50%, #ececec 100%)", p: 3 }}>
      <Fade in={true} timeout={1000}>
        <Paper sx={{ p: 8, borderRadius: 5, width: 600, maxWidth: "95%", textAlign: "center", backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.85)", boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }}>
          <Typography variant="h3" fontWeight="bold" mb={5} sx={{ background: "linear-gradient(90deg, #ffb300, #ff8c00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            🔒 Reset Password
          </Typography>
<TextField
  label="Email"
  fullWidth
  value={email}
  onChange={e => setEmail(e.target.value)}
  disabled={loading}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <EmailOutlinedIcon sx={{ color: "#000" }} />
      </InputAdornment>
    ),
    sx: { color: "#000" } // text color black
  }}
  sx={{
    ...textFieldSx,
    "& input": { color: "#000" }, // ensures input text is black
    "& .MuiInputLabel-root": { color: "#000" }, // label color black
  }}
/>

<TextField
  label="New Password"
  type="password"
  fullWidth
  value={newPassword}
  onChange={e => setNewPassword(e.target.value)}
  disabled={loading}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <LockOutlinedIcon sx={{ color: "#000" }} />
      </InputAdornment>
    ),
    sx: { color: "#000" }
  }}
  sx={{
    ...textFieldSx,
    "& input": { color: "#000" },
    "& .MuiInputLabel-root": { color: "#000" },
  }}
/>

<TextField
  label="Confirm Password"
  type="password"
  fullWidth
  value={confirmPassword}
  onChange={e => setConfirmPassword(e.target.value)}
  disabled={loading}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <LockOutlinedIcon sx={{ color: "#000" }} />
      </InputAdornment>
    ),
    sx: { color: "#000" }
  }}
  sx={{
    ...textFieldSx,
    mb: 4,
    "& input": { color: "#000" },
    "& .MuiInputLabel-root": { color: "#000" },
  }}
/>


          <Button variant="contained" fullWidth onClick={handleSubmit} disabled={loading} sx={{ py: 2, borderRadius: 4, fontWeight: "bold", fontSize: "1.2rem", textTransform: "none", background: "linear-gradient(90deg, #ffb300, #ff8c00)", "&:hover": { transform: "translateY(-3px)" } }}>
            {loading ? <CircularProgress size={28} color="inherit" /> : "Reset Password"}
          </Button>

          <Button onClick={() => navigate("/login")} sx={{ mt: 4, textTransform: "none", fontWeight: 600, fontSize: "1rem", color: "#555", "&:hover": { textDecoration: "underline" } }}>
            ← Back to Login
          </Button>
        </Paper>
      </Fade>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ForgotPassword;
