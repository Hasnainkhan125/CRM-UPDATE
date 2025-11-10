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
    const timer = setTimeout(() => setShowLoader(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = () => {
    if (!email || !newPassword || !confirmPassword) {
      setSnackbar({
        open: true,
        message: "All fields are required!",
        severity: "error",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setSnackbar({
        open: true,
        message: "Passwords do not match!",
        severity: "error",
      });
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
        setSnackbar({
          open: true,
          message: "Email is not registered!",
          severity: "error",
        });
        return;
      }

      users[userIndex].password = newPassword;
      localStorage.setItem("team-members", JSON.stringify(users));

      setLoading(false);
      setSnackbar({
        open: true,
        message: "Password reset successfully!",
        severity: "success",
      });
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
                background: "linear-gradient(180deg, #ffffffff, #b0b0b0)",
                borderRadius: "10px",
                transformOrigin: "center 36px",
                transform: `rotate(${i * 30}deg)`,
                boxShadow: "0 0 6px rgba(255, 255, 255, 0.6)",
              }}
            />
          ))}
        </Box>

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
                fontFamily:
                  "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
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
              fontFamily:
                "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Preparing your Forgotpassword form...
          </Typography>
        </motion.div>
      </Box>
    );
  }

  // ================= UPDATED DESIGN =================
  const textFieldSx = {
    mb: 3,
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      height: 60,
      "& fieldset": { borderColor: "#cfd8dc" },
      "&:hover fieldset": { borderColor: "#00acc1" },
      "&.Mui-focused fieldset": { borderColor: "#00acc1" },
    },
    "& .MuiInputLabel-root": { fontSize: "1rem", color: "#555" },
    "& input": { fontSize: "1rem" },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Fade in={true} timeout={1000}>
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            width: "900px",
            maxWidth: "100%",
            borderRadius: 5,
            overflow: "hidden",
            background: "#fff",
            boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
          }}
        >
          {/* Left Side Image */}
          <Box
            sx={{
              backgroundColor: "#f0fafc",
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 4,
            }}
          >
            <img
              src="/assets/se1.png" // 👈 your public asset image
              alt="Forgot Password"
              style={{
                width: "90%",
                maxWidth: "400px",
              }}
            />
          </Box>

          {/* Right Form */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 4, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: "#2d3e50", mb: 1 }}
            >
              Forgot Password?
            </Typography>
            <Typography sx={{ color: "#6b7c93", mb: 4 }}>
              Enter the email address associated with your account.
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
                    <EmailOutlinedIcon sx={{ color: "#00acc1" }} />
                  </InputAdornment>
                ),
              }}
              sx={textFieldSx}
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
                    <LockOutlinedIcon sx={{ color: "#00acc1" }} />
                  </InputAdornment>
                ),
              }}
              sx={textFieldSx}
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
                    <LockOutlinedIcon sx={{ color: "#00acc1" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ ...textFieldSx, mb: 4 }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: 3,
                fontWeight: "bold",
                fontSize: "1.1rem",
                textTransform: "none",
                background: "linear-gradient(90deg, #00c6ff, #0072ff)",
                "&:hover": { background: "linear-gradient(90deg, #0072ff, #00c6ff)" },
              }}
            >
              {loading ? (
                <CircularProgress size={28} color="inherit" />
              ) : (
                "Reset Password"
              )}
            </Button>

            <Button
              onClick={() => navigate("/login")}
              sx={{
                mt: 3,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
                color: "#0072ff",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              ← Back to Login
            </Button>
          </Box>
        </Paper>
      </Fade>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ForgotPassword;
