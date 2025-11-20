// src/scenes/auth/index.jsx
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
  Grid,
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

// 🔥 Firebase Config (keep your keys)
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

  // speak helper (keeps logic)
  const speak = (text) => {
    if (!voiceEnabled) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      // ignore speech errors
      // console.warn("Speech error", e);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Voice Recognition (keeps logic)
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

    recognition.onerror = (err) => {
      // console.error("Voice error:", err);
    };

    try {
      recognition.start();
    } catch (e) {
      // recognition might already be started in some browsers
    }

    return () => {
      try {
        recognition.stop();
      } catch (e) {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      if (rememberMe) localStorage.setItem("rememberedUser", JSON.stringify(formData));

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
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (!result) throw new Error("No result from Google sign-in");

      const user = result.user;
      if (!user) throw new Error("No user returned");

      localStorage.setItem("loggedIn", "true");
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );

      speak(`Welcome ${user.displayName || "User"}`);
      setSuccessSnackbar(true);
      navigate("/user-dashboard");
    } catch (error) {
      console.error("Google login error:", error);
      speak("Google login failed");
      setOpenSnackbar(true);
    }
  };

  // GitHub Auth
  const handleGitHubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (!result) throw new Error("No result from GitHub sign-in");

      const user = result.user;
      if (!user) throw new Error("No user returned");

      localStorage.setItem("loggedIn", "true");
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        })
      );

      speak(`Welcome ${user.displayName || "User"}`);
      setSuccessSnackbar(true);
      navigate("/user-dashboard");
    } catch (error) {
      console.error("GitHub login error:", error);
      speak("GitHub login failed");
      setOpenSnackbar(true);
    }
  };

  // Loader view (keeps your original fancy loader)
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
            Preparing your Sign form...
          </Typography>
        </motion.div>
      </Box>
    );
  }

  // === Redesigned layout that mirrors the uploaded design while preserving all logic ===
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f6fbff" }}>
      <Fade in timeout={800}>
        <Paper
          elevation={12}
          sx={{
            width: { xs: "105%", md: "1300px" },
            height: { xs: "auto", md: "700px" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          {/* Left - Form (kept logic intact) */}
          <Box
            sx={{
              flex: 1,
              background: "#ffffff",
              p: { xs: 4, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >


{/* Logo + Header */}
<Box sx={{ display: "flex", alignItems: "center", justifyContent: 'center', gap: { xs: 2, md: 2.5 }, mb: { xs: 3, md: 4 } }}>
  <img
    src="/assets/logo/logo1.png"
    alt="logo"
    style={{
      width: 60,            // smaller for tiny screens
      height: 60,
      borderRadius: 14,
      objectFit: "cover",
    }}
  />
</Box>

<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: { xs: 0.5, md: 1 }, mb: { xs: 2, md: 3 } }}>
  {/* Icon */}
  <Box
    sx={{
      width: { xs: 26, md: 36 },
      height: { xs: 26, md: 36 },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: "#0f1a65ff",
      borderRadius: "50%",
      color: "#fff",
      fontSize: { xs: 16, md: 24 },
    }}
  >
   👋 
  </Box>

  {/* Heading */}
  <Typography
    variant="h5"
    color="#0f172a"
    sx={{
      fontSize: { xs: 20, md: 34 },
      lineHeight: 1.2,
      fontWeight: 900,
    }}
  >
    Welcome Back
  </Typography>
</Box>

<Typography
  variant="body2"
  textAlign={'center'}
  color="#6b7280"
  mb={{ xs: 3, md: 5 }}
  sx={{ fontSize: { xs: 13, md: 17 }, lineHeight: 1.8 }}
>
  Please enter your details to continue
</Typography>

{/* Email */}
<TextField
  label="Email Address"
  name="email"
  variant="outlined"
  fullWidth
  value={formData.email}
  onChange={handleChange}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <EmailOutlinedIcon sx={{ color: "#4f46e5", fontSize: { xs: 18, md: 24 }, transition: "color 0.3s" }} />
      </InputAdornment>
    ),
  }}
  sx={{
    mb: { xs: 1.5, md: 2 },
    backgroundColor: "#f9fafb",
    borderRadius: 3,
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      "& fieldset": { borderColor: "#d1d5db" },
      "&:hover fieldset": { borderColor: "#4f46e5" },
      "&.Mui-focused fieldset": {
        borderColor: "#4f46e5",
        boxShadow: "0 6px 20px rgba(79, 70, 229, 0.2)",
      },
      transition: "all 0.3s ease",
    },
    input: { color: "#111827", fontSize: { xs: 13, md: 16 } },
    label: { color: "#6b7280", fontSize: { xs: 12, md: 14 } },
  }}
/>

{/* Password */}
<TextField
  label="Password"
  name="password"
  type={showPassword ? "text" : "password"}
  variant="outlined"
  fullWidth
  value={formData.password}
  onChange={handleChange}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <LockOutlinedIcon sx={{ color: "#4f46e5", fontSize: { xs: 18, md: 24 }, transition: "color 0.3s" }} />
      </InputAdornment>
    ),
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ p: { xs: 0.3, md: 0.5 } }}>
          {showPassword ? (
            <VisibilityOff sx={{ color: "#4f46e5", fontSize: { xs: 18, md: 24 }, transition: "color 0.3s" }} />
          ) : (
            <Visibility sx={{ color: "#4f46e5", fontSize: { xs: 18, md: 24 }, transition: "color 0.3s" }} />
          )}
        </IconButton>
      </InputAdornment>
    ),
  }}
  sx={{
    mb: { xs: 1.5, md: 2 },
    backgroundColor: "#f9fafb",
    borderRadius: 3,
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      "& fieldset": { borderColor: "#d1d5db" },
      "&:hover fieldset": { borderColor: "#4f46e5" },
      "&.Mui-focused fieldset": {
        borderColor: "#4f46e5",
        boxShadow: "0 6px 20px rgba(79, 70, 229, 0.2)",
      },
      transition: "all 0.3s ease",
    },
    input: { color: "#111827", fontSize: { xs: 13, md: 16 } },
    label: { color: "#6b7280", fontSize: { xs: 12, md: 14 } },
  }}
/>

{/* Remember + forgot */}
<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: { xs: 2, md: 3 },
  }}
>
  <FormControlLabel
    control={
      <Checkbox
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
        sx={{
          color: "#000",
          "&.Mui-checked": { color: "#2563eb" },
        }}
      />
    }
    label={<Typography sx={{ fontSize: { xs: 12, md: 14 }, color: "#000" }}>Remember me</Typography>}
  />

  <Typography
    sx={{
      color: "#0f1a65ff",
      cursor: "pointer",
      fontSize: { xs: 12, md: 14 },
      "&:hover": { textDecoration: "underline" },
    }}
    onClick={() => navigate("/forgot-password")}
  >
    Forgot password?
  </Typography>
</Box>
<Button
  fullWidth
  disabled={loading}
  onClick={handleLogin}
  sx={{
    py: { xs: 1, sm: 1.3, md: 1.5 }, // smaller height on mobile
    borderRadius: { xs: 2, sm: 2.5, md: 3 }, // slightly smaller on mobile
    background: "linear-gradient(90deg, #020b43ff 0%, #031265ff 100%)",
    color: "#fff",
    fontWeight: 700,
    fontSize: { xs: 13, sm: 14, md: 16 }, // smaller text on mobile
    mb: { xs: 2, sm: 2.5, md: 3 }, // responsive margin
    boxShadow: "0 4px 15px rgba(124, 58, 237, 0.3)", // keep shadow
    transition: "all 0.3s ease",
    "&:hover": {
      opacity: 1,
      background: "linear-gradient(90deg, #0f1a65ff 0%, #0f1a65ff 100%)",
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(124, 58, 237, 0.35)",
    },
    "&:disabled": {
      background: "#c4b5fd",
      color: "#fff",
      boxShadow: "none",
      cursor: "not-allowed",
    },
  }}
>
  {loading ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : "Login"}
</Button>


            <Typography sx={{ textAlign: "center", color: "#6b7280", mb: 2 }}>Or continue with</Typography>

        <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    gap: 3,
    mb: 3,
  }}
>
  <IconButton
    onClick={handleGoogleLogin}
    sx={{
      bgcolor: "#fff",
      borderRadius: 50,
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        bgcolor: "#f0f0f0",
      },
      width: 50,
      height: 50,
    }}
  >
    <GoogleIcon sx={{ color: "#DB4437", fontSize: 26 }} />
  </IconButton>

  <IconButton
    onClick={handleGitHubLogin}
    sx={{
      bgcolor: "#fff",
      borderRadius: 50,
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        bgcolor: "#f0f0f0",
      },
      width: 50,
      height: 50,
    }}
  >
    <GitHubIcon sx={{ color: "#24292F", fontSize: 26 }} />
  </IconButton>

  <IconButton
    sx={{
      bgcolor: "#fff",
      borderRadius: 50,
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        bgcolor: "#f0f0f0",
      },
      width: 50,
      height: 50,
    }}
  >
    <FacebookIcon sx={{ color: "#1877F2", fontSize: 26 }} />
  </IconButton>
</Box>


            <Typography sx={{ textAlign: "center", color: "#6b7280" }}>
              Don’t have an account?{" "}
              <span style={{ color: "#2563eb", cursor: "pointer" }} onClick={() => navigate("/register")}>
                Register
              </span>
            </Typography>
          </Box>

{/* ================= MODERN DARK DASHBOARD PREVIEW ================= */}

<Box
  sx={{
    flex: 1,
    display: { xs: "none", md: "block" },
    position: "relative",
    background: "linear-gradient(180deg, #0a0f25 0%, #191d34 100%)",
    p: 6,
    borderRadius: 4,
    overflow: "hidden",
    color: "#e6eef8",
  }}
>
  {/* Overlay gradients */}
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      background:
        "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.03), transparent 70%), radial-gradient(circle at 80% 80%, rgba(79,70,237,0.05), transparent 70%)",
      pointerEvents: "none",
      zIndex: 0,
    }}
  />

  {/* Background PNG with zoom animation */}
  <motion.div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `url("/assets/icons/robot.png")`,
      backgroundPosition: "center",
      backgroundSize: "contain",
      opacity: 0.1,
      zIndex: 1,
    }}
    animate={{ scale: [1, 1.08, 1] }}
    transition={{ duration: 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
  />

  {/* Floating abstract glows */}
  <Box
    sx={{
      position: "absolute",
      top: 60,
      left: 60,
      width: 160,
      height: 160,
      borderRadius: "50%",
      background: "rgba(124,58,237,0.15)",
      filter: "blur(80px)",
      zIndex: 1,
    }}
  />
  <Box
    sx={{
      position: "absolute",
      bottom: 50,
      right: 70,
      width: 220,
      height: 220,
      borderRadius: "50%",
      background: "rgba(59,130,246,0.1)",
      filter: "blur(100px)",
      zIndex: 1,
    }}
  />

  {/* Content */}
  <Box sx={{ position: "relative", zIndex: 2 }}>
<Typography
  variant="h4"
  fontWeight={900}
  sx={{ mb: 3, fontSize: { xs: 28, md: 36 } }}
>
  Dashboard
</Typography>

    <Typography
      variant="body1"
      sx={{ mb: 5, color: "rgba(230,238,248,0.75)", fontSize: { xs: 14, md: 16 } }}
    >
      Overview of your metrics and activity in real-time
    </Typography>

    {/* Stats Cards */}
    <Grid container spacing={3} sx={{ mb: 5 }}>
      {[
        { title: "Active Users", value: "1.2k" },
        { title: "Sales", value: "$18.4k" },
        { title: "Growth", value: "+8.9%" },
      ].map((item, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              backdropFilter: "blur(10px)",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              textAlign: "center",
              color: 'white',
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              },
            }}
          >
            <Typography fontSize={13} color="rgba(255,255,255,0.7)">
              {item.title}
            </Typography>
            <Typography fontWeight={700} fontSize={22}>
              {item.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>

    {/* Chart with hover motion */}
    <motion.div
      whileHover={{ scale: 1.05, rotate: 5 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{
        width: "100%",
        maxWidth: 520,
        height: 260,
        marginBottom: "2rem",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 15px 40px rgba(2,6,23,0.6)",
        cursor: "pointer",
      }}
    >
      <img
        src="/assets/icons/card.png"
        alt="dashboard chart"
        style={{
          width: "100%",
          height: "140%",
          objectFit: "cover",
          borderRadius: "16px",
        }}
      />
    </motion.div>

    {/* Decorative floating PNG with gentle motion */}
    <motion.div
      style={{
        position: "absolute",
        bottom: 100,
        right: 30,
        width: 300,
        height: 300,
        backgroundImage: `url("/assets/icons/robot.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        borderRadius: 4,
        opacity: 0.15,
      }}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
    />

    {/* Footer */}
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        p: 3,
        borderRadius: "0 0 16px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 3,
      }}
    >
  <Box
  sx={{
    width: "100%",
    p: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0 0 16px 16px",
  }}
>
  <Typography
    fontSize={14}
    color="rgba(230,238,248,0.65)"
    fontWeight={500}
    sx={{ textAlign: "center" }}
  >
    © 2025 PAK CRM. All rights reserved.
  </Typography>
</Box>

    </Box>
  </Box>
</Box>



</Paper>
</Fade>

{/*Voice Login Button */}
      <IconButton
        onClick={() => speak("Voice Enable")}
        sx={{
          position: "fixed",
          right: 20,
          bottom: 40,
          color: "#fff",
          backgroundColor: "#2563eb",
          "&:hover": { backgroundColor: "#1e40af" },
          zIndex: 1000,
        }}
      >
        <VolumeUpIcon fontSize="large" />
      </IconButton>

      {/* Snackbars */}
      <Snackbar open={openSnackbar} autoHideDuration={2500} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="error">
          Login failed. Try again!
        </Alert>
      </Snackbar>

      <Snackbar open={rememberError} autoHideDuration={2500} onClose={() => setRememberError(false)}>
        <Alert onClose={() => setRememberError(false)} severity="warning">
          Please check "Remember Me" before login!
        </Alert>
      </Snackbar>

      <Snackbar open={successSnackbar} autoHideDuration={1500} onClose={() => setSuccessSnackbar(false)}>
        <Alert onClose={() => setSuccessSnackbar(false)} severity="success">
          Login successful!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
