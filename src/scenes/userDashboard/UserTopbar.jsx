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
  Drawer,
  Collapse,
} from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  NotificationsNone as NotificationsNoneIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Menu as MenuIcon,
  Close as CloseIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
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
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [shopCollapseOpen, setShopCollapseOpen] = useState(false);

  const shopMenuOpen = Boolean(shopMenuAnchor);
  const navigate = useNavigate();

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

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      setHideBar(window.scrollY > lastScrollY && window.scrollY > 100);
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const links = [
    { label: "Dashboard", id: "dashboard" },
    { label: "About", id: "about" },
    { label: "Feature", id: "feature" },
    { label: "Merchants", id: "merchants" },
    { label: "Shop", id: "shop", subLinks: ["Pants", "Shirts", "Glasses", "Shoes"] },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      {/* ===== Topbar ===== */}
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
          py: { xs: 1, sm: 1.5 },
          px: { xs: 1.5, sm: 3, md: 6 },
          display: mobileDrawerOpen ? "none" : "flex", // Hide topbar when drawer open
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
        {/* LEFT: Logo + Hamburger for mobile */}
        <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }}>
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, p: 0.5 }}
            onClick={() => setMobileDrawerOpen(true)}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box
            component="img"
            src="/assets/logo/logo1.png"
            alt="ShopEase Logo"
            onClick={() => navigate("/user-dashboard/home")}
            sx={{
              height: { xs: 30, sm: 40, md: 45 },
              cursor: "pointer",
              "&:hover": { transform: "scale(1.05)" },
              transition: "0.2s",
            }}
          />
          {/* Desktop links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {links.map((link) =>
              link.subLinks ? (
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
                    MenuListProps={{ onMouseLeave: () => setShopMenuAnchor(null) }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
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
              ) : (
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
                    "&:hover": { color: "#ff9500" },
                  }}
                >
                  {link.label}
                </Button>
              )
            )}
          </Box>
        </Box>

        {/* CENTER: Search */}
        <Box sx={{ position: "relative", width: { xs: "35%", sm: "50%", md: "30%" } }}>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              background: darkMode ? "rgba(255,255,255,0.08)" : "#f5f5f5",
              px: { xs: 1, sm: 2 },
              py: { xs: 0.4, sm: 0.7 },
              borderRadius: "25px",
            }}
          >
            <SearchIcon sx={{ color: "#7e22ce", mr: 1, fontSize: { xs: 18, sm: 20 } }} />
            <InputBase
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              sx={{
                color: darkMode ? "#fff" : "#222",
                width: "100%",
                fontSize: { xs: 12, sm: 14 },
              }}
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
                maxHeight: 200,
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
                      fontSize: { xs: 12, sm: 14 },
                      "&:hover": { backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "#f0f0f0" },
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
                <Box sx={{ px: 2, py: 1, color: "#777", fontSize: { xs: 12, sm: 14 } }}>
                  No products found.
                </Box>
              )}
            </Paper>
          )}
        </Box>

        {/* RIGHT: Icons */}
        <Box display="flex" alignItems="center" gap={{ xs: 0.5, sm: 1.5 }}>
          <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
            <IconButton onClick={() => setDarkMode(!darkMode)} sx={{ color: darkMode ? "#ffffffff" : "#333", p: { xs: 0.3, sm: 0.5 } }}>
              {darkMode ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton sx={{ color: darkMode ? "#9e9e9eff" : "#333", p: { xs: 0.3, sm: 0.5 } }}>
                <NotificationsNoneIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Cart">
            <IconButton sx={{ color: darkMode ? "#03d8feff" : "#333", p: { xs: 0.3, sm: 0.5 } }} onClick={handleCartOpen}>
              <Badge badgeContent={cartCount} color="secondary" sx={{ "& .MuiBadge-badge": { fontSize: { xs: 9, sm: 11 } } }}>
                <ShoppingCartIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Account">
            <IconButton onClick={handleMenuOpen} sx={{ p: { xs: 0.3, sm: 0.5 } }}>
              <Avatar alt="User Avatar" src={avatarUrl} sx={{ width: { xs: 30, sm: 36, md: 40 }, height: { xs: 30, sm: 36, md: 40 }, border: "2px solid #fcd305ff" }} />
            </IconButton>
          </Tooltip>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} PaperProps={{ sx: { mt: 1, borderRadius: 3 } }}>
            <MenuItem onClick={() => { handleMenuClose(); navigate("/user-dashboard/profile"); }}>Profile</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); navigate("/user-dashboard"); }}>Home</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={() => { localStorage.removeItem("loggedIn"); localStorage.removeItem("currentUser"); navigate("/login"); }}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>
{/* ===== Mobile Drawer ===== */}
<Drawer
  anchor="left"
  open={mobileDrawerOpen}
  onClose={() => setMobileDrawerOpen(false)}
  PaperProps={{
    sx: {
      width: 250,
      bgcolor: "#f5f5f5", // light gray background
      color: "#000000", // black text
    },
  }}
  BackdropProps={{
    sx: {
      backdropFilter: "blur(8px)", // blur background when drawer open
      backgroundColor: "rgba(0,0,0,0.2)", // slightly dark overlay
    },
  }}
>
  <Box sx={{ p: 2 }}>
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      {/* Logo */}
      <Box
        component="img"
        src="/assets/logo/logo1.png" // replace with your logo path
        alt="ShopEase Logo"
        sx={{ height: 40, cursor: "pointer" }}
        onClick={() => {
          navigate("/user-dashboard/home");
          setMobileDrawerOpen(false);
        }}
      />

      <IconButton onClick={() => setMobileDrawerOpen(false)} sx={{ color: "#000" }}>
        <CloseIcon />
      </IconButton>
    </Box>

    <List>
      {links.map((link) => (
        <Box key={link.id}>
          {link.subLinks ? (
            <>
              <ListItem button onClick={() => setShopCollapseOpen(!shopCollapseOpen)}>
                <ListItemText primary={link.label} />
                {shopCollapseOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={shopCollapseOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {link.subLinks.map((sub) => (
                    <ListItem
                      button
                      key={sub}
                      sx={{ pl: 4 }}
                      onClick={() => {
                        console.log(sub);
                        setMobileDrawerOpen(false);
                      }}
                    >
                      <ListItemText primary={sub} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </>
          ) : (
            <ListItem
              button
              onClick={() => {
                document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
                setMobileDrawerOpen(false);
              }}
            >
              <ListItemText primary={link.label} />
            </ListItem>
          )}
        </Box>
      ))}
    </List>
  </Box>
</Drawer>


      {/* ===== Cart Dialog ===== */}
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
                      secondaryAction={<Button color="error" onClick={() => handleRemoveItem(item.id)}>Remove</Button>}
                    >
                      <ListItemText primary={item.name} secondary={`$${item.price.toFixed(2)}`} />
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
          <Button onClick={handleClearCart} color="error">Clear Cart</Button>
          <Button onClick={() => { handleCartClose(); navigate("/user-dashboard/checkout"); }} variant="contained">
            Checkout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserTopbar;
