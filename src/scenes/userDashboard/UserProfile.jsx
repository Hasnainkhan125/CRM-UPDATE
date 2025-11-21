import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  CircularProgress,
  Snackbar,
  Slide,
  Alert,
  InputAdornment,
  Icon,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    bio: "",
    avatar: "",
  });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    setUser(storedUser);
    setPreview(storedUser.avatar || "");
  }, []);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setUser({ ...user, avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.dispatchEvent(new Event("profileUpdated"));
      setLoading(false);
      setSnackbarOpen(true);
      setTimeout(() => navigate("/user-dashboard"), 1000); // Redirect after save
    }, 1500);
  };

  function SlideLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 500,
        mx: "auto",
        mt: 3,
        p: 4,
        bgcolor: "#fff",
        borderRadius: 4,
        boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* Floating Avatar */}
      <Box
        sx={{
          position: "absolute",
          top: -20,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Avatar
          src={preview || ""}
          sx={{
            width: 100,
            height: 100,
            border: "4px solid #7e22ce",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          }}
        />
      </Box>

      {/* Back Button */}
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          alignSelf: "flex-start",
          color: "#7e22ce",
          "&:hover": { bgcolor: "#f3e8ff" },
          mt: 1,
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Typography variant="h5" fontWeight="bold" textAlign="center" mt={1}>
        Edit Profile
      </Typography>

      {/* Upload Button */}
      <Box display="flex" justifyContent="center" mb={2}>
        <label htmlFor="avatar-upload">
          <input
            accept="image/*"
            id="avatar-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <Button
            variant="contained"
            component="span"
            startIcon={<PhotoCamera />}
            sx={{
              textTransform: "none",
              borderRadius: 3,
              background: "linear-gradient(90deg,#7e22ce,#d946ef)",
              "&:hover": { opacity: 0.85 },
            }}
          >
            Change Avatar
          </Button>
        </label>
      </Box>

      {/* Input Fields */}
      <TextField label="Name" name="name" fullWidth value={user.name} onChange={handleChange} />
      <TextField label="Email" name="email" fullWidth value={user.email} onChange={handleChange} />
      <TextField label="Phone" name="phone" fullWidth value={user.phone} onChange={handleChange} />
      <TextField label="Address" name="address" fullWidth value={user.address} onChange={handleChange} />
      <TextField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        fullWidth
        value={user.password}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Bio"
        name="bio"
        fullWidth
        multiline
        rows={3}
        value={user.bio}
        onChange={handleChange}
      />

      {/* Save Button */}
      <Button
        variant="contained"
        fullWidth
        onClick={handleSave}
        disabled={loading}
        sx={{
          py: 1.2,
          mt: 1,
          fontWeight: "bold",
          fontSize: 16,
          borderRadius: 3,
          background: "linear-gradient(90deg,#7e22ce,#d946ef)",
          "&:hover": { opacity: 0.9 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Save Profile"}
      </Button>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        TransitionComponent={SlideLeft}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          ✅ Profile updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserProfile;
