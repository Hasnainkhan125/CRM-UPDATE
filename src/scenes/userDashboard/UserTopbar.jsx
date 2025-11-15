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
  Paper,
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
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [shopMenuAnchor, setShopMenuAnchor] = useState(null);

  const shopMenuOpen = Boolean(shopMenuAnchor);
  const navigate = useNavigate();

  // Product list for demo search
  const productsList = [
    { id: 1, name: "Apple iPhone 15" },
    { id: 2, name: "Samsung Galaxy S23" },
    { id: 3, name: "MacBook Pro 16" },
    { id: 4, name: "Sony Headphones" },
    { id: 5, name: "Nintendo Switch" },
  ];

  const filteredProducts = productsList.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  // ✅ Avatar update
  useEffect(() => {
    const updateAvatar = () => {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      setAvatarUrl(
        user?.avatar ||
          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      );
    };
    updateAvatar();
    window.addEventListener("profileUpdated", updateAvatar);
    return () => window.removeEventListener("profileUpdated", updateAvatar);
  }, []);

  // ✅ Hide topbar on scroll down
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
      {/* ✅ Topbar */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1300,
          backdropFilter: "blur(16px)",
          background: darkMode
            ? "rgba(15,15,25,0.85)"
            : "rgba(255,255,255,0.8)",
          color: darkMode ? "#fff" : "#111",
          py: 1.5,
          px: { xs: 2, md: 6 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: darkMode
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 6px 25px rgba(0,0,0,0.08)",
          transition: "all 0.4s ease",
          transform: hideBar ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        {/* LEFT SECTION: Logo & Links */}
        <Box display="flex" alignItems="center" gap={4}>
          <Box
            component="img"
            src="/assets/logo/logo1.png"
            alt="ShopEase Logo"
            onClick={() => navigate("/user-dashboard/home")}
            sx={{
              height: 45,
              cursor: "pointer",
              transition: "transform 0.2s ease",
              "&:hover": { transform: "scale(1.08)" },
            }}
          />

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {[
              { label: "Dashboard", id: "dashboard" },
              { label: "About", id: "about" },
              { label: "Feature", id: "feature" },
              { label: "Merchants", id: "merchants" },
              {
                label: "Shop",
                id: "shop",
                subLinks: ["Pants", "Shirts", "Glasses", "Shoes"],
              },
              { label: "Contact", id: "contact" },
            ].map((link) => {
              if (link.subLinks) {
                return (
                  <Box key={link.id} sx={{ position: "relative" }}>
                    <Button
                      variant="text"
                      onClick={(e) => setShopMenuAnchor(e.currentTarget)}
                      sx={{
                        color: darkMode ? "#fff" : "#222",
                        fontWeight: 600,
                        textTransform: "none",
                        fontSize: "0.95rem",
                        "&:hover": { color: "#ff9500" },
                      }}
                    >
                      {link.label}
                    </Button>

                    <Menu
                      anchorEl={shopMenuAnchor}
                      open={shopMenuOpen}
                      onClose={() => setShopMenuAnchor(null)}
                      MenuListProps={{
                        onMouseLeave: () => setShopMenuAnchor(null),
                      }}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      {link.subLinks.map((sub) => (
                        <MenuItem
                          key={sub}
                          onClick={() => {
                            setShopMenuAnchor(null);
                            console.log(`Clicked ${sub}`);
                          }}
                        >
                          {sub}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                );
              }

              return (
                <Button
                  key={link.id}
                  variant="text"
                  onClick={() =>
                    document
                      .getElementById(link.id)
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  sx={{
                    color: darkMode ? "#fff" : "#333",
                    textTransform: "none",
                    fontSize: "0.95rem",
                    position: "relative",
                    "&:hover": {
                      color: "#ff9500",
                      "&::after": { width: "100%" },
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: 0,
                      height: "2px",
                      bgcolor: "#ff9500",
                      transition: "width 0.3s ease",
                    },
                  }}
                >
                  {link.label}
                </Button>
              );
            })}
          </Box>
        </Box>

        {/* CENTER: Search */}
        <Box sx={{ position: "relative", width: { xs: "55%", md: "30%" } }}>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              background: darkMode ? "rgba(255,255,255,0.08)" : "#f5f5f5",
              px: 2,
              py: 0.7,
              borderRadius: "25px",
              "&:focus-within": { boxShadow: "0 0 0 2px #7e22ce" },
            }}
          >
            <SearchIcon sx={{ color: "#7e22ce", mr: 1 }} />
            <InputBase
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const featureSection = document.getElementById("feature");
                  if (featureSection) {
                    featureSection.scrollIntoView({ behavior: "smooth" });
                    setShowSuggestions(false);
                  }
                }
              }}
              sx={{ color: darkMode ? "#fff" : "#222", width: "100%" }}
            />
          </Box>

          {showSuggestions && searchQuery && (
            <Paper
              elevation={6}
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                mt: 1,
                maxHeight: 250,
                overflowY: "auto",
                borderRadius: 2,
                bgcolor: darkMode ? "#222" : "#fff",
                zIndex: 1500,
                borderTop: "3px solid #d32f2f",
              }}
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Box
                    key={product.id}
                    sx={{
                      px: 2,
                      py: 1,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: darkMode
                          ? "rgba(255,255,255,0.1)"
                          : "#f0f0f0",
                      },
                    }}
                    onClick={() => {
                      setSearchQuery(product.name);
                      setShowSuggestions(false);
                    }}
                  >
                    {product.name}
                  </Box>
                ))
              ) : (
                <Box sx={{ px: 2, py: 1, color: "#777" }}>
                  No products found.
                </Box>
              )}
            </Paper>
          )}
        </Box>

        {/* RIGHT SECTION: Icons */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* Dark Mode */}
          <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
            <IconButton
              onClick={() => setDarkMode(!darkMode)}
              sx={{ color: darkMode ? "#FFD700" : "#333" }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton sx={{ color: darkMode ? "#FFD700" : "#333" }}>
              <Badge badgeContent={notifCount} color="error">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Cart */}
          <Tooltip title="Cart">
            <IconButton
              sx={{ color: darkMode ? "#FFD700" : "#333" }}
              onClick={handleCartOpen}
            >
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Profile Avatar */}
          <Tooltip title="Account">
            <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
              <Avatar
                alt="User Avatar"
                src={avatarUrl}
                sx={{
                  width: 40,
                  height: 40,
                  border: "2px solid #7e22ce",
                }}
              />
            </IconButton>
          </Tooltip>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{ sx: { mt: 1, borderRadius: 3 } }}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate("/user-dashboard/profile");
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate("/user-dashboard");
              }}
            >
              Home
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem
              onClick={() => {
                localStorage.removeItem("loggedIn");
                localStorage.removeItem("currentUser");
                navigate("/login");
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* CART DIALOG */}
      <Dialog
        open={cartDialogOpen}
        onClose={handleCartClose}
        fullWidth
        maxWidth="sm"
      >
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
                        <Button
                          color="error"
                          onClick={() => handleRemoveItem(item.id)}
                        >
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
                Total: $
                {cartItems
                  .reduce((sum, item) => sum + item.price, 0)
                  .toFixed(2)}
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
            Checkout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserTopbar;
