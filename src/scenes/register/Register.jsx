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

      setTimeout(() => navigate("/login"), 2500);
    }, 1500);
  };

  // 🔹 Custom Animated Loader Screen
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
            Preparing your Registration  form...
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
        backgroundColor: "#0b0a0aff",
        p: 2,
      }}
    >
      <Fade in timeout={1900}>
        <Paper
          elevation={16}
          sx={{
            width: showFullForm ? "100%" : { xs: "90%", sm: "90%", md: "50%" },
            height: showFullForm ? "100vh" : { xs: "auto", md: "400px" },
            display: "flex",
            flexDirection: { xs: "column", md: showFullForm ? "row" : "column" },
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Left Form Section */}
          <Box
            sx={{
              flex: 1,
              background: "linear-gradient(145deg, #222222, #1a1a1a)",
              p: { xs: 6, md: 12 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRight: showFullForm ? { md: "1px solid #333" } : "none",
            }}
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="700"
                textAlign={"center"}
                color="#ffffff"
                mb={3}
              >
                {!isVerified ? "Admin Verification" : "Create Your Account"}
              </Typography>

              {!isVerified ? (
                <>
                  <TextField
                    fullWidth
                    label="Admin Code"
                    value={adminCodeInput}
                    onChange={(e) => setAdminCodeInput(e.target.value)}
                    InputLabelProps={{ style: { color: "#aaa" } }}
                    InputProps={{
                      style: {
                        color: "#fff",
                        backgroundColor: "#1a1a1a",
                        borderRadius: "12px",
                      },
                    }}
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#444" },
                        "&:hover fieldset": { borderColor: "#7c3aed" },
                        "&.Mui-focused fieldset": { borderColor: "#a78bfa", borderWidth: 2 },
                      },
                    }}
                  />
                  <Button
                    fullWidth
                    onClick={handleCodeVerify}
                    sx={{
                      py: 1.5,
                      borderRadius: "12px",
                      background: "linear-gradient(90deg,#7c3aed 0%,#a78bfa 100%)",
                      color: "#fff",
                      fontWeight: "bold",
                      "&:hover": {
                        background: "linear-gradient(90deg,#a78bfa 0%,#7c3aed 100%)",
                      },
                    }}
                  >
                    Verify
                  </Button>
                </>
              ) : (
                <>
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
                      type={
                        field.toLowerCase().includes("password") && !showPassword
                          ? "password"
                          : "text"
                      }
                      label={
                        field === "confirmPassword"
                          ? "Confirm Password"
                          : field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      InputLabelProps={{ style: { color: "#aaa" } }}
                      InputProps={{
                        style: {
                          color: "#fff",
                          backgroundColor: "#1a1a1a",
                          borderRadius: "12px",
                        },
                        endAdornment:
                          field.toLowerCase().includes("password") ? (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <VisibilityOff sx={{ color: "#fff" }} />
                                ) : (
                                  <Visibility sx={{ color: "#fff" }} />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ) : null,
                      }}
                      sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#444" },
                          "&:hover fieldset": { borderColor: "#7c3aed" },
                          "&.Mui-focused fieldset": { borderColor: "#a78bfa", borderWidth: 2 },
                        },
                        "& .MuiInputLabel-root.Mui-focused": { color: "#a78bfa" },
                      }}
                    />
                  ))}
                  <Button
                    fullWidth
                    onClick={handleSubmit}
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      borderRadius: "12px",
                      background: "linear-gradient(90deg,#7c3aed 0%,#a78bfa 100%)",
                      color: "#fff",
                      fontWeight: "bold",
                      mt: 1,
                      "&:hover": {
                        background: "linear-gradient(90deg,#a78bfa 0%,#7c3aed 100%)",
                      },
                    }}
                  >
                    {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Register"}
                  </Button>
                </>
              )}
            </Box>

            {/* Footer Link */}
            <Box sx={{ textAlign: "center", mt: 1 }}>
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                <Button
                  onClick={() => navigate("/login")}
                  sx={{
                    color: "#aaa",
                    textTransform: "none",
                    "&:hover": {
                      background: "transparent",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Already have an account?
                </Button>
              </Typography>
            </Box>
          </Box>

          {/* Right Image Section */}
          {showFullForm && (
            <Box
              sx={{
                flex: 1,
                display: { xs: "none", md: "block" },
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Blurred Background */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url("/assets/auth/back3.jpg")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(5px)",
                  zIndex: 0,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(135deg, rgba(19, 19, 19, 0.24) 0%, rgba(0, 0, 0, 0.6) 100%)",
                  zIndex: 1,
                }}
              />
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
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
                  px: 5,
                }}
              >
                <motion.img
                  src="/assets/se2.png"
                  alt="PAK CRM Logo"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1 }}
                  style={{ width: 320, marginBottom: 30 }}
                />
                <Typography variant="h2" fontWeight={700} sx={{ mb: 2 }}>
                  Welcome to <span style={{ color: "#90caf9" }}>PAK CRM</span>
                </Typography>
                <Typography variant="h6" sx={{ mt: 1, color: "#ccc", mb: 4 }}>
                  Streamline your business efficiently.
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 4,
                    flexWrap: "wrap",
                    justifyContent: "center",
                    mt: 3,
                  }}
                >
                  {[
                    { icon: "💼", label: "Manage Clients" },
                    { icon: "📊", label: "Analytics" },
                    { icon: "⚡", label: "Fast Performance" },
                    { icon: "🔒", label: "Secure Data" },
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + idx * 0.2, duration: 1 }}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: 40,
                          mb: 1,
                          background: "rgba(255,255,255,0.1)",
                          borderRadius: "50%",
                          width: 70,
                          height: 70,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backdropFilter: "blur(5px)",
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="subtitle2" sx={{ color: "#ccc" }}>
                        {feature.label}
                      </Typography>
                    </motion.div>
                  ))}
                </Box>

                {/* Floating Blurred Shapes */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ repeat: Infinity, duration: 6, yoyo: true }}
                  style={{
                    position: "absolute",
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    background: "#90caf9",
                    top: 50,
                    left: 30,
                    zIndex: 0,
                    filter: "blur(80px)",
                  }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ repeat: Infinity, duration: 8, yoyo: true }}
                  style={{
                    position: "absolute",
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: "#7c3aed",
                    bottom: 50,
                    right: 50,
                    zIndex: 0,
                    filter: "blur(100px)",
                  }}
                />
              </Box>
            </Box>
          )}
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
