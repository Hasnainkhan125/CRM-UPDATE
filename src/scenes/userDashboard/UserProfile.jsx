import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Avatar, IconButton, Snackbar, Slide, Alert } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [user, setUser] = useState({ name: "", email: "", avatar: "" });
  const [preview, setPreview] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    setUser(storedUser);
    setPreview(storedUser.avatar || "");
  }, []);

  // Handle input change
  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  // Handle image upload
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
  

  // Save user to localStorage and show snackbar
const handleSave = () => {
  localStorage.setItem("currentUser", JSON.stringify(user));
  setSnackbarOpen(true);
  window.dispatchEvent(new Event("profileUpdated")); // ✅ Notify topbar to update avatar
};


  // Slide animation for Snackbar
  function SlideLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <Box sx={{ p: 6, maxWidth: 600, mx: "auto" }}>
      {/* Back Button */}
      <IconButton
        onClick={() => navigate(-1)}
        sx={{ mb: 3, color: "#7e22ce", bgcolor: "#f0f0f0", "&:hover": { bgcolor: "#e0d4f7" } }}
      >
        <ArrowBackIcon />
        <Typography ml={1}>Back</Typography>
      </IconButton>

      <Typography variant="h4" mb={3} fontWeight="bold" textAlign="center">
        Your Profile
      </Typography>

      {/* Avatar + Upload */}
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mb={4}>
        <Avatar
          src={preview || ""}
          sx={{ width: 120, height: 120, mb: 2, border: "2px solid #7e22ce" }}
        />
        <label htmlFor="avatar-upload">
          <input
            accept="image/*"
            id="avatar-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <Button variant="outlined" component="span" startIcon={<PhotoCamera />}>
            Upload Photo
          </Button>
        </label>
      </Box>

      {/* Name & Email */}
      <TextField
        label="Name"
        name="name"
        fullWidth
        sx={{ mb: 2 }}
        value={user.name}
        onChange={handleChange}
      />
      <TextField
        label="Email"
        name="email"
        fullWidth
        sx={{ mb: 2 }}
        value={user.email}
        onChange={handleChange}
      />

      {/* Save Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2, py: 1.5, fontSize: 16, fontWeight: "bold", background: "linear-gradient(90deg,#ff00cc,#3333ff)" }}
        onClick={handleSave}
      >
        Save Profile
      </Button>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
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
