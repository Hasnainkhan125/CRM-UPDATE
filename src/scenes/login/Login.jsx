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
  Checkbox,
  FormControlLabel,
  Fade,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const TEAM_STORAGE_KEY = "team-members";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [rememberError, setRememberError] = useState(false);
  const [, setUsers] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [voiceEnabled] = useState(true);

  const speak = (text) => {
    if (!voiceEnabled) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Voice Recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript
        .toLowerCase()
        .trim();
      if (transcript.includes("hello")) {
        speak("Hello detected.");
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            id: 1,
            name: "Admin User",
            email: "admin@gmail.com",
            access: "admin",
          })
        );
        navigate("/admin-dashboard");
      }
    };

    recognition.onerror = (err) => console.error("Voice error:", err);
    recognition.start();

    return () => recognition.stop();
  }, []);

  useEffect(() => {
    let savedUsers = JSON.parse(localStorage.getItem(TEAM_STORAGE_KEY)) || [];
    const adminExists = savedUsers.some((u) => u.email === "admin@gmail.com");

    if (!adminExists) {
      savedUsers.push({
        id: savedUsers.length ? savedUsers[savedUsers.length - 1].id + 1 : 1,
        name: "Admin User",
        email: "admin@gmail.com",
        password: "admin123",
        access: "admin",
      });
      localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(savedUsers));
    }

    setUsers(savedUsers);
    const rememberedData = JSON.parse(localStorage.getItem("rememberedUser"));
    if (rememberedData) {
      setFormData(rememberedData);
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = () => {
    const { email, password } = formData;

    if (!rememberMe) {
      speak("Please check Remember Me!");
      setRememberError(true);
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem(TEAM_STORAGE_KEY)) || [];
    const foundUser = savedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      setLoading(true);
      speak("Login successful!");
      if (rememberMe)
        localStorage.setItem("rememberedUser", JSON.stringify(formData));

      setTimeout(() => {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        setSuccessSnackbar(true);
        if (email === "admin@gmail.com") navigate("/admin-dashboard");
        else navigate("/user-dashboard");
      }, 1500);
    } else {
      speak("Invalid email or password!");
      setOpenSnackbar(true);
    }
  };

  // Google Auth
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      speak(`Welcome ${user.displayName}`);
      setSuccessSnackbar(true);
      navigate("/user-dashboard");
    } catch {
      speak("Google login failed");
      setOpenSnackbar(true);
    }
  };


  // GitHub Auth
  const handleGitHubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      speak(`Welcome ${user.displayName}`);
      setSuccessSnackbar(true);
      navigate("/user-dashboard");
    } catch {
      speak("GitHub login failed");
      setOpenSnackbar(true);
    }
  };
  //load screen desingn
  
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
          Preparing your Sign form...
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
        backgroundColor: "#0b0a0aff",
      }}
    >
      <Fade in timeout={800}>
        <Paper
          elevation={12}
          sx={{
            width: { xs: "90%", sm: "90%", md: "120vh" },
            height: { xs: "auto", md: "650px" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          {/* Left Section */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#1c1c1c",
              p: { xs: 4, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h2"
              fontWeight="bold"
              textAlign="center"
              mb={5}
              color="#ffffff"
            >
              LOGIN
            </Typography>

            {/* Email */}
            <TextField
              label="Email Address"
              name="email"
              variant="standard"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              InputLabelProps={{ style: { color: "#ffffff" } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon sx={{ color: "#2196f3" }} />
                  </InputAdornment>
                ),
                style: { color: "#ffffff" },
              }}
              sx={{
                mb: 3,
                "& .MuiInput-underline:before": { borderBottomColor: "#fff" },
                "& .MuiInput-underline:after": { borderBottomColor: "#2196f3" },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "#fff",
                },
              }}
            />

            {/* Password */}
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              variant="standard"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              InputLabelProps={{ style: { color: "#ffffff" } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: "#2196f3" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <VisibilityOff sx={{ color: "#2196f3" }} />
                      ) : (
                        <Visibility sx={{ color: "#2196f3" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                style: { color: "#ffffff" },
              }}
              sx={{
                mb: 2,
                "& .MuiInput-underline:before": { borderBottomColor: "#fff" },
                "& .MuiInput-underline:after": { borderBottomColor: "#2196f3" },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "#fff",
                },
              }}
            />

            {/* Remember Me + Forgot */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{
                      color: "#2196f3",
                      "&.Mui-checked": { color: "#2196f3" },
                    }}
                  />
                }
                label={<Typography sx={{ color: "#ffffff" }}>Remember me</Typography>}
              />
              <Typography
                sx={{
                  color: "#2196f3",
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </Typography>
            </Box>

            {/* Login Button */}
            <Button
              fullWidth
              disabled={loading}
              onClick={handleLogin}
              sx={{
                py: 1.5,
                borderRadius: "8px",
                background: "linear-gradient(90deg,#7c3aed 0%,#a78bfa 100%)",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": { background: "linear-gradient(90deg,#a78bfa 0%,#7c3aed 100%)" },
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Login"}
            </Button>

            <Typography sx={{ mt: 4, mb: 2, textAlign: "center", color: "#bbbbbb" }}>
              Or continue with
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 5 }}>
              <GoogleIcon
                sx={{ color: "#DB4437", fontSize: 42, cursor: "pointer" }}
                onClick={handleGoogleLogin}
              />
              <GitHubIcon
                sx={{ color: "#24292F", fontSize: 42, cursor: "pointer" }}
                onClick={handleGitHubLogin}
              />
              <FacebookIcon sx={{ color: "#1877F2", fontSize: 42, cursor: "pointer" }} />
            </Box>

            <Typography textAlign={"center"} sx={{ mt: 4, color: "#ffffff" }}>
              Don’t have an account?{" "}
              <span
                style={{ color: "#2196f3", cursor: "pointer" }}
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </Typography>
          </Box>

          {/* Right Section */}
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", md: "block" },
              position: "relative",
              backgroundImage: `url("/assets/auth/auth2_cleanup.png")`,
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
                  "linear-gradient(135deg, rgba(25, 77, 210, 0.85) 0%, rgba(0, 0, 0, 0.6) 100%)",
                backdropFilter: "blur(5px)",
              }}
            />
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 40 }}
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
                p: 5,
              }}
            >
              <motion.img
                src="/assets/loading-logo.png"
                alt="PAK CRM Logo"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2 }}
                style={{
                  width: "120px",
                  borderRadius: "16px",
                  marginBottom: "25px",
                  boxShadow: "0 0 25px rgba(255,255,255,0.4)",
                  padding: "6px",
                }}
              />
              <Typography variant="h3" fontWeight={700}>
                Welcome to <span style={{ color: "#90caf9" }}>PAK CRM</span>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Fade>

      {/* Voice Login Button */}
      <IconButton
        onClick={() => speak("Voice Enable")}
        sx={{
          position: "fixed",
          right: 20,
          bottom: 40,
          color: "#fff",
          backgroundColor: "#2196f3",
          "&:hover": { backgroundColor: "#1976d2" },
          zIndex: 1000,
        }}
      >
        <VolumeUpIcon fontSize="large" />
      </IconButton>

      {/* Snackbars */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="error">Login failed. Try again!</Alert>
      </Snackbar>
      <Snackbar
        open={rememberError}
        autoHideDuration={2500}
        onClose={() => setRememberError(false)}
      >
        <Alert severity="warning">Please check "Remember Me" before login!</Alert>
      </Snackbar>
      <Snackbar
        open={successSnackbar}
        autoHideDuration={1500}
        onClose={() => setSuccessSnackbar(false)}
      >
        <Alert severity="success">Login successful!</Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
