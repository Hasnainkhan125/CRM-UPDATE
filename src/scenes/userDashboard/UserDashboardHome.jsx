import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Slide,
  Alert,
  Grid,
  Modal,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText as MuiListItemText,
  Divider,
  Paper,
  Badge,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useNavigate } from "react-router-dom";

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Required"),
  price: yup.number().required("Required"),
  img: yup.string().nullable(),
});

const initialValues = {
  name: "",
  price: "",
  img: "",
};

const UserDashboardShop = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [showShop, setShowShop] = useState(false);

  const [anchorElSettings, setAnchorElSettings] = useState(null);
  const [anchorElNotif, setAnchorElNotif] = useState(null);
  const [anchorElInbox, setAnchorElInbox] = useState(null);

  const [newProduct, setNewProduct] = useState(initialValues);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!storedUser) navigate("/login");
    else setCurrentUser(storedUser);

    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, [navigate]);

  const openMenu = (setter) => (e) => setter(e.currentTarget);
  const closeMenu = (setter) => () => setter(null);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleAddToCart = (product) =>
    setCartItems((prev) => [...prev, product]);
  const handleRemoveFromCart = (id) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  const handleOpenCheckout = () => setCheckoutOpen(true);
  const handleCloseCheckout = () => setCheckoutOpen(false);

  const handleAddProductSubmit = (values, { resetForm }) => {
    setLoading(true);
    setTimeout(() => {
      const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
      const newEntry = {
        id: storedProducts.length + 1,
        name: values.name,
        price: parseFloat(values.price),
        img: values.img,
      };
      const updatedProducts = [...storedProducts, newEntry];
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      resetForm();
      setLoading(false);
      setAddSuccess(true);
      setAddProductOpen(false);
    }, 1000);
  };

  function SlideUp(props) {
    return <Slide {...props} direction="up" />;
  }

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price, 0)
    .toFixed(2);

  if (!currentUser) return null;

  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh", color: "#000" }}>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          background: "#ffffffaa",
          backdropFilter: "blur(10px)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Typography sx={{ fontSize: 26, fontWeight: 800, color: "#7e22ce" }}>
          🛍️ Hello, {currentUser.displayName || currentUser.name || "User"}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={openMenu(setAnchorElSettings)}>
            <SettingsIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElSettings}
            open={Boolean(anchorElSettings)}
            onClose={closeMenu(setAnchorElSettings)}
          >
            <MenuItem>Account Settings</MenuItem>
            <MenuItem>Dark Mode</MenuItem>
          </Menu>

          <IconButton onClick={openMenu(setAnchorElInbox)}>
            <MailOutlineIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElInbox}
            open={Boolean(anchorElInbox)}
            onClose={closeMenu(setAnchorElInbox)}
          >
            <MenuItem>New Offer! (2h ago)</MenuItem>
          </Menu>

          <IconButton onClick={openMenu(setAnchorElNotif)}>
            <NotificationsNoneIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNotif}
            open={Boolean(anchorElNotif)}
            onClose={closeMenu(setAnchorElNotif)}
          >
            <MenuItem>Discount Alert! (1h ago)</MenuItem>
          </Menu>

          <IconButton onClick={handleOpenCheckout}>
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Logout
          </Button>
        </Box>
      </Box>

{/* HERO SECTION */}
{!showShop && (
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      alignItems: "center",
      justifyContent: "space-between",
      px: { xs: 4, md: 12 },
      py: { xs: 8, md: 12 },
      background: "linear-gradient(120deg, #7e22ce 0%, #ec4899 100%)",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Animated Gradient Layers */}
    <Box
      sx={{
        position: "absolute",
        top: -100,
        left: -100,
        width: 400,
        height: 400,
        background: "radial-gradient(circle at center, rgba(255,255,255,0.2), transparent 70%)",
        borderRadius: "50%",
        animation: "float1 6s ease-in-out infinite alternate",
        "@keyframes float1": {
          "0%": { transform: "translate(0,0)" },
          "100%": { transform: "translate(20px, 40px)" },
        },
      }}
    />
    <Box
      sx={{
        position: "absolute",
        bottom: -120,
        right: -150,
        width: 600,
        height: 300,
        background: "rgba(255,255,255,0.15)",
        borderRadius: "50%",
        transform: "rotate(-10deg)",
        animation: "float2 8s ease-in-out infinite alternate",
        "@keyframes float2": {
          "0%": { transform: "rotate(-10deg) translateY(0px)" },
          "100%": { transform: "rotate(-10deg) translateY(-30px)" },
        },
      }}
    />

    {/* Floating Discount Badge */}
    <Box
      sx={{
        position: "absolute",
        top: 50,
        right: 80,
        background: "#fff",
        color: "#7e22ce",
        fontWeight: 800,
        fontSize: 18,
        px: 3,
        py: 1,
        borderRadius: "50px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        transform: "rotate(10deg)",
        zIndex: 3,
      }}
    >
      🎉 50% OFF Today
    </Box>

    {/* Text Section */}
    <Box sx={{ maxWidth: 520, zIndex: 2 }}>
      <Typography
        sx={{
          fontSize: { xs: 30, md: 48 },
          fontWeight: 800,
          lineHeight: 1.2,
          mb: 3,
          letterSpacing: "0.5px",
        }}
      >
        Shop instantly, <br /> earn rewards & save big 🎁
      </Typography>

      <Typography
        sx={{
          fontSize: 18,
          mb: 4,
          opacity: 0.9,
          maxWidth: 460,
        }}
      >
        Discover exclusive collections, earn loyalty points on every order, and
        enjoy instant cashback. Shopping just got more rewarding!
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Button
          variant="contained"
          onClick={() => setShowShop(true)}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: 18,
            fontWeight: "bold",
            borderRadius: 3,
            textTransform: "none",
            background: "linear-gradient(90deg, #ff00cc, #3333ff)",
            "&:hover": {
              opacity: 0.9,
              transform: "translateY(-2px)",
              transition: "all 0.2s",
            },
          }}
        >
          Start Shopping
        </Button>
        <Button
          variant="outlined"
          sx={{
            px: 4,
            py: 1.5,
            fontSize: 18,
            fontWeight: "bold",
            borderRadius: 3,
            textTransform: "none",
            color: "#fff",
            borderColor: "#fff",
            "&:hover": {
              background: "rgba(255,255,255,0.2)",
            },
          }}
        >
          View Deals
        </Button>
      </Box>

      {/* Feature Icons */}
      <Grid container spacing={2} sx={{ mt: 5 }}>
        {[
          { icon: "🚚", title: "Free Shipping" },
          { icon: "💰", title: "Earn Rewards" },
          { icon: "⚡", title: "Instant Checkout" },
          { icon: "🕓", title: "24/7 Support" },
        ].map((f, i) => (
          <Grid item xs={6} sm={3} key={i}>
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ fontSize: 28 }}>{f.icon}</Typography>
              <Typography sx={{ fontWeight: 600 }}>{f.title}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>

    {/* Image Section */}
    <Box
      component="img"
      src="/assets/shope2.png"
      alt="Shopping illustration"
      sx={{
        width: { xs: "90%", md: "45%" },
        maxWidth: 520,
        borderRadius: 4,
        mt: { xs: 5, md: 0 },
        zIndex: 2,
        animation: "floatImg 4s ease-in-out infinite alternate",
        "@keyframes floatImg": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-15px)" },
        },
      }}
    />

    {/* Bottom Wave Divider */}
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 120,
        background:
          "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1440 320%22><path fill=%22white%22 fill-opacity=%221%22 d=%22M0,160L80,176C160,192,320,224,480,218.7C640,213,800,171,960,149.3C1120,128,1280,128,1360,128L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z%22></path></svg>')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    />
  </Box>
)}

      {/* PRODUCT GRID */}
      {showShop && (
        <Box sx={{ p: { xs: 3, md: 6 }, animation: "fadeIn 0.5s ease" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              textAlign: "center",
              mb: 5,
              color: "#333",
            }}
          >
            Featured Products
          </Typography>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    textAlign: "center",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "scale(1.04)",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={product.img}
                    alt={product.name}
                    sx={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  />
                  <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
                    {product.name}
                  </Typography>
                  <Typography sx={{ color: "#555", mb: 2 }}>
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleAddToCart(product)}
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      fontWeight: "bold",
                      background: "linear-gradient(90deg, #ff00cc, #3333ff)",
                    }}
                  >
                    Add to Cart
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* CHECKOUT MODAL */}
      <Modal open={checkoutOpen} onClose={handleCloseCheckout}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 500 },
            bgcolor: "#fff",
            borderRadius: 3,
            p: 3,
          }}
        >
          <Typography variant="h6" mb={2}>
            Your Order
          </Typography>
          <List sx={{ maxHeight: 300, overflow: "auto" }}>
            {cartItems.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <Button color="error" onClick={() => handleRemoveFromCart(item.id)}>
                    Remove
                  </Button>
                }
              >
                <ListItemAvatar>
                  <Avatar src={item.img} />
                </ListItemAvatar>
                <MuiListItemText primary={item.name} secondary={`$${item.price}`} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Typography>Total: ${totalPrice}</Typography>
          <Button fullWidth variant="contained" sx={{ mt: 2 }}>
            Place Order
          </Button>
        </Box>
      </Modal>

      {/* ADD PRODUCT MODAL */}
      <Modal open={addProductOpen} onClose={() => setAddProductOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "#fff",
            borderRadius: 3,
            p: 3,
          }}
        >
          <Typography variant="h6" mb={2}>
            Add New Product
          </Typography>

          <Formik
            initialValues={newProduct}
            validationSchema={checkoutSchema}
            onSubmit={handleAddProductSubmit}
          >
            {({ values, handleChange, handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Product Name"
                  name="name"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  fullWidth
                  value={values.price}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" component="label" fullWidth sx={{ mb: 2 }}>
                  Upload Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setFieldValue("img", reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </Button>
                {values.img && (
                  <Box
                    component="img"
                    src={values.img}
                    alt="preview"
                    sx={{
                      width: "100%",
                      height: 150,
                      objectFit: "cover",
                      mb: 2,
                    }}
                  />
                )}
                <Button fullWidth type="submit" variant="contained">
                  Add Product
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>

      {/* SUCCESS SNACKBAR */}
      <Snackbar
        open={addSuccess}
        autoHideDuration={2000}
        onClose={() => setAddSuccess(false)}
        TransitionComponent={SlideUp}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          ✅ Product Added Successfully!
        </Alert>
      </Snackbar>

      {loading && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="rgba(255, 255, 255, 0.6)"
          zIndex={2000}
        >
          <CircularProgress size={70} color="secondary" />
        </Box>
      )}
    </Box>
  );
};

export default UserDashboardShop;
