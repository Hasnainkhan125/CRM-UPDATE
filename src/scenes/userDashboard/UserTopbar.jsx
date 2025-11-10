import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useNavigate } from "react-router-dom";

const UserTopbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notifCount] = useState(3);
  const [cartCount, setCartCount] = useState(0);
  const [cartDialogOpen, setCartDialogOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [hideBar, setHideBar] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );

  const navigate = useNavigate();

  // ✅ Update cart from localStorage
  const updateCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
    setCartItems(storedCart);
  };

  useEffect(() => {
    updateCart();
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  // ✅ Load and watch for profile avatar changes
  useEffect(() => {
    const updateAvatar = () => {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      if (user?.avatar) {
        setAvatarUrl(user.avatar);
      } else {
        setAvatarUrl("https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
      }
    };

    updateAvatar();

    // Watch for custom event when profile updates
    window.addEventListener("profileUpdated", updateAvatar);

    return () => window.removeEventListener("profileUpdated", updateAvatar);
  }, []);

  // ✅ Detect scroll direction for hiding topbar
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      setHideBar(window.scrollY > lastScrollY && window.scrollY > 100);
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Handlers
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleCartOpen = () => setCartDialogOpen(true);
  const handleCartClose = () => setCartDialogOpen(false);

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    setCartCount(updatedCart.length);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleClearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
    setCartCount(0);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <>
<Box
  sx={{
    position: "sticky",
    top: 0,
    zIndex: 1200,
    backdropFilter: "blur(12px)",
    background: darkMode ? "rgba(15, 15, 35, 0.95)" : "rgba(255,255,255,0.95)",
    color: darkMode ? "#fff" : "#222",
    borderBottom: darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid #eee",
    py: 1.5,
    px: { xs: 2, md: 6 },
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    transition: "all 0.4s ease",
    transform: hideBar ? "translateY(-100%)" : "translateY(0)",
  }}
>
  {/* LEFT: Logo + Nav Links */}
  <Box display="flex" alignItems="center" gap={4}>
    <Typography
      sx={{
        fontSize: 28,
        fontWeight: 900,
        background: "linear-gradient(90deg, #ff9900, #ffbf00)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        cursor: "pointer",
      }}
      onClick={() => navigate("/user-dashboard/home")}
    >
      ShopEase
    </Typography>
{/* Navigation Links */}
<Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
  <Button
    variant="text"
    sx={{ color: darkMode ? "#fff" : "#333", fontWeight: 600 }}
    onClick={() => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })}
  >
    Dashboard
  </Button>
  <Button
    variant="text"
    sx={{ color: darkMode ? "#fff" : "#333", fontWeight: 600 }}
    onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
  >
    About
  </Button>
  <Button
    variant="text"
    sx={{ color: darkMode ? "#fff" : "#333", fontWeight: 600 }}
    onClick={() => document.getElementById("feature")?.scrollIntoView({ behavior: "smooth" })}
  >
    Feature
  </Button>
  <Button
    variant="text"
    sx={{ color: darkMode ? "#fff" : "#333", fontWeight: 600 }}
    onClick={() => document.getElementById("merchants")?.scrollIntoView({ behavior: "smooth" })}
  >
    Merchants
  </Button>

    <Button
    variant="text"
    sx={{ color: darkMode ? "#fff" : "#333", fontWeight: 600 }}
    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
  >
    Contact
  </Button>
</Box>
</Box>

  {/* CENTER: Search */}
  <Box
    display="flex"
    alignItems="center"
    sx={{
      background: darkMode ? "rgba(255,255,255,0.1)" : "#f5f5f5",
      px: 2,
      py: 0.7,
      borderRadius: "25px",
      width: { xs: "40%", md: "30%" },
      "&:focus-within": { boxShadow: "0 0 0 2px #7e22ce" },
    }}
  >
    <SearchIcon sx={{ color: "#7e22ce", mr: 1 }} />
    <InputBase
      placeholder="Search for products..."
      sx={{ color: darkMode ? "#fff" : "#333", width: "100%" }}
    />
  </Box>

  {/* RIGHT: Icons */}
  <Box display="flex" alignItems="center" gap={2}>
    {/* Dark Mode Toggle */}
    <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
      <IconButton onClick={() => setDarkMode(!darkMode)} sx={{ color: darkMode ? "#FFD700" : "#333" }}>
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>

    {/* Notifications */}
    <Tooltip title="Notifications">
      <IconButton sx={{ color: darkMode ? "#FFD700" : "#333" }}>
        <Badge badgeContent={notifCount} color="error" overlap="circular">
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>
    </Tooltip>

    {/* Cart */}
    <Tooltip title="Cart">
      <IconButton sx={{ color: darkMode ? "#FFD700" : "#333" }} onClick={handleCartOpen}>
        <Badge badgeContent={cartCount} color="secondary" overlap="circular">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Tooltip>

    {/* Account */}
    <Tooltip title="Account">
      <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
        <Avatar
          alt="User Avatar"
          src={avatarUrl}
          sx={{ width: 40, height: 40, border: "2px solid #7e22ce", cursor: "pointer" }}
        />
      </IconButton>
    </Tooltip>

    {/* Account Menu */}
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} PaperProps={{ sx: { mt: 1, borderRadius: "12px" } }}>
      <MenuItem onClick={() => { handleMenuClose(); navigate("/user-dashboard/profile"); }}>Profile</MenuItem>
      <MenuItem onClick={() => { handleMenuClose(); navigate("/user-dashboard"); }}>Home</MenuItem>
      <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
      <MenuItem onClick={() => { localStorage.removeItem("loggedIn"); localStorage.removeItem("currentUser"); navigate("/login"); }}>Logout</MenuItem>
    </Menu>
  </Box>
</Box>


      {/* ✅ Cart Dialog */}
      <Dialog open={cartDialogOpen} onClose={handleCartClose} fullWidth maxWidth="sm">
        <DialogTitle>Your Cart</DialogTitle>
        <DialogContent>
          {cartItems.length === 0 ? (
            <Typography>No items in your cart.</Typography>
          ) : (
            <>
              <List>
                {cartItems.map((item) => (
                  <div key={item.id}>
                    <ListItem
                      secondaryAction={
                        <Button color="error" onClick={() => handleRemoveItem(item.id)}>
                          Remove
                        </Button>
                      }
                    >
                      <ListItemText
                        primary={item.name}
                        secondary={`$${item.price.toFixed(2)}`}
                      />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Total: ${cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClearCart} color="error">
            Clear Cart
          </Button>
          <Button
            onClick={() => {
              handleCartClose();
              navigate("/user-dashboard/checkout");
            }}
            variant="contained"
          >
            Proceed to Checkout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserTopbar;
