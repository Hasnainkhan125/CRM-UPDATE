import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Paper,
  CircularProgress,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Stack,
  IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [textAlerts] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    if (orderPlaced) {
      const timer = setTimeout(() => navigate("/user-dashboard"), 3000);
      return () => clearTimeout(timer);
    }
  }, [orderPlaced, navigate]);

const handlePlaceOrder = () => {
  // Check basic info
  if (!firstName.trim() || !lastName.trim() || !email.trim()) {
    alert("Please fill in your full name and email.");
    return;
  }

  // Address and phone required
  if (!address.trim() || !city.trim() || !postalCode.trim() || !phone.trim()) {
    alert("Please fill in your address and phone number.");
    return;
  }


    setLoading(true);

    setTimeout(() => {
      const order = {
        customer: { firstName, lastName, email, phone },
        items: cartItems,
        total: cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0),
        paymentMethod,
        address,
        city,
        postalCode,
        giftMessage,
        textAlerts,
        ...(paymentMethod === "card" && { cardNumber, expiry, cvv }),
        date: new Date().toISOString(),
      };

      localStorage.setItem("lastOrder", JSON.stringify(order));
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));

      setLoading(false);
      setOrderPlaced(true);
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 3,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 3,
            textAlign: "center",
            maxWidth: 500,
            bgcolor: "#fff",
          }}
        >
          <CheckCircleOutlineIcon
            sx={{ fontSize: 80, color: "#4caf50", mb: 2 }}
          />
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Thank You!
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 500, mb: 2, color: "#555" }}>
            Your order has been successfully placed.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
     
          </Stack>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f0f4ff 0%, #d9e4ff 100%)",
        py: 6,
        px: 3,
      }}
    >
<Box sx={{ maxWidth: 1200, mx: "auto", textAlign: "center", mb: 6 }}>
  {/* Logo / Brand */}
  <Typography
    variant="h1"
    sx={{
      fontWeight: 700,
      letterSpacing: 2,
      background: "linear-gradient(90deg, #667eea, #764ba2)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      mb: 1,
    }}
  >
    ShopEase
  </Typography>

  {/* Tagline */}
  <Typography
    variant="subtitle1"
    sx={{
      color: "#555",
      fontWeight: 500,
      letterSpacing: 1,
    }}
  >
    Your One-Stop Shop for Everything
  </Typography>


        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
          {/* Shipping & Payment Form - LEFT */}
<Paper
  sx={{
    flex: 2,
    p: 5,
    borderRadius: 4,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    bgcolor: "#ffffff",
    transition: "0.3s",
    "&:hover": { boxShadow: "0 15px 35px rgba(0,0,0,0.15)" },
  }}
>
  <Typography
    variant="h5"
    sx={{ mb: 4, fontWeight: 700, color: "#333" }}
  >
    Shipping & Contact Information
  </Typography>

  {/* Gift Option */}
  <TextField
    label="Gift Message (Optional)"
    fullWidth
    value={giftMessage}
    onChange={(e) => setGiftMessage(e.target.value)}
    sx={{
      mb: 3,
      "& .MuiInputBase-root": { borderRadius: 2, bgcolor: "#f5f5f5" },
    }}
  />

  {/* Paragraph */}
  <Typography sx={{ mb: 3, color: "#666", fontSize: 14, lineHeight: 1.6 }}>
    Please fill in your shipping address carefully. You can also receive text alerts for your order status. Ensure all details are correct to avoid delays.
  </Typography>

  {/* Full Form */}
  <Grid container spacing={2} sx={{ mb: 3 }}>
    <Grid item xs={6}>
      <TextField
        label="First Name"
        fullWidth
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        sx={{ "& .MuiInputBase-root": { borderRadius: 2, bgcolor: "#f5f5f5" } }}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Last Name"
        fullWidth
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        sx={{ "& .MuiInputBase-root": { borderRadius: 2, bgcolor: "#f5f5f5" } }}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        label="Address"
        fullWidth
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        sx={{ "& .MuiInputBase-root": { borderRadius: 2, bgcolor: "#f5f5f5" } }}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ "& .MuiInputBase-root": { borderRadius: 2, bgcolor: "#f5f5f5" } }}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        label="City"
        fullWidth
        value={city}
        onChange={(e) => setCity(e.target.value)}
        sx={{ "& .MuiInputBase-root": { borderRadius: 2, bgcolor: "#f5f5f5" } }}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Postal Code"
        fullWidth
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        sx={{ "& .MuiInputBase-root": { borderRadius: 2, bgcolor: "#f5f5f5" } }}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="Phone Number"
        fullWidth
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        sx={{ "& .MuiInputBase-root": { borderRadius: 2, bgcolor: "#f5f5f5" } }}
      />
    </Grid>
  </Grid>



  {/* Payment Method */}
  <Typography variant="h6" sx={{ mb: 5, fontWeight: 600, color: "#333" }}>
    Payment Method
  </Typography>

  <Grid container spacing={2} sx={{ mb: 4 }}>
    {[
      {
        key: "CashOnDelivery",
        label: "Delivery",
        img: "https://images.seeklogo.com/logo-png/48/1/food-delivery-symbol-logo-png_seeklogo-486549.png",
      },
      {
        key: "JazzCash",
        label: "JazzCash",
        img: "https://images.seeklogo.com/logo-png/61/1/jazz-cash-new-logo-png_seeklogo-613046.png",
      },
      {
        key: "PayPal",
        label: "PayPal",
        img: "https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg",
      },
      {
        key: "Visa",
        label: "Visa",
        img: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
      },
    ].map((method) => (
      <Grid item xs={6} sm={3} key={method.key}>
        <Card
          sx={{
            border:
              paymentMethod === method.key ? "2px solid #1976d2" : "1px solid #ddd",
            borderRadius: 3,
            transition: "0.3s",
            "&:hover": { transform: "scale(1.05)", boxShadow: "0 8px 20px rgba(0,0,0,0.12)" },
          }}
        >
          <CardActionArea onClick={() => setPaymentMethod(method.key)}>
            <CardMedia
              component="img"
              image={method.img}
              alt={method.label}
              sx={{ width: "100%", height: 80, objectFit: "contain", p: 1 }}
            />
          </CardActionArea>
        </Card>
      </Grid>
    ))}
  </Grid>

  {/* Card Details */}
  {paymentMethod === "Visa" && (
    <>
      <TextField
        label="Card Number"
        fullWidth
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        sx={{ mb: 3, "& .MuiInputBase-root": { borderRadius: 2, bgcolor: "#f5f5f5" } }}
      />
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6}>
          <TextField
            label="Expiry Date (MM/YY)"
            fullWidth
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            sx={{ "& .MuiInputBase-root": { borderRadius: 2, bgcolor: "#f5f5f5" } }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="CVV"
            fullWidth
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            sx={{ "& .MuiInputBase-root": { borderRadius: 2, bgcolor: "#f5f5f5" } }}
          />
        </Grid>
      </Grid>
    </>
  )}

  {/* Action Buttons */}
  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
    <Button
      variant="outlined"
      color="secondary"
      fullWidth
      onClick={() => navigate("/user-dashboard")}
      sx={{ py: 1.5, fontWeight: 600, borderRadius: 3 }}
    >
      Cancel
    </Button>
    <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={handlePlaceOrder}
      sx={{ py: 1.5, fontWeight: 600, borderRadius: 3 }}
      disabled={loading}
    >
      {loading ? (
        <CircularProgress size={24} sx={{ color: "#fff" }} />
      ) : (
        "Place Order"
      )}
    </Button>
  </Stack>
</Paper>


    {/* Cart Section - RIGHT */}
<Paper
  sx={{
    flex: 1,
    p: 4,
    borderRadius: 4,
    boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
    bgcolor: "#f4f5f7ff",
  }}
>
  <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: "#1976d2" }}>
    Order Summary
  </Typography>

  {cartItems.length === 0 ? (
    <Typography sx={{ color: "#777" }}>No items in your cart.</Typography>
  ) : (
    <Stack spacing={2}>
      {cartItems.map((item, i) => (
        <Paper
          key={i}
          sx={{
            p: 2,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            },
          }}
        >
          {/* Product Image */}
          <Box
            sx={{
              width: 80,
              height: 80,
              flexShrink: 0,
              mr: 2,
              borderRadius: 2,
              overflow: "hidden",
              bgcolor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={item.img}
              alt={item.name}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>

          {/* Product Details */}
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 16 }}>{item.name}</Typography>
            <Typography sx={{ fontSize: 13, color: "#777", mt: 0.5 }}>
              Quantity: <Box component="span" sx={{
                bgcolor: "#e0f2fe",
                color: "#0288d1",
                px: 1.5,
                py: 0.3,
                borderRadius: 1,
                fontWeight: 600,
                fontSize: 13,
              }}>{item.quantity || 1}</Box>
            </Typography>
            <Typography sx={{ fontSize: 13, color: "#555" }}>
              Price: <Box component="span" sx={{ color: "#d32f2f", fontWeight: 600 }}>${item.price.toFixed(2)}</Box>
            </Typography>
          </Box>

          {/* Total & Delete */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#2e7d32" }}>
              ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
            </Typography>
            <IconButton
              color="error"
              onClick={() => {
                const newCart = cartItems.filter((_, index) => index !== i);
                setCartItems(newCart);
                localStorage.setItem("cart", JSON.stringify(newCart));
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Paper>
      ))}
    </Stack>
  )}

  <Divider sx={{ my: 3 }} />

<Box
  sx={{
    p: 3,
    borderRadius: 3,
    bgcolor: "#f5f5f5",
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
    maxWidth: 400,
    mx: "auto",
  }}
>


  {/* Subtotal */}
  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
    <Typography sx={{ color: "#555" }}>Subtotal:</Typography>
    <Typography sx={{ fontWeight: 600 }}>
      ${cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0).toFixed(2)}
    </Typography>
  </Box>

  {/* Delivery Fee */}
  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
    <Typography sx={{ color: "#555" }}>Delivery Fee:</Typography>
    <Typography sx={{ fontWeight: 600, color: "#0288d1" }}>
      $5.00
    </Typography>
  </Box>

  {/* Discount */}
  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
    <Typography sx={{ color: "#555" }}>Discount:</Typography>
    <Typography sx={{ fontWeight: 600, color: "#2e7d32" }}>
      -$10.00
    </Typography>
  </Box>

  <Divider sx={{ my: 2 }} />

  {/* Grand Total */}
  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Total:</Typography>
    <Typography
      variant="h6"
      sx={{
        fontWeight: 700,
        color: "#d32f2f",
        background: "rgba(211,47,47,0.1)",
        px: 2,
        py: 0.5,
        borderRadius: 1.5,
      }}
    >
      ${(
        cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0) + 5 - 10
      ).toFixed(2)}
    </Typography>
  </Box>
</Box>

</Paper>

        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutForm;
