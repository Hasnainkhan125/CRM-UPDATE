import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  Menu,
  MenuItem,
  ListItemText,
  Badge,
  Paper,
  Modal,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText as MuiListItemText,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

const UserDashboardShop = () => {
  const [searchValue, setSearchValue] = useState("");
  const [anchorElSettings, setAnchorElSettings] = useState(null);
  const [anchorElNotif, setAnchorElNotif] = useState(null);
  const [anchorElInbox, setAnchorElInbox] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInEmail");
    navigate("/login");
  };

  const openMenu = (setter) => (e) => setter(e.currentTarget);
  const closeMenu = (setter) => () => setter(null);

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSearch = (e) => setSearchValue(e.target.value);

  const handleOpenCheckout = () => setCheckoutOpen(true);
  const handleCloseCheckout = () => setCheckoutOpen(false);

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Smartwatch",
      price: 149.99,
      img: "https://images.unsplash.com/photo-1606813903131-df2d2ff33e21?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Gaming Mouse",
      price: 59.99,
      img: "https://images.unsplash.com/photo-1587202372775-6179e1c61f31?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      name: "Mechanical Keyboard",
      price: 89.99,
      img: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 5,
      name: "Laptop Stand",
      price: 39.99,
      img: "https://images.unsplash.com/photo-1585079540219-d4b947b4e1b0?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 6,
      name: "Bluetooth Speaker",
      price: 79.99,
      img: "https://images.unsplash.com/photo-1585386959984-a415522b8f2b?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 7,
      name: "Smart Glasses",
      price: 129.99,
      img: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 8,
      name: "Drone Mini",
      price: 199.99,
      img: "https://images.unsplash.com/photo-1581091870622-d1f92d59aa4f?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  return (
    <Box sx={{ bgcolor: "#010018", minHeight: "100vh", color: "#fff" }}>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          bgcolor: "#0f0229",
          boxShadow: 3,
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: 24, fontWeight: 800, color: "#a78bfa" }}>
          🛍️ PAK Shopping
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
          <TextField
            placeholder="Search products..."
            size="small"
            value={searchValue}
            onChange={handleSearch}
            sx={{
              bgcolor: "#1b063d",
              borderRadius: 5,
              input: { color: "#fff" },
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              width: { xs: "100%", sm: 250 },
            }}
          />

          <IconButton color="inherit" onClick={openMenu(setAnchorElSettings)}>
            <SettingsIcon />
          </IconButton>
          <Menu anchorEl={anchorElSettings} open={Boolean(anchorElSettings)} onClose={closeMenu(setAnchorElSettings)}>
            <MenuItem>Account Settings</MenuItem>
            <MenuItem>Dark Mode</MenuItem>
          </Menu>

          <IconButton color="inherit" onClick={openMenu(setAnchorElInbox)}>
            <MailOutlineIcon />
          </IconButton>
          <Menu anchorEl={anchorElInbox} open={Boolean(anchorElInbox)} onClose={closeMenu(setAnchorElInbox)}>
            <MenuItem>
              <ListItemText primary="New Offer Available!" secondary="2h ago" />
            </MenuItem>
          </Menu>

          <IconButton color="inherit" onClick={openMenu(setAnchorElNotif)}>
            <NotificationsNoneIcon />
          </IconButton>
          <Menu anchorEl={anchorElNotif} open={Boolean(anchorElNotif)} onClose={closeMenu(setAnchorElNotif)}>
            <MenuItem>
              <ListItemText primary="Price drop on Smartwatch!" secondary="1h ago" />
            </MenuItem>
          </Menu>

          <IconButton color="inherit" onClick={handleOpenCheckout}>
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <Button variant="contained" color="error" startIcon={<LogoutIcon />} onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* PRODUCT GRID */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Paper
                sx={{
                  bgcolor: "#12063a",
                  borderRadius: 3,
                  overflow: "hidden",
                  p: 2,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                }}
              >
                <Box
                  component="img"
                  src={product.img}
                  alt={product.name}
                  sx={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 2, mb: 2 }}
                />
                <Typography sx={{ fontWeight: 700, fontSize: 18 }}>{product.name}</Typography>
                <Typography sx={{ color: "#a3a3a3", mb: 2 }}>${product.price.toFixed(2)}</Typography>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleAddToCart(product)}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    background: "linear-gradient(90deg, #7c3aed 0%, #a78bfa 100%)",
                    "&:hover": { background: "linear-gradient(90deg, #a78bfa 0%, #7c3aed 100%)" },
                  }}
                >
                  Add to Cart
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* CHECKOUT MODAL */}
      <Modal open={checkoutOpen} onClose={handleCloseCheckout}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 500 },
            bgcolor: "#12063a",
            color: "#fff",
            borderRadius: 3,
            p: 3,
          }}
        >
          <Typography variant="h6" mb={2}>
            Your Order
          </Typography>
          <List sx={{ maxHeight: 300, overflow: "auto" }}>
            {cartItems.map((item) => (
              <ListItem key={item.id} secondaryAction={
                <Button color="error" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
              }>
                <ListItemAvatar>
                  <Avatar src={item.img} />
                </ListItemAvatar>
                <MuiListItemText primary={item.name} secondary={`$${item.price}`} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2, bgcolor: "#555" }} />
          <Typography>Total: ${totalPrice}</Typography>
          <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleCloseCheckout}>
            Place Order
          </Button>
        </Box>
      </Modal>

      {/* FOOTER */}
      <Box sx={{ bgcolor: "#0f0229", mt: 6, p: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography sx={{ fontSize: 14 }}>
              PAK Shopping is your one-stop online store for electronics, fashion, home essentials and more.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            <Typography sx={{ fontSize: 14 }}>Electronics</Typography>
            <Typography sx={{ fontSize: 14 }}>Fashion</Typography>
            <Typography sx={{ fontSize: 14 }}>Home & Kitchen</Typography>
            <Typography sx={{ fontSize: 14 }}>Sports & Fitness</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Customer Service
            </Typography>
            <Typography sx={{ fontSize: 14 }}>Contact Us</Typography>
            <Typography sx={{ fontSize: 14 }}>FAQ</Typography>
            <Typography sx={{ fontSize: 14 }}>Return Policy</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3, bgcolor: "#555" }} />
        <Typography sx={{ textAlign: "center", fontSize: 12 }}>
          © 2025 PAK Shopping. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default UserDashboardShop;
