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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("CashOnDelivery");
  const [showJazzCashPopup, setShowJazzCashPopup] = useState(false);

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
    if (!firstName || !lastName || !email || !address || !city || !postalCode || !phone) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const order = {
        customer: { firstName, lastName, email, phone },
        items: cartItems,
        total: cartItems.reduce(
          (acc, item) => acc + item.price * (item.quantity || 1),
          0
        ),
        paymentMethod,
        address,
        city,
        postalCode,
        giftMessage,
        date: new Date().toISOString(),
      };
      localStorage.setItem("lastOrder", JSON.stringify(order));
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
      setLoading(false);

      if (paymentMethod === "JazzCash") {
        setShowJazzCashPopup(true); // show popup for JazzCash
      } else {
        setOrderPlaced(true); // COD / Visa / PayPal
      }
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
            borderRadius: 4,
            textAlign: "center",
            maxWidth: 500,
            bgcolor: "#fff",
          }}
        >
          <CheckCircleOutlineIcon
            sx={{ fontSize: 90, color: "#4caf50", mb: 2 }}
          />
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Thank You!
          </Typography>
          <Typography sx={{ color: "#555", fontWeight: 500 }}>
            Your order has been successfully placed.
          </Typography>
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
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Header */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            letterSpacing: 1,
            textAlign: "center",
            mb: 1,
            background: "linear-gradient(90deg, #667eea, #764ba2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ShopEase
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#555",
            textAlign: "center",
            mb: 6,
            letterSpacing: 0.5,
          }}
        >
          Your One-Stop Shop for Everything
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          {/* Left Form */}
          <Paper
            sx={{
              flex: 2,
              p: 5,
              borderRadius: 4,
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              bgcolor: "#ffffff",
            }}
          >
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 700 }}>
              Shipping & Contact Information
            </Typography>

            <TextField
              label="Gift Message (Optional)"
              fullWidth
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value)}
              sx={{ mb: 3, "& .MuiInputBase-root": { borderRadius: 2, bgcolor: "#f5f5f5" } }}
            />

            <Grid container spacing={2} sx={{ mb: 3 }}>
              {[
                { label: "First Name", value: firstName, setValue: setFirstName },
                { label: "Last Name", value: lastName, setValue: setLastName },
                { label: "Email", value: email, setValue: setEmail },
                { label: "Address", value: address, setValue: setAddress },
                { label: "City", value: city, setValue: setCity },
                { label: "Postal Code", value: postalCode, setValue: setPostalCode },
                { label: "Phone Number", value: phone, setValue: setPhone },
              ].map((field, i) => (
                <Grid item xs={12} sm={i < 2 || i === 5 ? 6 : 12} key={i}>
                  <TextField
                    label={field.label}
                    fullWidth
                    value={field.value}
                    onChange={(e) => field.setValue(e.target.value)}
                    sx={{ "& .MuiInputBase-root": { borderRadius: 2, bgcolor: "#f5f5f5" } }}
                  />
                </Grid>
              ))}
            </Grid>

            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
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
                        paymentMethod === method.key ? "2px solid #764ba2" : "1px solid #ddd",
                      borderRadius: 3,
                      transition: "0.3s",
                      boxShadow: paymentMethod === method.key ? "0 0 10px rgba(118,75,162,0.3)" : "none",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                      },
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

            {paymentMethod === "Visa" && (
              <>
                <TextField
                  label="Card Number"
                  fullWidth
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  sx={{ mb: 3, "& .MuiInputBase-root": { bgcolor: "#f5f5f5" } }}
                />
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  <Grid item xs={6}>
                    <TextField
                      label="Expiry Date (MM/YY)"
                      fullWidth
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      sx={{ "& .MuiInputBase-root": { bgcolor: "#f5f5f5" } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="CVV"
                      fullWidth
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      sx={{ "& .MuiInputBase-root": { bgcolor: "#f5f5f5" } }}
                    />
                  </Grid>
                </Grid>
              </>
            )}

            {paymentMethod === "JazzCash" && (
              <TextField
                label="JazzCash Mobile Number"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ mb: 3, "& .MuiInputBase-root": { bgcolor: "#f5f5f5" } }}
              />
            )}

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
                fullWidth
                onClick={handlePlaceOrder}
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 3,
                  background: "linear-gradient(90deg,#667eea,#764ba2)",
                  boxShadow: "0 4px 15px rgba(118,75,162,0.3)",
                  "&:hover": {
                    background: "linear-gradient(90deg,#764ba2,#667eea)",
                  },
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Place Order"}
              </Button>
            </Stack>
          </Paper>

          {/* Right: Order Summary */}
          <Paper
            sx={{
              flex: 1,
              p: 4,
              borderRadius: 4,
              boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
              bgcolor: "#f7f8fc",
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
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
                      "&:hover": { boxShadow: "0 8px 20px rgba(0,0,0,0.12)" },
                    }}
                  >
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: 2,
                        overflow: "hidden",
                        bgcolor: "#fff",
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
                    <Box sx={{ flex: 1, px: 2 }}>
                      <Typography sx={{ fontWeight: 600 }}>{item.name}</Typography>
                      <Typography sx={{ color: "#666", fontSize: 13 }}>Qty: {item.quantity || 1}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography sx={{ fontWeight: 700, color: "#2e7d32" }}>
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

            <Box sx={{ p: 3, borderRadius: 3, bgcolor: "#fff", boxShadow: "0 6px 15px rgba(0,0,0,0.05)" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  ${cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0).toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Delivery Fee:</Typography>
                <Typography sx={{ fontWeight: 600, color: "#0288d1" }}>$5.00</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Discount:</Typography>
                <Typography sx={{ fontWeight: 600, color: "#2e7d32" }}>- $10.00</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ fontWeight: 700 }}>Total:</Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#d32f2f",
                    background: "rgba(211,47,47,0.08)",
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                  }}
                >
                  ${(cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0) + 5 - 10).toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* JazzCash Popup */}
      <Dialog
        open={showJazzCashPopup}
        onClose={() => setShowJazzCashPopup(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: 700 }}>JazzCash Payment</DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography sx={{ mb: 2 }}>Your order has been submitted!</Typography>
          <Typography sx={{ mb: 1 }}>Please pay via <strong>JazzCash</strong> to:</Typography>
          <Typography sx={{ fontWeight: 700, color: "#007bff", mb: 2 }}>0314-0972575</Typography>
          <Typography sx={{ fontSize: 14, color: "#555" }}>Use your order details as reference.</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={() => {
              setShowJazzCashPopup(false);
              setOrderPlaced(true);
            }}
            sx={{ background: "linear-gradient(90deg,#667eea,#764ba2)" }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CheckoutForm;
