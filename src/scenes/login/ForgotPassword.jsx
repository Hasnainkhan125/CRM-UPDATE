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
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2500); // modern loader 2.5s
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

      const userIndex = users.findIndex(
        (u) => u.email?.toLowerCase() === email.toLowerCase()
      );
      if (userIndex === -1) {
        setLoading(false);
        setSnackbar({ open: true, message: "Email is not registered!", severity: "error" });
        return;
      }

      users[userIndex].password = newPassword;
      localStorage.setItem("team-members", JSON.stringify(users));

      setLoading(false);
      setSnackbar({ open: true, message: "Password reset successfully!", severity: "success" });
      setEmail(""); 
      setNewPassword(""); 
      setConfirmPassword("");

      setTimeout(() => navigate("/login"), 1500);
    }, 2000);
  };

  // ================= MODERN LOADER =================
 
if (showLoader) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#000000",
        gap: 4,
      }}
    >
      {/* iOS / macOS Style Spinner */}
      <Box
        sx={{
          position: "relative",
          width: 80,
          height: 80,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [1, 0.2] }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              delay: i * 0.1,
            }}
            style={{
              position: "absolute",
              top: "4px",
              left: "50%",
              width: "8px",
              height: "18px",
              background: "linear-gradient(180deg, #ffffff, #b0b0b0)",
              borderRadius: "10px",
              transformOrigin: "center 36px",
              transform: `rotate(${i * 30}deg)`,
              boxShadow: "0 0 6px rgba(255, 255, 255, 0.6)",
            }}
          />
        ))}
      </Box>

{/* Loading Text */}
<motion.div
  animate={{ scale: [1, 1.03, 1], opacity: [1, 0.9, 1] }}
  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
>
  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
    <Typography
      sx={{
        fontSize: "1.4rem",
        fontWeight: 600,
        color: "#f5f5f5",
        letterSpacing: "0.5px",
        fontFamily: "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      Loading
    </Typography>
    {[...Array(3)].map((_, i) => (
      <motion.span
        key={i}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          delay: i * 0.3,
          ease: "easeInOut",
        }}
        style={{
          fontSize: "1.4rem",
          fontWeight: 600,
          color: "#f5f5f5",
        }}
      >
        .
      </motion.span>
    ))}
  </Box>
</motion.div>
      {/* Subtext */}
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2.4 }}
      >
        <Typography
          sx={{
            fontSize: "0.95rem",
            color: "#888",
            mt: 2,
            fontStyle: "italic",
            fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          Preparing your Forgotpassword form...
        </Typography>
      </motion.div>
    </Box>
  );
}


  // ================= FORGOT PASSWORD FORM =================
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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #171717ff 0%, #141414ff 50%, #171717ff 100%)",
        p: 3,
      }}
    >
      <Fade in={true} timeout={1000}>
        <Paper
          sx={{
            p: 8,
            borderRadius: 5,
            width: 600,
            maxWidth: "95%",
            textAlign: "center",
            background: "rgba(255,255,255,0.85)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            mb={5}
            sx={{
              background: "linear-gradient(90deg, #00d9ffff, #26d8f7ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            🔒 Reset Password
          </Typography>

          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon sx={{ color: "#000" }} />
                </InputAdornment>
              ),
              sx: { color: "#000" },
            }}
            sx={{
              ...textFieldSx,
              "& input": { color: "#000" },
              "& .MuiInputLabel-root": { color: "#000" },
            }}
          />

          <TextField
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ color: "#000" }} />
                </InputAdornment>
              ),
              sx: { color: "#000" },
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
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ color: "#000" }} />
                </InputAdornment>
              ),
              sx: { color: "#000" },
            }}
            sx={{
              ...textFieldSx,
              mb: 4,
              "& input": { color: "#000" },
              "& .MuiInputLabel-root": { color: "#000" },
            }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              py: 2,
              borderRadius: 4,
              fontWeight: "bold",
              fontSize: "1.2rem",
              textTransform: "none",
              background: "linear-gradient(90deg, #00d9ffff, #00d9ffff)",
              "&:hover": { transform: "translateY(2px)" },
            }}
          >
            {loading ? <CircularProgress size={28} color="inherit" /> : "Reset Password"}
          </Button>

          <Button
            onClick={() => navigate("/login")}
            sx={{
              mt: 4,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
              color: "#555",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            ← Back to Login
          </Button>
        </Paper>
      </Fade>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ForgotPassword;
