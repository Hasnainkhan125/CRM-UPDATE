import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Typography,
  Snackbar,
  Slide,
  Alert,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import UserTopbar from "./UserTopbar";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const UserDashboardShop = () => {
  const [loading, setLoading] = useState(() => {
    // Check sessionStorage; if null, show loader
    return !sessionStorage.getItem("dashboardLoaded");
  });

  
  // keep only what’s used
const [addSuccess, setAddSuccess] = useState(false);

  useEffect(() => {
    if (loading) {
      // Simulate loading for 3-6 seconds
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("dashboardLoaded", "true"); // mark as loaded
      }, 4000); // adjust duration as needed
      return () => clearTimeout(timer);
    }
  }, [loading]);

  function SlideUp(props) {
    return <Slide {...props} direction="up" />;
  }

  // ...rest of your component continues here

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f5f5", // Changed background color
          gap: 4,
        }}
      >
        {/* Rotating bars loader */}
        <Box
          sx={{
            position: "relative",
            width: 80,
            height: 80,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: [1, 0.2] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                delay: i * 0.1,
              }}
              style={{
                position: "absolute",
                top: "4px",
                left: "50%",
                width: "8px",
                height: "18px",
                background: "linear-gradient(180deg, #ff6a00, #ff9900)", // Updated color
                borderRadius: "10px",
                transformOrigin: "center 36px",
                transform: `rotate(${i * 30}deg)`,
                boxShadow: "0 0 6px rgba(255, 106, 0, 0.6)",
              }}
            />
          ))}
        </Box>

        {/* Loading text with animated dots */}
        <motion.div
          animate={{ scale: [1, 1.03, 1], opacity: [1, 0.9, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography
              sx={{
                fontSize: "1.4rem",
                fontWeight: 600,
                color: "#333333", // Changed text color
                letterSpacing: "0.5px",
                fontFamily:
                  "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              Loading ShopEase .
            </Typography>
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  color: "#333333", // Same as text
                }}
              >
                .
              </motion.span>
            ))}
          </Box>
        </motion.div>

        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.4 }}
        >
          <Typography
            sx={{
              fontSize: "0.95rem",
              color: "#555555",
              mt: 2,
              fontStyle: "italic",
              fontFamily:
                "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Preparing your ShopEase Dashboard...
          </Typography>
        </motion.div>
      </Box>
    );
  }



    return (
      <Box sx={{ bgcolor: "#fff", minHeight: "100vh", color: "#000" }}>
        <UserTopbar />

        {/* ================= HERO Section ================= */}
        <Box id="dashboard"
          sx={{
            width: "100%",
            height: { xs: "80vh", md: "100vh" },
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 3, md: 10 },
            bgcolor: "#fff",
          }}
        >
{/* Right Side - Modern Neon Diagonal Background */}
<Box
  sx={{
    position: "absolute",
    top: 0,
    right: 0,
    width: "70%",
    height: "90%",
    background: "linear-gradient(135deg, #ff8800ff, #ff8800ff, #ff8800ff)", // dark neon gradient
    clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)",
    zIndex: 1,
  }}
/>

{/* Neon Accent Stripes */}
{[0, 1].map((i) => (
  <Box
    key={i}
    sx={{
      position: "absolute",
     top: 0,
    right: 0,
    width: "60%",
    height: "80%",
      background: "rgba(255, 255, 255, 0.9)", // orange neon glow
        clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)",
      zIndex: 2,
      transition: "all 0.4s ease-in-out",
    }}
  />
))}



          {/* Left Text Section */}
          <Box
            sx={{
              position: "relative",
              zIndex: 3,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: "500px",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                color: "#111",
                lineHeight: 1.1,
                fontSize: { xs: "66px", sm: "98px", md: "84px" },
                letterSpacing: "-1px",
              }}
            >
              Nike New <br /> Collection!
            </Typography>

            <Typography sx={{ fontSize: 18, color: "#555", lineHeight: 1.6 }}>
              Discover the latest trends in sportswear and footwear. Shop our
              exclusive collection with fast delivery, secure payments, and
              unbeatable deals.
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, #ff6a00, #ff9900)",
                  color: "#fff",
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  borderRadius: 10,
                  textTransform: "uppercase",
                  boxShadow: "0 6px 20px rgba(255,100,0,0.4)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(255,100,0,0.5)",
                  },
                  transition: "0.3s",
                }}
              >
                + Add To Bag
              </Button>

              <Button
                variant="outlined"
                sx={{
                  borderColor: "#ff6a00",
                  color: "#ff6a00",
                  px: 4,
                  fontWeight: 700,
                  borderRadius: 10,
                  "&:hover": { background: "#ff6a0033", borderColor: "#ff6a00" },
                  transition: "0.3s",
                }}
              >
                Top Products
              </Button>
            </Box>
          </Box>

          {/* Shoe Image */}
          <Box
            component="img"
            src="/assets/shoes/sh6.png"
            alt="hero product"
            sx={{
              width: { md: "70%", lg: "66%" },
              maxWidth: 920,
              position: "absolute",
              right: { md: 48, lg: 100 },
              top: "14%",
              zIndex: 4,
              transform: "translateY(-4%)",
              pointerEvents: "none",
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.25))",
            }}
          />
        </Box>

    {/* ================= Modern Special Offers ================= */}
  <Box
    sx={{
      p: { xs: 4, md: 10 },
      mx: { xs: 2, md: 6 },
      my: 12,
      borderRadius: 4,
      background: "linear-gradient(135deg, #ff9900, #ff6a00)",
      color: "#fff",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    }}
  >
    {/* Background Accent Circles */}
    <Box
      sx={{
        position: "absolute",
        top: -50,
        left: -50,
        width: 200,
        height: 200,
        bgcolor: "rgba(255,255,255,0.1)",
        borderRadius: "50%",
        zIndex: 1,
      }}
    />
    <Box
      sx={{
        position: "absolute",
        bottom: -60,
        right: -60,
        width: 250,
        height: 250,
        bgcolor: "rgba(0,0,0,0.1)",
        borderRadius: "50%",
        zIndex: 1,
      }}
    />

    <Box sx={{ position: "relative", zIndex: 2 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 900, mb: 2, fontSize: { xs: 28, md: 40 } }}
      >
        🔥 Flash Sale! Up to 50% Off
      </Typography>
      <Typography
        sx={{
          mb: 5,
          fontSize: { xs: 16, md: 20 },
          maxWidth: 600,
          mx: "auto",
        }}
      >
        Grab your favorite products before the deal ends. Limited stock available!
      </Typography>

      {/* Countdown Timer */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 5 }}>
        {["12", "23", "59"].map((time, i) => (
          <Box
            key={i}
            sx={{
              bgcolor: "#000",
              px: 3,
              py: 2,
              borderRadius: 2,
              fontWeight: 700,
              fontSize: 24,
              minWidth: 60,
            }}
          >
            {time}
          </Box>
        ))}
      </Box>

      <Button
        variant="contained"
        sx={{
          px: 6,
          py: 1.8,
          fontWeight: 700,
          fontSize: 16,
          borderRadius: 3,
          background: "#000",
          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
          "&:hover": { transform: "translateY(-2px)", background: "#222" },
          transition: "0.3s",
        }}
      >
        Shop Deals
      </Button>
    </Box>
  </Box>


      {/* ================= About / Intro Section ================= */}
      <Box id="about"
        sx={{
          background: "linear-gradient(135deg, #fafafa, #fff)",
          borderRadius: 6,
          my: 8,
          mx: { xs: 2, md: 6 },
          boxShadow: "0 12px 40px rgba(16,24,40,0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Box
          sx={{
            width: "100%",
            minHeight: "80vh",
            p: { xs: 6, md: 12 },
            background: "linear-gradient(135deg, #fafafa, #fff)",
            borderRadius: 8,
            my: 10,
            mx: { xs: 2, md: 6 },
            boxShadow: "0 20px 60px rgba(16,24,40,0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              component="img"
              src="/assets/secure.svg"
              alt="ShopEase Logo"
              sx={{ width: { xs: 100, md: 160 }, height: "auto" }}
            />
          </Box>

          {/* Headline */}
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 32, md: 48 },
              fontWeight: 900,
              textAlign: "center",
              background: "linear-gradient(#ff9900)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: 0.5,
              lineHeight: 1.2,
              mb: 3,
            }}
          >
            About ShopEase
          </Typography>

          {/* Paragraph */}
          <Typography
            sx={{
              fontSize: { xs: 18, md: 20 },
              color: "#555",
              textAlign: "center",
              maxWidth: 900,
              lineHeight: 1.9,
              mb: 4,
            }}
          >
            ShopEase is your ultimate online shopping destination. Discover
            premium quality products with exclusive deals, fast delivery,
            secure payments, and a seamless shopping experience across all
            devices. Join thousands of happy customers enjoying our services
            every day.
          </Typography>

          {/* Features */}
          <Box id="feature"
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
              gap: 6,
              width: "100%",
              mt: 4,
            }}
          >
            {[
              { text: "Fast Delivery", icon: "/assets/delevery.png" },
              { text: "Secure Payments", icon: "/assets/payment.png" },
              { text: "Master Card", icon: "/assets/pay.png" },
              { text: "Happy Customers", icon: "/assets/happy.png" },
            ].map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",

                  textAlign: "center",
                  p: 5,
                  borderRadius: 6,
                  bgcolor: "#fff",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
                  transition: "0.4s",
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.05)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <Box component="img" src={item.icon} alt={item.text} sx={{ width: 68, height: 68, mb: 2, p: 1 }} />
                <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#bababaff" }}>{item.text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>


      {/* ================= Featured Products Section ================= */}
      <Box sx={{ p: { xs: 3, md: 6 }, mx: { xs: 1, md: 6 }, mt: 8 }}>
        <Typography
          variant="h1"
          sx={{ fontWeight: 700, textAlign: "center", mb: 5, color: "#333" }}
        >
          Featured Products
        </Typography>

        <Grid container spacing={3}>
          {[
            { id: 1, name: "A Premier Air Max", price: 129.99, img: "/assets/shoes/sh1.png" },
            { id: 2, name: "Adidas Ultraboost", price: 149.99, img: "/assets/shoes/sh2.png" },
            { id: 3, name: "Puma RS-X", price: 109.99, img: "/assets/shoes/sh3.png" },
            { id: 4, name: "Reebok Classic", price: 99.99, img: "/assets/shoes/sh4.png" },
            { id: 1, name: "Nike Air Max", price: 129.99, img: "/assets/shoes/sh5.png" },
            { id: 2, name: "Adidas Ultraboost", price: 149.99, img: "/assets/shoes/sh6.png" },
            { id: 3, name: "Puma RS-X", price: 109.99, img: "/assets/shoes/sh7.webp" },
            { id: 4, name: "Reebok Classic", price: 99.99, img: "/assets/shoes/sh4.png" },
          ].map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 3,
                  textAlign: "center",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.04)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={product.img}
                  alt={product.name}
                  sx={{ width: "100%", height: 280, objectFit: "cover", mb: 2 }}
                />
                <Typography sx={{ fontWeight: 700, fontSize: 18 }}>{product.name}</Typography>
                <Typography sx={{ color: "#555", mb: 2 }}>${product.price.toFixed(2)}</Typography>
              <Button
  fullWidth
  variant="contained"
  onClick={() => {
    // Get existing cart from localStorage or empty array
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Add selected product
    cart.push(product);
    // Save updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    // Trigger cart badge update in topbar
    window.dispatchEvent(new Event("cartUpdated"));
  }}
  sx={{
    textTransform: "none",
    borderRadius: 3,
    fontWeight: "bold",
    height: 50,
    width: "100%",
    background: "linear-gradient(135deg, #000000ff)",
    color: "#fff",
    fontSize: 16,
    letterSpacing: 0.5,
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    },
  }}
>
  Add to Cart
</Button>


              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

{/* ================= Modern Customer Comments Section ================= */}
<Box
  sx={{
    py: { xs: 8, md: 12 },
    px: { xs: 3, md: 8 },
    bgcolor: "#f2f5ff",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* Decorative Background Blobs */}
  <Box
    sx={{
      position: "absolute",
      width: 300,
      height: 300,
      bgcolor: "rgba(255,165,0,0.1)",
      borderRadius: "50%",
      top: -80,
      left: -80,
      filter: "blur(150px)",
      zIndex: 0,
    }}
  />
  <Box
    sx={{
      position: "absolute",
      width: 250,
      height: 250,
      bgcolor: "rgba(107,123,255,0.1)",
      borderRadius: "50%",
      bottom: -70,
      right: -70,
      filter: "blur(120px)",
      zIndex: 0,
    }}
  />

  {/* Headline */}
  <Typography
    variant="h1"
    sx={{
      fontWeight: 900,
      textAlign: "center",
      mb: 10,
      fontSize: { xs: 32, md: 48 },
      background: "linear-gradient(90deg,#ff6a00,#ff9900)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      position: "relative",
      zIndex: 1,
    }}
  >
    What Our Customers Say
  </Typography>

  <Grid container spacing={6} justifyContent="center">
    {[
      { id: 1, name: "Alice Johnson", comment: "Amazing quality and fast shipping!", img: "/assets/avators/avatar1.png" },
      { id: 2, name: "Michael Smith", comment: "I love the design and comfort of these shoes.", img: "/assets/avators/avatar2.png" },
      { id: 3, name: "Sophie Lee", comment: "Great customer service and smooth checkout.", img: "/assets/avators/avatar3.png" },
      { id: 4, name: "David Kim", comment: "Highly recommend ShopEase to everyone!", img: "/assets/avators/avatar4.png" },
      { id: 5, name: "Emma Watson", comment: "Fast delivery and amazing product quality.", img: "/assets/avators/avatar5.png" },
      { id: 6, name: "James Brown", comment: "The best online shopping experience I've had.", img: "/assets/avators/avatar7.png" },
    ].map((c) => (
      <Grid item xs={12} sm={6} md={4} key={c.id}>
        <Paper
          sx={{
            position: "relative",
            p: 6,
            borderRadius: 6,
            minHeight: 240,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            background: "linear-gradient(135deg, #ffffff, #f0f3ff)",
            boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
            transition: "all 0.4s ease",
            "&:hover": {
              transform: "translateY(-10px) scale(1.05)",
              boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
            },
          }}
        >
          {/* Avatar with glow */}
          <Box
            sx={{
              position: "absolute",
              top: -2,
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "rgba(255, 166, 0, 0.08)",
              zIndex: 0,
            }}
          />
          <Box
            component="img"
            src={c.img}
            alt={c.name}
            sx={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              objectFit: "cover",
              mb: 4,
              zIndex: 1,
              border: "3px solid #ff6a00",
            }}
          />
          <Typography sx={{ fontWeight: 700, color: "#ff6a00", mb: 2 }}>{c.name}</Typography>
          <Typography sx={{ color: "#555", fontSize: 15, lineHeight: 1.6 }}>{c.comment}</Typography>
        </Paper>
      </Grid>
    ))}
  </Grid>
</Box>


{/* ================= Modern Contact / Merchant Section ================= */}
<Box id="merchants"
  sx={{
    bgcolor: "#fffdf6",
    py: { xs: 8, md: 14 },
    px: { xs: 4, md: 10 },
  }}
>
  <Grid
    container
    spacing={8}
    alignItems="center"
    justifyContent="center"
    sx={{ maxWidth: 1400, mx: "auto" }}

    
  >{/* ===== Left Text Section ===== */}
<Grid item xs={12} md={6} sx={{ position: "relative" }}>
  {/* Main Heading */}
  <Typography
    variant="h1"
    sx={{
      fontWeight: 900,
      mb: 8,
      textAlign: { xs: "center", md: "left" },
      fontFamily: 'Inter, "Circular Std", sans-serif',
      background: "linear-gradient(90deg, #ff6a00, #ff8c42)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontSize: { xs: "2.5rem", md: "4rem" },
    }}
  >
    Merchants
  </Typography>

  {/* Timeline Line */}
  <Box
    sx={{
      position: "absolute",
      top: 100,
      left: 20,
      width: "4px",
      height: "calc(100% - 100px)",
      bgcolor: "rgba(107, 123, 255, 0.2)",
      borderRadius: 2,
      display: { xs: "none", md: "block" },
    }}
  />

  {/* Feature Points */}
  {[
    {
      icon: "/assets/payment.png",
      title: "Save Time & Money",
      description: "Integrating our e-commerce solution is short, simple, and effective.",
    },
    {
      icon: "/assets/icons/doller.png",
      title: "Boost Sales",
      description: "Use discounts, abandoned cart recovery, and analytics to maximize revenue.",
    },
    {
      icon: "/assets/delevery.png",
      title: "Fast Shipping",
      description: "Seamless shipping integration ensures your products reach customers faster.",
    },

  ].map((item, index) => (
    <Box
      key={index}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mb: 6,
        p: 3,
        borderRadius: 4,
        bgcolor: "#fff",
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        position: "relative",
        transition: "all 0.3s",
        "&:hover": { transform: "translateY(-5px)", boxShadow: "0 15px 30px rgba(0,0,0,0.1)" },
      }}
    >
      {/* Icon & Title */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            bgcolor: "rgba(100, 115, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 5px 15px rgba(100,115,255,0.1)",
            transition: "all 0.3s",
            "&:hover": { transform: "scale(1.1)", bgcolor: "rgba(100, 115, 255, 0.2)" },
          }}
        >
          <Box component="img" src={item.icon} alt={item.title} sx={{ width: 28, height: 28 }} />
        </Box>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontFamily: 'Inter, "Circular Std", sans-serif',
            fontSize: { xs: "1.5rem", md: "1.8rem" },
          }}
        >
          {item.title}
        </Typography>
      </Box>

      {/* Description */}
      <Typography sx={{ color: "#555", ml: { xs: 0, md: 9 } }}>
        {item.description}
      </Typography>

      {/* Learn More */}
      <Typography
        sx={{
          color: "#6b7bff",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 0.6,
          cursor: "pointer",
          ml: { xs: 0, md: 9 },
          mt: 1,
          transition: "all 0.2s",
          "&:hover": { textDecoration: "underline", transform: "translateX(2px)" },
        }}
      >
        Learn more
        <Box component="img" src="/assets/icons/arrow.png" alt="Arrow Right" sx={{ width: 16, height: 16 }} />
      </Typography>
    </Box>
  ))}
</Grid>



    {/* ===== Right Illustration Section ===== */}

    <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
      <Box
        component="img"
        src="/assets/1632259143-customers.webp"
        alt="Merchant illustration"
        sx={{
          width: "100%",
          maxWidth: 800,
          borderRadius: 4,
          boxShadow: "0 30px 80px rgba(0,0,0,0.1)",
        }}
      />
    </Grid>
  </Grid>
</Box>
{/* ===== Modern Large Contact Form Section (ShopEase Style) ===== */}
<Grid 
  container
  spacing={4}
  sx={{
    position: "relative",
    py: { xs: 6, md: 12 },
    px: { xs: 4, md: 8 },
    bgcolor: "#f4f4f9",
  }}
>
  {/* ===== Left Column: Contact Form ===== */}
  <Grid 
    item
    xs={12}
    md={6}
    sx={{
      position: "relative",
      zIndex: 2,
      borderRadius: 4,
      p: { xs: 5, md: 6 },
      bgcolor: "linear-gradient(135deg, #ffffff, #f0f3ff)",
      boxShadow: "0 25px 50px rgba(0,0,0,0.08)",
      overflow: "hidden",
    }}
  >
    {/* Floating Accent Circles */}
    <Box id="contact"
      sx={{
        position: "absolute",
        width: 180,
        height: 180,
        bgcolor: "rgba(107,123,255,0.1)",
        borderRadius: "50%",
        top: -60,
        filter: "blur(80px)",
        zIndex: 0,
      }}
    />
    <Box
      sx={{
        position: "absolute",
        width: 150,
        height: 150,
        bgcolor: "rgba(255,106,0,0.1)",
        borderRadius: "50%",
        bottom: -50,
        left: -50,
        filter: "blur(60px)",
        zIndex: 0,
      }}
    />

    {/* Headline */}
    <Typography
      variant="h2"
      sx={{
        fontSize: { xs: 32, md: 48 },
        fontWeight: 900,
        textAlign: "center",
        background: "linear-gradient(90deg, #ff9900, #ff6a00)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: 0.5,
        lineHeight: 1.2,
        mb: 4,
        position: "relative",
        zIndex: 1,
      }}
    >
      Contact Us
    </Typography>

    <Typography
      sx={{
        textAlign: "center",
        color: "#555",
        mb: 6,
        fontSize: { xs: 16, md: 18 },
        maxWidth: 500,
        mx: "auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      Have a question, feedback, or want to collaborate? Fill out the form below and we’ll get back to you promptly.
    </Typography>

    {/* Form */}
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        position: "relative",
        zIndex: 1,
      }}
    >
      {[
        { label: "Full Name" },
        { label: "Email Address" },
        { label: "Phone Number" },
        { label: "Message", multiline: true, rows: 5 },
      ].map((field, idx) => (
        <TextField
          key={idx}
          label={field.label}
          variant="outlined"
          fullWidth
          multiline={field.multiline || false}
          rows={field.rows || 1}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              fontSize: 16,
              py: 1.5,
              background: "rgba(255,255,255,0.9)",
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 20px rgba(107,123,255,0.15)",
              },
              "&.Mui-focused fieldset": {
                border: "2px solid #ff9900",
                boxShadow: "0 0 12px rgba(255,153,0,0.3)",
              },
            },
          }}
        />
      ))}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        sx={{
          py: 2,
          borderRadius: 3,
          fontWeight: 700,
          textTransform: "none",
          fontSize: 17,
          background: "linear-gradient(135deg, #ff9900, #ff6a00)",
          backgroundSize: "200% 200%",
          transition: "all 0.5s ease",
          "&:hover": {
            backgroundPosition: "right center",
            boxShadow: "0 12px 30px rgba(255,106,0,0.4)",
          },
        }}
      >
        Send Message
      </Button>
    </Box>
  </Grid>

 {/* ===== Right Column: Stylish Double Illustration ===== */}
<Grid
  item
  xs={12}
  md={6}
  sx={{
    display: { xs: "none", md: "flex" },
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  }}
>
  {/* Background Accent Circle */}
  <Box
    sx={{
      position: "absolute",
      top: "10%",
      left: "5%",
      width: 220,
      height: 220,
      bgcolor: "rgba(107,123,255,0.1)",
      borderRadius: "50%",
      filter: "blur(100px)",
      zIndex: 0,
    }}
  />

  {/* Main Image */}
  <Box
    component="img"
    src="/assets/icons/bill.png"
    alt="Main Illustration"
    sx={{
      width: "80%",
      maxWidth: 700,
      borderRadius: 4,
      transform: "translateY(-10%) translateX(0%)",
      zIndex: 2,
      filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.25))",
    }}
  />


</Grid>
</Grid>


  {/* ================= Ecommerce Footer Section ================= */}
  <Box
    sx={{
      bgcolor: "#081015",
      color: "#fff",
      pt: 10,
      pb: 4,
      px: { xs: 3, md: 10 },
    }}
  >
    {/* ======= Top Section: Locations ======= */}
    <Grid container spacing={6} justifyContent="center" sx={{ mb: 10 }}>
      {[
        { title: "Pakistan", address: "Gulberg 3 Lahore" },
        { title: "United States", address: "451 W 42nd St, New York, USA" },
        { title: "Dubai", address: "23rd St – Al Barsha 2, Dubai UAE" },
      ].map((loc, i) => (
        <Grid
          item
          xs={12}
          md={4}
          key={i}
          sx={{ textAlign: "center", color: "#fff" }}
        >
          <Box
            sx={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              mx: "auto",
              mb: 2,
              bgcolor: "rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
            }}
          >
            🏛️
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {loc.title}
          </Typography>
          <Typography sx={{ color: "#aaa", fontSize: 14, mt: 1 }}>
            {loc.address}
          </Typography>
        </Grid>
      ))}
    </Grid>

  {/* ======= Middle Footer ======= */}
  <Grid container spacing={6}>
    {/* Column 1: Logo + About */}
    <Grid item xs={12} md={3}>
      <Typography
        variant="h5"
        sx={{ fontWeight: 900, mb: 2, color: "#ffbf00ff", letterSpacing: 1 }}
      >
        ShopEase
      </Typography>
      <Typography sx={{ color: "#bbb", fontSize: 14, mb: 3, lineHeight: 1.8 }}>
        ShopEase offers premium ecommerce products with fast delivery and
        high-quality service. We connect you to trusted brands worldwide.
      </Typography>

      <Typography
        sx={{ fontWeight: 700, color: "#ffbf00ff", mb: 1, fontSize: 14 }}
      >
        OUR LOCATION
      </Typography>
      <Typography sx={{ color: "#bbb", fontSize: 14 }}>
        Delivering worldwide with fulfillment centers in Asia, Europe, and USA.
      </Typography>
    </Grid>

    {/* Column 2: About */}
    <Grid item xs={12} md={2}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, mb: 3, color: "#ffbf00ff" }}
      >
        ABOUT US
      </Typography>
      {["About Us", "Blog", "Contact Us", "Privacy Policy", "Terms of Use", "Refund Policy"].map(
        (link) => (
          <Typography
            key={link}
            sx={{
              fontSize: 14,
              color: "#bbb",
              mb: 1,
              cursor: "pointer",
              "&:hover": { color: "#fff" },
            }}
          >
            {link}
          </Typography>
        )
      )}
    </Grid>

    {/* Column 3: Categories */}
    <Grid item xs={12} md={2}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, mb: 3, color: "#ffbf00ff" }}
      >
        CATEGORIES
      </Typography>
      {[
        "Shoes",
        "Clothing",
        "Accessories",
        "Sportswear",
        "New Arrivals",
        "Best Sellers",
      ].map((cat) => (
        <Typography
          key={cat}
          sx={{
            fontSize: 14,
            color: "#bbb",
            mb: 1,
            cursor: "pointer",
            "&:hover": { color: "#fff" },
          }}
        >
          {cat}
        </Typography>
      ))}
    </Grid>

    {/* Column 4: Customer Tools */}
    <Grid item xs={12} md={2}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, mb: 3, color: "#ffbf00ff" }}
      >
        TOOLS
      </Typography>
      {["Track Order", "Size Guide", "Gift Cards", "FAQ", "Help Center"].map(
        (tool) => (
          <Typography
            key={tool}
            sx={{
              fontSize: 14,
              color: "#bbb",
              mb: 1,
              cursor: "pointer",
              "&:hover": { color: "#fff" },
            }}
          >
            {tool}
          </Typography>
        )
      )}
    </Grid>

    {/* Column 5: Contact + Social */}
    <Grid item xs={12} md={3}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, mb: 3, color: "#ffbf00ff" }}
      >
        CONTACTS
      </Typography>
      <Typography sx={{ color: "#bbb", mb: 1, fontSize: 14 }}>
        Phone: +92 (321) 5658565
      </Typography>
      <Typography sx={{ color: "#bbb", mb: 3, fontSize: 14 }}>
        Email: info@shopease.com
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map(
          (Icon, index) => (
            <Box
              key={index}
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                bgcolor: "#0e1a1f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.1)",
                "&:hover": {
                  bgcolor: "#ffbf00ff",
                  color: "#000",
                  transform: "scale(1.1)",
                  transition: "0.3s",
                },
              }}
            >
              <Icon fontSize="small" />
            </Box>
          )
        )}
      </Box>
    </Grid>
  </Grid>

  {/* ======= Bottom Bar ======= */}
  <Box
    sx={{
      borderTop: "1px solid rgba(255,255,255,0.1)",
      textAlign: "center",
      mt: 8,
      pt: 3,
      fontSize: 13,
      color: "#999",
    }}
  >
    © {new Date().getFullYear()} ShopEase. All rights reserved. | Privacy Policy | Refund Policy
  </Box>
</Box>

{/* ================= Snackbars ================= */}
<Snackbar
  open={addSuccess}
  autoHideDuration={2200}
  onClose={() => setAddSuccess(false)}
  TransitionComponent={SlideUp}
  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
>
  <Alert severity="success" variant="filled">
    ✅ Product Added Successfully!
  </Alert>
</Snackbar>

    </Box>
  );
};

export default UserDashboardShop;
