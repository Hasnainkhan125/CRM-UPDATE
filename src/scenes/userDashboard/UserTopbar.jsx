import React, { useState } from "react";
import {
  Box,
  Typography,
  InputBase,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const UserTopbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notifCount] = useState(2);
  const [cartCount] = useState(3);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1200,
        backdropFilter: "blur(10px)",
        background: darkMode
          ? "rgba(15, 15, 35, 0.95)"
          : "rgba(255,255,255,0.95)",
        color: darkMode ? "#fff" : "#222",
        borderBottom: darkMode
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid #eee",
        py: 1.5,
        px: { xs: 2, md: 6 },
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* 🛒 LEFT SIDE — LOGO + LINKS */}
      <Box display="flex" alignItems="center" gap={3}>
        {/* Logo */}
        <Typography
          sx={{
            fontSize: 26,
            fontWeight: 800,
            background: "linear-gradient(90deg, #ff00cc, #3333ff)",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            cursor: "pointer",
          }}
          onClick={() => (window.location.href = "/user-dashboard")}
        >
          ShopEase
        </Typography>

        {/* Nav Links */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 3,
            fontSize: 15,
            fontWeight: 500,
            opacity: 0.9,
            cursor: "pointer",
          }}
        >
          {["Home", "Shop", "Deals", "Categories", "Contact"].map((link) => (
            <Typography
              key={link}
              sx={{
                position: "relative",
                "&:hover": {
                  color: "#7e22ce",
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -4,
                  left: 0,
                  width: 0,
                  height: "2px",
                  background: "#7e22ce",
                  transition: "width 0.3s",
                },
                "&:hover::after": {
                  width: "100%",
                },
              }}
            >
              {link}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* 🔍 CENTER — SEARCH BAR */}
      <Box
        display="flex"
        alignItems="center"
        sx={{
          background: darkMode ? "rgba(255,255,255,0.1)" : "#f5f5f5",
          px: 2,
          py: 0.7,
          borderRadius: "25px",
          width: { xs: "40%", md: "30%" },
          transition: "all 0.3s ease",
          "&:focus-within": {
            boxShadow: "0 0 0 2px #7e22ce",
          },
        }}
      >
        <SearchIcon sx={{ color: "#7e22ce", mr: 1 }} />
        <InputBase
          placeholder="Search for products..."
          sx={{
            color: darkMode ? "#fff" : "#333",
            width: "100%",
            fontSize: "0.95rem",
          }}
        />
      </Box>

      {/* 🌗 RIGHT SIDE — ICONS */}
      <Box display="flex" alignItems="center" gap={2}>
        {/* Dark / Light Mode */}
        <Tooltip
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            sx={{
              color: darkMode ? "#FFD700" : "#333",
              "&:hover": { transform: "rotate(20deg)" },
              transition: "0.3s ease",
            }}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>

        {/* Notifications */}
        <Tooltip title="Notifications">
          <IconButton sx={{ color: darkMode ? "#FFD700" : "#333" }}>
            <Badge
              badgeContent={notifCount}
              color="error"
              overlap="circular"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "0.7rem",
                  fontWeight: 600,
                },
              }}
            >
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Cart */}
        <Tooltip title="View Cart">
          <IconButton sx={{ color: darkMode ? "#FFD700" : "#333" }}>
            <Badge
              badgeContent={cartCount}
              color="secondary"
              overlap="circular"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "0.7rem",
                  fontWeight: 600,
                },
              }}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Avatar Dropdown */}
        <Tooltip title="Account">
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar
              alt="User Avatar"
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              sx={{
                width: 40,
                height: 40,
                border: "2px solid #7e22ce",
                cursor: "pointer",
              }}
            />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: "12px",
              backgroundColor: darkMode ? "#1a1a2e" : "#fff",
              color: darkMode ? "#fff" : "#333",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.25)",
            },
          }}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Orders</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.removeItem("loggedIn");
              localStorage.removeItem("currentUser");
              window.location.href = "/login";
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default UserTopbar;
