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
    }, 4500);
  };

  // 🔹 Modern Field Styles (reused for all fields)
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
    },
    "& .MuiInputLabel-root": { color: "#333", fontWeight: 500 },
    "& .MuiInputLabel-root.Mui-focused": { color: "#000" },
  };

  // 🔹 Loader Screen
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
                background: "linear-gradient(180deg, #ffffff, #b0b0b0)",
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
            Preparing your Registration form...
          </Typography>
        </motion.div>
      </Box>
    );
  }

  // 🔹 Main UI
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f7",
        p: 2,
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
              p: { xs: 4, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ color: "#000", mb: 2, textAlign: "center" }}
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
                    py: 1.2,
                    fontWeight: "bold",
                    backgroundColor: "black",
                    "&:hover": { backgroundColor: "#333" },
                  }}
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
                              <IconButton onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? (
                                  <VisibilityOff sx={{ color: "black" }} />
                                ) : (
                                  <Visibility sx={{ color: "black" }} />
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
    py: 1.5,
    fontWeight: "bold",
    mt: 1,
    backgroundColor: loading ? "#555" : "black",
    color: loading ? "#79c0f9ff" : "#fff",
    "&:hover": {
      backgroundColor: loading ? "#666" : "#333",
    },
  }}
>
  {loading ? (
    <CircularProgress
      size={22}
      sx={{
        color: "#90caf9", // spinner color when loading
      }}
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
                  color: "black",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Already have an account?
              </Button>
            </Typography>
          </Box>

       {/* Right Section — Visual */}
<Box
  sx={{
    flex: 1,
    backgroundImage: `url("/assets/auth/back3.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: { xs: "none", md: "flex" },
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    textAlign: "center",
    p: 4,
    overflow: "hidden",
  }}
>
  {/* Gradient + Blur Layer */}
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      background: "linear-gradient(135deg, rgba(55,0,255,0.45), rgba(0,0,0,0.6))",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      zIndex: 0,
    }}
  />

{/* Content */}
<Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
  {/* Logo */}
  <motion.img
    src="/assets/loading-logo.png"
    alt="Logo"
    style={{
      width: 320,
      marginBottom: 24,
      filter: "drop-shadow(0 0 20px rgba(0,0,0,0.5))",
    }}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  />

  {/* Main Title */}
  <Typography
    variant="h1"
    fontWeight={800}
    sx={{
      color: "#fff",
      textShadow: "0 0 20px rgba(0,0,0,0.5)",
      mb: 1,
    }}
  >
    Welcome to <span style={{ color: "#90caf9" }}>PAK CRM</span>
  </Typography>

  {/* Subtitle */}
  <Typography
    variant="body1"
    sx={{
      color: "rgba(255,255,255,0.85)",
      mt: 1.5,
      fontSize: "0.9rem",
      fontWeight: 400,
    }}
  >
    Manage clients and grow your business smarter.
  </Typography>

  {/* Floating & Animated Modern Icons */}
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      gap: 8,
      mt: 5,
      flexWrap: "wrap",
      position: "relative",
    }}
  >
    {[
      { icon: "💼", label: "Clients" },
      { icon: "📊", label: "Analytics" },
      { icon: "🔔", label: "Alerts" },
      { icon: "☁️", label: "Cloud" },
    ].map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: -30, scale: 0.7 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: 0.4 + index * 0.2,
          type: "spring",
          stiffness: 130,
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          position: "relative",
        }}
        whileHover={{ scale: 1.3 }}
      >

        
        {/* Icon with glowing gradient background */}
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "radial-gradient(circle, #90caf9, #0d47a1)",
            boxShadow: "0 0 20px rgba(144, 202, 249, 0.7)",
            mb: 1,
          }}
        >
          <Typography sx={{ fontSize: "2.5rem" }}>{item.icon}</Typography>
        </Box>
        <Typography
          sx={{
            fontSize: "0.9rem",
            color: "#fff",
            fontWeight: 500,
            textShadow: "0 0 6px rgba(0,0,0,0.4)",
          }}
        >
          {item.label}
        </Typography>
      </motion.div>
    ))}
  </Box>

  {/* Subtle Gradient Blur Effect */}
  <Box
    sx={{
      position: "absolute",
      bottom: "-15%",
      width: "70%",
      height: "50%",
      background:
        "radial-gradient(circle at center, rgba(144,202,249,0.25), transparent 70%)",
      filter: "blur(20px)",
      zIndex: 0,
      left: "50%",
      transform: "translateX(-50%)",
    }}
  />
</Box>


  {/* Subtle Glow Effect */}
  <Box
    sx={{
      position: "absolute",
      bottom: "-20%",
      width: "60%",
      height: "40%",
      background:
        "radial-gradient(circle at center, rgba(193, 74, 249, 0.25), transparent 70%)",
      filter: "blur(10px)",
      zIndex: 0,
    }}
  />
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
