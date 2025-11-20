import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Fade,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const TEAM_STORAGE_KEY = "team-members";

const Register = () => {
  const navigate = useNavigate();

  const [isVerified, setIsVerified] = useState(false);
  const [showFullForm, setShowFullForm] = useState(false);
  const [adminCodeInput, setAdminCodeInput] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    city: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (showFullForm) {
      setShowLoader(true);
      const timer = setTimeout(() => setShowLoader(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showFullForm]);

  const handleCodeVerify = () => {
    const storedCode = localStorage.getItem("adminCode");
    if (adminCodeInput === storedCode) {
      setIsVerified(true);
      speak("Admin code verified...");
      setShowFullForm(true);
    } else {
      setErrorSnackbar(true);
      speak("Invalid admin code. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const { name, contact, address, city, email, password, confirmPassword } = formData;

    if (!name || !contact || !address || !city || !email || !password || !confirmPassword) {
      setErrorSnackbar(true);
      speak("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorSnackbar(true);
      speak("Passwords do not match.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const existingUsers = JSON.parse(localStorage.getItem(TEAM_STORAGE_KEY)) || [];
      const userExists = existingUsers.some((u) => u.email === email);

      if (userExists) {
        setErrorSnackbar(true);
        speak("This email is already registered.");
        setLoading(false);
        return;
      }

      const newUser = {
        id: existingUsers.length ? existingUsers[existingUsers.length - 1].id + 1 : 1,
        name,
        contact,
        address,
        city,
        email,
        password,
        access: "user",
      };

      localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify([...existingUsers, newUser]));

      setLoading(false);
      setSnackbarOpen(true);
      speak("Account created successfully.");

      setTimeout(() => navigate("/login"), 4500);
    }, 2000);
  };

  const modernFieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      transition: "all 0.25s ease",
      "& fieldset": { borderColor: "#bdbdbd" },
      "&:hover fieldset": {
        borderColor: "#000",
        boxShadow: "0 0 6px rgba(0,0,0,0.1)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#000",
        boxShadow: "0 0 8px rgba(0,0,0,0.25)",
      },
      height: { xs: 40, sm: 48, md: 55 },
    },
    "& .MuiInputLabel-root": {
      color: "#333",
      fontWeight: 500,
      fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#000" },
    "& input": { fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" } },
  };
  if (showLoader) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0a0027ff",
          gap: 2,
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
                background: "linear-gradient(180deg, #ffffff, #b0b0b0)",
                borderRadius: "10px",
                transformOrigin: "center 36px",
                transform: `rotate(${i * 30}deg)`,
              }}
            />
          ))}
        </Box>

        <motion.div animate={{ scale: [1, 1.03, 1], opacity: [1, 0.9, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography sx={{ fontSize: "1.4rem", fontWeight: 600, color: "#f5f5f5" }}>
              Loading
            </Typography>
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.3 }}
                style={{ fontSize: "1.4rem", fontWeight: 600, color: "#f5f5f5" }}
              >
                .
              </motion.span>
            ))}
          </Box>
        </motion.div>

        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2.4 }}>
          <Typography sx={{ fontSize: "0.95rem", color: "#888", mt: 2, fontStyle: "italic" }}>
            Preparing your Registration form...
          </Typography>
        </motion.div>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f7",
        p: { xs: 1, sm: 2 },
      }}
    >
      <Fade in timeout={1200}>
        <Paper
          elevation={10}
          sx={{
            width: { xs: "95%", sm: "80%", md: "65%" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: 4,
            overflow: "hidden",
            background: "#fff",
          }}
        >
          {/* Left Form Section */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 3, sm: 4, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: { xs: 1.5, sm: 2, md: 2.5 },
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{
                color: "#000",
                mb: { xs: 1.5, sm: 2 },
                textAlign: "center",
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.75rem" },
              }}
            >
              {!isVerified ? "Admin Verification" : "Create Your Account"}
            </Typography>

            {!isVerified ? (
              <>
                <TextField
                  label="Admin Code"
                  value={adminCodeInput}
                  onChange={(e) => setAdminCodeInput(e.target.value)}
                  fullWidth
                  InputLabelProps={{ style: { color: "black" } }}
                  InputProps={{
                    style: { color: "black", backgroundColor: "#fff" },
                  }}
                  sx={modernFieldStyle}
                />
                <Button
                  onClick={handleCodeVerify}
                  variant="contained"
                  sx={{
                    py: { xs: 0.8, sm: 1.2 },
                    fontWeight: "bold",
                    fontSize: { xs: "0.8rem", sm: "0.95rem", md: "1rem" },
                    backgroundColor: "black",
                    "&:hover": { backgroundColor: "#333" },
                  }}
                  fullWidth
                >
                  Verify
                </Button>
              </>
            ) : (
              <>
                {["name", "contact", "address", "city", "email", "password", "confirmPassword"].map(
                  (field) => (
                    <TextField
                      key={field}
                      label={
                        field === "confirmPassword"
                          ? "Confirm Password"
                          : field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      name={field}
                      type={
                        field.includes("password") && !showPassword ? "password" : "text"
                      }
                      value={formData[field]}
                      onChange={handleChange}
                      fullWidth
                      InputLabelProps={{ style: { color: "black" } }}
                      InputProps={{
                        style: { color: "black", backgroundColor: "#fff" },
                        endAdornment:
                          field.includes("password") ? (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                sx={{ p: { xs: 0.3, sm: 0.5 } }}
                              >
                                {showPassword ? (
                                  <VisibilityOff sx={{ fontSize: { xs: 18, sm: 20 } }} />
                                ) : (
                                  <Visibility sx={{ fontSize: { xs: 18, sm: 20 } }} />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ) : null,
                      }}
                      sx={modernFieldStyle}
                    />
                  )
                )}

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={loading}
                  sx={{
                    py: { xs: 0.9, sm: 1.2, md: 1.5 },
                    fontWeight: "bold",
                    mt: 1,
                    fontSize: { xs: "0.8rem", sm: "0.95rem", md: "1rem" },
                    backgroundColor: loading ? "#555" : "black",
                    color: loading ? "#79c0f9ff" : "#fff",
                    "&:hover": {
                      backgroundColor: loading ? "#666" : "#333",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress
                      size={{ xs: 18, sm: 22, md: 24 }}
                      sx={{ color: "#90caf9" }}
                    />
                  ) : (
                    "Register"
                  )}
                </Button>
              </>
            )}

            <Typography variant="body2" textAlign="center" mt={2}>
              <Button
                onClick={() => navigate("/login")}
                sx={{
                  textTransform: "none",
                  fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
                  color: "black",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Already have an account?
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Fade>

      {/* Snackbars */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success">Account created successfully!</Alert>
      </Snackbar>
      <Snackbar
        open={errorSnackbar}
        autoHideDuration={2500}
        onClose={() => setErrorSnackbar(false)}
      >
        <Alert severity="error">Invalid admin code or input error!</Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
