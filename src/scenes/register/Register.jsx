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
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TEAM_STORAGE_KEY = "team-members";

const Register = () => {
  const navigate = useNavigate();

  const [isVerified, setIsVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    city: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [adminCodeInput, setAdminCodeInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  // ✅ Loader effect
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCodeVerify = () => {
    const storedCode = localStorage.getItem("adminCode");
    if (adminCodeInput === storedCode) {
      setIsVerified(true);
      speak("Admin code verified. You can now register.");
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

      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(updatedUsers));

      setLoading(false);
      setSnackbarOpen(true);
      speak("Account created successfully.");

      setTimeout(() => navigate("/login"), 2500);
    }, 1500);
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
          Preparing your Registration form...
        </Typography>
      </motion.div>
    </Box>
  );
}


  // ================= MAIN REGISTER FORM =================
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "#1e1e1eff",
      }}
    >
      {/* Left Section — Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        <Paper
          elevation={12}
          sx={{
            p: 6,
            borderRadius: 5,
            width: "90%",
            maxWidth: 500,
            textAlign: "center",
            background: "#ffffff",
            color: "#000000",
          }}
        >
          {!isVerified ? (
            <>
              <Typography variant="h4" fontWeight="bold" mb={3}>
                Enter Admin Reference Code
              </Typography>

              <TextField
                fullWidth
                label="Admin Code"
                value={adminCodeInput}
                onChange={(e) => setAdminCodeInput(e.target.value)}
                margin="normal"
                InputLabelProps={{ style: { color: "#000" } }}
                InputProps={{ style: { color: "#000" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#000" },
                    "&:hover fieldset": { borderColor: "#000" },
                    "&.Mui-focused fieldset": { borderColor: "#000" },
                  },
                }}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.3,
                  borderRadius: 3,
                  backgroundColor: "#1976d2",
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
                onClick={handleCodeVerify}
              >
                Verify Code
              </Button>
            </>
          ) : (
            <>
              <Typography
                variant="h4"
                fontWeight="bold"
                mb={3}
                sx={{
                  color: "#111",
                  fontFamily: "Poppins, sans-serif",
                  letterSpacing: "0.5px",
                }}
              >
                Create Your Account
              </Typography>

              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {[
                  "name",
                  "contact",
                  "address",
                  "city",
                  "email",
                  "password",
                  "confirmPassword",
                ].map((field) => (
                  <TextField
                    key={field}
                    fullWidth
                    label={
                      field === "confirmPassword"
                        ? "Confirm Password"
                        : field.charAt(0).toUpperCase() + field.slice(1)
                    }
                    name={field}
                    type={field.toLowerCase().includes("password") ? "password" : "text"}
                    value={formData[field]}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      style: { color: "#000", fontWeight: 500 },
                    }}
                    InputProps={{
                      style: {
                        color: "#000",
                        backgroundColor: "#fafafa",
                        borderRadius: "12px",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#000",
                          borderRadius: "12px",
                        },
                        "&:hover fieldset": { borderColor: "#1976d2" },
                        "&.Mui-focused fieldset": {
                          borderColor: "#1976d2",
                          borderWidth: 2,
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#1976d2",
                      },
                    }}
                  />
                ))}
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.4,
                  borderRadius: "12px",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "none",
                  background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                  boxShadow: "0 4px 15px rgba(25, 118, 210, 0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(25, 118, 210, 0.6)",
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
              </Button>
            </>
          )}

          <Typography
            variant="body2"
            sx={{
              mt: 3,
              cursor: "pointer",
              color: "#333",
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
          </Typography>
        </Paper>
      </Box>

      {/* Right Section — Image + Overlay + Content */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          backgroundImage: `url("/assets/auth/back3.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(135deg, rgba(0, 6, 51, 0.85) 0%, rgba(0, 0, 0, 0.6) 100%)",
            backdropFilter: "blur(4px)",
            zIndex: 1,
          }}
        />

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          sx={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "#fff",
            p: 6,
          }}
        >
          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              mb: 2,
              letterSpacing: "1.5px",
              textShadow: "0 4px 18px rgba(0,0,0,0.6)",
            }}
          >
            Welcome to <span style={{ color: "#90caf9" }}>PAK CRM</span>
          </Typography>

          <Typography
            variant="h5"
            sx={{
              maxWidth: 600,
              mb: 5,
              fontSize: "1.5rem",
              fontWeight: 400,
              opacity: 0.95,
              fontFamily: "Poppins, sans-serif",
              borderRight: "3px solid #fff",
              whiteSpace: "nowrap",
              overflow: "hidden",
              width: "31ch",
              animation: "typing 5s steps(31), blink 0.6s step-end infinite alternate",
              "@keyframes typing": {
                from: { width: 0 },
                to: { width: "31ch" },
              },
              "@keyframes blink": {
                "50%": { borderColor: "transparent" },
              },
            }}
          >
            MAKE YOUR BUSINESS. With PAK CRM 🚀
          </Typography>
        </Box>
      </Box>

      {/* Snackbars */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Account created successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorSnackbar}
        autoHideDuration={3000}
        onClose={() => setErrorSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setErrorSnackbar(false)}>
          Invalid admin code or input error!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
