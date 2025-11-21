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
  const [loading, setLoading] = useState(true); // always start as loading

  // keep only what’s used
  const [addSuccess, setAddSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // 4 seconds loading every refresh

    return () => clearTimeout(timer);
  }, []);

  function SlideUp(props) {
    return <Slide {...props} direction="up" />;
  }
if (loading) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        gap: { xs: 2.5, sm: 3, md: 4 }, // smaller gap on mobile
        px: 2,
      }}
    >
      {/* Rotating bars loader */}
      <Box
        sx={{
          position: "relative",
          width: { xs: 55, sm: 70, md: 80 }, // responsive circle size
          height: { xs: 55, sm: 70, md: 80 },
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
              width: "6px", // smaller bar width for mobile looks better
              height: "14px", // also shorter
              background: "linear-gradient(180deg, #ff6a00, #ff9900)",
              borderRadius: "10px",
              transformOrigin: "center 28px",
              transform: `rotate(${i * 30}deg)`,
              boxShadow: "0 0 6px rgba(255, 106, 0, 0.6)",
            }}
          />
        ))}
      </Box>

      {/* Loading text */}
      <motion.div
        animate={{ scale: [1, 1.03, 1], opacity: [1, 0.9, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Typography
            sx={{
              fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.4rem" }, // responsive size
              fontWeight: 600,
              color: "#333333",
              letterSpacing: "0.5px",
              fontFamily:
                "SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            Loading ShopEase
          </Typography>

          {/* Animated dots */}
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
                color: "#333333",
              }}
            >
              .
            </motion.span>
          ))}
        </Box>
      </motion.div>

      {/* Subtext */}
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2.4 }}
      >
        <Typography
          sx={{
            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "0.95rem" },
            color: "#555555",
            mt: 1,
            fontStyle: "italic",
            textAlign: "center",
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


  // Continue with your page content...



    return (
     <Box sx={{ bgcolor: "#fff", minHeight: "100vh", color: "#000", overflowX: "hidden" }}>
  <UserTopbar />

  {/* ================= HERO Section ================= */}
  <Box
    id="dashboard"
    sx={{
      width: "100vw",  // full viewport width
      height: { xs: "80vh", md: "100vh" },
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      px: { xs: 2, sm: 3, md: 10 }, // smaller padding on mobile
      bgcolor: "#fff",
    }}
  >



{/* Right Side - Modern Neon Diagonal Background */}
<Box
  sx={{
    display: { xs: "none", md: "block" },   // HIDE ON MOBILE
    position: "absolute",
    top: 0,
    right: 0,
    width: "70%",
    height: "90%",
    background: "linear-gradient(135deg, #ff8800ff, #ff8800ff)",
    clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)",
    zIndex: 1,
  }}
/>

{/* Neon Accent Stripes */}
{[0, 1].map((i) => (
  <Box
    key={i}
    sx={{
      display: { xs: "none", md: "block" },  // HIDE ON MOBILE
      position: "absolute",
      top: 0,
      right: 0,
      width: "60%",
      height: "80%",
      background: "rgba(255, 255, 255, 0.8)",
      clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)",
      zIndex: 2,
      opacity: 0.4,
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
    gap: { xs: 1.5, md: 2 },
    maxWidth: { xs: "100%", sm: "90%", md: "500px" },
    mt: { xs: 5, md: 0 },
  }}
>
  <Typography
    variant="h1"
    sx={{
      fontWeight: 900,
      color: "#111",
      lineHeight: { xs: 1.1, sm: 1.05 },
      fontSize: { xs: "48px", sm: "50px", md: "84px" },
      letterSpacing: "-0.5px",
      textAlign: { xs: "center", md: "left" },
    }}
  >
    Nike New <br /> Collection!
  </Typography>

  <Typography
    sx={{
      fontSize: { xs: 10, sm: 16, md: 18 },
      color: "#555",
      lineHeight: 1.6,
      textAlign: { xs: "center", md: "left" },
      px: { xs: 1, md: 0 }
    }}
  >
    Discover the latest trends in sportswear and footwear. Shop our
    exclusive collection with fast delivery, secure payments, and
    unbeatable deals.
  </Typography>

  <Box
    sx={{
      display: "flex",
      gap: { xs: 4.2, md: 2 },
      flexWrap: "wrap",
      mt: 2,
      justifyContent: { xs: "center", md: "flex-start" },
    }}
  >
    <Button
      variant="contained"
      sx={{
        background: "linear-gradient(135deg, #ff6a00, #ff9900)",
        color: "#fff",
        px: { xs: 4.5, sm: 3.5, md: 4 },
        py: { xs: 1, md: 1.5 },
        fontWeight: 700,
        borderRadius: 10,
        textTransform: "uppercase",
        fontSize: { xs: 12, md: 14 },
        "&:hover": { transform: "translateY(-2px)" },
      }}
    >
      + Add To Bag
    </Button>

    <Button
      variant="outlined"
      sx={{
        borderColor: "#ff6a00",
        color: "#ff6a00",
        px: { xs: 4.5, sm: 3.5, md: 4 },
        py: { xs: 0.8, md: 1.2 },
        fontWeight: 700,
        borderRadius: 10,
        fontSize: { xs: 12, md: 14 },
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
    display: { xs: "none", sm: "none", md: "block" },  // HIDE ON MOBILE + SMALL TABLETS
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
<Box
  sx={{
    display: "flex",
    justifyContent: "center",
    gap: { xs: 1.5, sm: 3 }, // responsive gap
    mb: 5,
    flexWrap: "wrap",
  }}
>
  {[
    { time: "12", label: "Hours" },
    { time: "23", label: "Minutes" },
    { time: "59", label: "Seconds" },
  ].map((item, i) => (
    <Box
      key={i}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(135deg, #ff6a00, #ff9900)",
        color: "#fff",
        px: { xs: 2, sm: 3 },
        py: { xs: 1.5, sm: 2 },
        borderRadius: 3,
        boxShadow: "0 6px 20px rgba(255, 105, 0, 0.4)",
        minWidth: { xs: 50, sm: 60 },
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 25px rgba(255, 105, 0, 0.5)",
        },
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: { xs: 18, sm: 24 },
          lineHeight: 1,
        }}
      >
        {item.time}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 10, sm: 14 },
          mt: 0.5,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          opacity: 0.9,
        }}
      >
        {item.label}
      </Typography>
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
<Box
  id="about"
  sx={{
    background: "linear-gradient(135deg, #fafafa, #fff)",
    borderRadius: 6,
    my: { xs: 4, md: 8 },
    mx: { xs: 2, md: 6 },
    boxShadow: "0 12px 40px rgba(16,24,40,0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: { xs: 4, md: 6 },
    py: { xs: 6, md: 12 },
  }}
>
  <Box
    sx={{
      width: "100%",
      minHeight: { xs: "auto", md: "80vh" },
      p: { xs: 3, md: 12 },
      background: "linear-gradient(135deg, #fafafa, #fff)",
      borderRadius: 8,
      boxShadow: "0 20px 60px rgba(16,24,40,0.1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: { xs: 6, md: 8 },
    }}
  >
    {/* Logo */}
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        component="img"
        src="/assets/secure.svg"
        alt="ShopEase Logo"
        sx={{ width: { xs: 80, sm: 100, md: 160 }, height: "auto" }}
      />
    </Box>

    {/* Headline */}
    <Typography
      variant="h2"
      sx={{
        fontSize: { xs: 28, sm: 32, md: 48 },
        fontWeight: 900,
        textAlign: "center",
        background: "linear-gradient(#ff9900)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: 0.5,
        lineHeight: 1.2,
        mb: { xs: 2, md: 3 },
      }}
    >
      About ShopEase
    </Typography>

    {/* Paragraph */}
    <Typography
      sx={{
        fontSize: { xs: 14, sm: 16, md: 20 },
        color: "#555",
        textAlign: "center",
        maxWidth: { xs: "90%", sm: 700, md: 900 },
        lineHeight: 1.7,
        mb: { xs: 3, md: 4 },
      }}
    >
      ShopEase is your ultimate online shopping destination. Discover
      premium quality products with exclusive deals, fast delivery,
      secure payments, and a seamless shopping experience across all
      devices. Join thousands of happy customers enjoying our services
      every day.
    </Typography>

    {/* Features */}
    <Box
      id="feature"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(4,1fr)" },
        gap: { xs: 3, md: 6 },
        width: "100%",
        mt: { xs: 3, md: 4 },
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
            p: { xs: 3, sm: 4, md: 5 },
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
          <Box
            component="img"
            src={item.icon}
            alt={item.text}
            sx={{ width: { xs: 50, sm: 60, md: 68 }, height: "auto", mb: 2, p: 1 }}
          />
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 16, md: 18 },
              fontWeight: 700,
              color: "#bababaff",
            }}
          >
            {item.text}
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
</Box>

{/* ================= Featured Products Section ================= */}
<Box sx={{ p: { xs: 2, sm: 3, md: 6 }, mx: { xs: 1, md: 6 }, mt: { xs: 4, md: 8 } }}>
  <Typography
    variant="h1"
    sx={{
      fontWeight: 700,
      textAlign: "center",
      mb: { xs: 3, md: 5 },
      fontSize: { xs: 24, sm: 32, md: 40 },
      color: "#333",
    }}
  >
    Featured Products
  </Typography>

  <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
    {[
      { id: 1, name: "A Premier Air Max", price: 129.99, img: "/assets/shoes/sh1.png" },
      { id: 2, name: "Adidas Ultraboost", price: 149.99, img: "/assets/shoes/sh2.png" },
      { id: 3, name: "Puma RS-X", price: 109.99, img: "/assets/shoes/sh3.png" },
      { id: 4, name: "Reebok Classic", price: 99.99, img: "/assets/shoes/sh4.png" },
      { id: 5, name: "Nike Air Max", price: 129.99, img: "/assets/shoes/sh5.png" },
      { id: 6, name: "Adidas Ultraboost", price: 149.99, img: "/assets/shoes/sh6.png" },
      { id: 7, name: "Puma RS-X", price: 109.99, img: "/assets/shoes/sh7.webp" },
      { id: 8, name: "Reebok Classic", price: 99.99, img: "/assets/shoes/sh4.png" },
    ].map((product) => (
      <Grid item xs={12} sm={6} md={3} key={product.id}>
        <Paper
          sx={{
            p: { xs: 1.5, sm: 2, md: 2.5 },
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
            sx={{
              width: "100%",
              height: { xs: 180, sm: 220, md: 280 },
              objectFit: "cover",
              mb: { xs: 1.5, sm: 2, md: 2 },
            }}
          />
          <Typography sx={{ fontWeight: 700, fontSize: { xs: 14, sm: 16, md: 18 } }}>
            {product.name}
          </Typography>
          <Typography sx={{ color: "#555", mb: { xs: 1.5, sm: 2 }, fontSize: { xs: 12, sm: 14, md: 16 } }}>
            ${product.price.toFixed(2)}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              const cart = JSON.parse(localStorage.getItem("cart")) || [];
              cart.push(product);
              localStorage.setItem("cart", JSON.stringify(cart));
              window.dispatchEvent(new Event("cartUpdated"));
            }}
            sx={{
              textTransform: "none",
              borderRadius: 3,
              fontWeight: "bold",
              height: { xs: 40, sm: 45, md: 50 },
              fontSize: { xs: 12, sm: 14, md: 16 },
              letterSpacing: 0.5,
              background: "linear-gradient(135deg, #000000ff)",
              color: "#fff",
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
    py: { xs: 6, md: 12 },
    px: { xs: 2, sm: 3, md: 8 },
    bgcolor: "#f2f5ff",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* Decorative Background Blobs */}
  <Box
    sx={{
      position: "absolute",
      width: { xs: 200, md: 300 },
      height: { xs: 200, md: 300 },
      bgcolor: "rgba(255,165,0,0.1)",
      borderRadius: "50%",
      top: { xs: -50, md: -80 },
      left: { xs: -50, md: -80 },
      filter: "blur(150px)",
      zIndex: 0,
    }}
  />
  <Box
    sx={{
      position: "absolute",
      width: { xs: 180, md: 250 },
      height: { xs: 180, md: 250 },
      bgcolor: "rgba(107,123,255,0.1)",
      borderRadius: "50%",
      bottom: { xs: -50, md: -70 },
      right: { xs: -50, md: -70 },
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
      mb: { xs: 6, md: 10 },
      fontSize: { xs: 28, sm: 36, md: 48 },
      background: "linear-gradient(90deg,#ff6a00,#ff9900)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      position: "relative",
      zIndex: 1,
    }}
  >
    What Our Customers Say
  </Typography>

  <Grid container spacing={{ xs: 3, md: 6 }} justifyContent="center">
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
            p: { xs: 4, md: 6 },
            borderRadius: 6,
            minHeight: { xs: 220, md: 240 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            background: "linear-gradient(135deg, #ffffff, #f0f3ff)",
            boxShadow: "0 12px 25px rgba(0,0,0,0.06)",
            transition: "all 0.4s ease",
            "&:hover": {
              transform: "translateY(-8px) scale(1.03)",
              boxShadow: "0 20px 45px rgba(0,0,0,0.1)",
            },
          }}
        >
          {/* Avatar Glow */}
          <Box
            sx={{
              position: "absolute",
              top: -2,
              width: { xs: 60, md: 80 },
              height: { xs: 60, md: 80 },
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
              width: { xs: 55, md: 70 },
              height: { xs: 55, md: 70 },
              borderRadius: "50%",
              objectFit: "cover",
              mb: { xs: 3, md: 4 },
              zIndex: 1,
              border: "3px solid #ff6a00",
            }}
          />
          <Typography sx={{ fontWeight: 700, color: "#ff6a00", mb: 1, fontSize: { xs: 14, md: 16 } }}>
            {c.name}
          </Typography>
          <Typography sx={{ color: "#555", fontSize: { xs: 13, md: 15 }, lineHeight: 1.5 }}>
            {c.comment}
          </Typography>
        </Paper>
      </Grid>
    ))}
  </Grid>
</Box>
{/* ================= Modern Contact / Merchant Section ================= */}
<Box
  id="merchants"
  sx={{
    bgcolor: "#fffdf6",
    py: { xs: 6, md: 14 },
    px: { xs: 3, md: 10 },
  }}
>
  <Grid
    container
    spacing={{ xs: 6, md: 8 }}
    alignItems="center"
    justifyContent="center"
    sx={{ maxWidth: 1400, mx: "auto" }}
  >
    {/* ===== Left Text Section ===== */}
    <Grid item xs={12} md={6} sx={{ position: "relative" }}>
      {/* Main Heading */}
      <Typography
        variant="h1"
        sx={{
          fontWeight: 900,
          mb: { xs: 4, md: 8 },
          textAlign: { xs: "center", md: "left" },
          fontFamily: 'Inter, "Circular Std", sans-serif',
          background: "linear-gradient(90deg, #ff6a00, #ff8c42)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: { xs: "2rem", sm: "2.5rem", md: "4rem" },
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
            gap: { xs: 1.5, md: 2 },
            mb: { xs: 4, md: 6 },
            p: { xs: 2, md: 3 },
            borderRadius: 4,
            bgcolor: "#fff",
            boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
            position: "relative",
            transition: "all 0.3s",
            "&:hover": { transform: "translateY(-5px)", boxShadow: "0 15px 30px rgba(0,0,0,0.08)" },
          }}
        >
          {/* Icon & Title */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 2, md: 3 } }}>
            <Box
              sx={{
                width: { xs: 45, md: 60 },
                height: { xs: 45, md: 60 },
                borderRadius: "50%",
                bgcolor: "rgba(100, 115, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(100,115,255,0.08)",
                transition: "all 0.3s",
                "&:hover": { transform: "scale(1.1)", bgcolor: "rgba(100, 115, 255, 0.2)" },
              }}
            >
              <Box
                component="img"
                src={item.icon}
                alt={item.title}
                sx={{ width: { xs: 20, md: 28 }, height: { xs: 20, md: 28 } }}
              />
            </Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontFamily: 'Inter, "Circular Std", sans-serif',
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
              }}
            >
              {item.title}
            </Typography>
          </Box>

          {/* Description */}
          <Typography sx={{ color: "#555", ml: { xs: 0, md: 9 }, mt: { xs: 1, md: 0 } }}>
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
              fontSize: { xs: 13, md: 14 },
              transition: "all 0.2s",
              "&:hover": { textDecoration: "underline", transform: "translateX(2px)" },
            }}
          >
            Learn more
            <Box
              component="img"
              src="/assets/icons/arrow.png"
              alt="Arrow Right"
              sx={{ width: { xs: 12, md: 16 }, height: { xs: 12, md: 16 } }}
            />
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

{/* ================= Modern Large Contact Form Section (ShopEase Style) ================= */}
<Grid
  container
  spacing={4}
  sx={{
    position: "relative",
    py: { xs: 6, md: 12 },
    px: { xs: 3, md: 8 },
    bgcolor: "#f4f4f9",
  }}
>
{/* ===== Left Column: Contact Form (Responsive) ===== */}
<Grid
  item
  xs={12}
  md={6}
  sx={{
    position: "relative",
    zIndex: 2,
    borderRadius: 4,
    p: { xs: 3, sm: 4, md: 6 },
    bgcolor: "linear-gradient(135deg, #ffffff, #f0f3ff)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
    overflow: "hidden",
  }}
>
  {/* Floating Accent Circles */}
  <Box
    sx={{
      position: "absolute",
      width: { xs: 100, sm: 140, md: 180 },
      height: { xs: 100, sm: 140, md: 180 },
      bgcolor: "rgba(107,123,255,0.1)",
      borderRadius: "50%",
      top: { xs: -30, sm: -40, md: -60 },
      left: { xs: -30, sm: -40, md: 0 },
      filter: "blur(50px)",
      zIndex: 0,
    }}
  />
  <Box
    sx={{
      position: "absolute",
      width: { xs: 80, sm: 120, md: 150 },
      height: { xs: 80, sm: 120, md: 150 },
      bgcolor: "rgba(255,106,0,0.1)",
      borderRadius: "50%",
      bottom: { xs: -30, sm: -40, md: -50 },
      left: { xs: -20, sm: -30, md: -50 },
      filter: "blur(40px)",
      zIndex: 0,
    }}
  />

  {/* Headline */}
  <Typography
    variant="h2"
    sx={{
      fontSize: { xs: 26, sm: 30, md: 48 },
      fontWeight: 900,
      textAlign: "center",
      background: "linear-gradient(90deg, #ff9900, #ff6a00)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: 0.5,
      lineHeight: 1.2,
      mb: { xs: 2, sm: 3, md: 3 },
      position: "relative",
      zIndex: 1,
    }}
  >
    Contact Us
  </Typography>

  {/* Description */}
  <Typography
    sx={{
      textAlign: "center",
      color: "#555",
      mb: { xs: 3, md: 4 },
      fontSize: { xs: 14, sm: 15, md: 18 },
      maxWidth: { xs: "100%", sm: 400, md: 500 },
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
      gap: { xs: 2, sm: 2.5, md: 3 },
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
            fontSize: { xs: 10, sm: 14, md: 16 },
            py: 1,
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 6px 18px rgba(107,123,255,0.15)",
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
        py: { xs: 1.5, sm: 1.8, md: 2 },
        borderRadius: 3,
        fontWeight: 700,
        textTransform: "none",
        fontSize: { xs: 14, sm: 15, md: 17 },
        background: "linear-gradient(135deg, #ff9900, #ff6a00)",
        backgroundSize: "200% 200%",
        transition: "all 0.5s ease",
        "&:hover": {
          backgroundPosition: "right center",
          boxShadow: "0 8px 20px rgba(255,106,0,0.35)",
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
    pt: { xs: 8, md: 10 },
    pb: { xs: 4, md: 6 },
    px: { xs: 3, sm: 5, md: 10 },
  }}
>
  {/* ======= Top Section: Locations ======= */}
  <Grid
    container
    spacing={4}
    justifyContent="center"
    sx={{ mb: { xs: 6, md: 10 } }}
  >
    {[
      { title: "Pakistan", address: "Gulberg 3 Lahore" },
      { title: "United States", address: "451 W 42nd St, New York, USA" },
      { title: "Dubai", address: "23rd St – Al Barsha 2, Dubai UAE" },
    ].map((loc, i) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        key={i}
        sx={{
          textAlign: "center",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: { xs: 4, md: 0 },
        }}
      >
        <Box
          sx={{
            width: { xs: 50, sm: 60, md: 70 },
            height: { xs: 50, sm: 60, md: 70 },
            borderRadius: "50%",
            mb: 2,
            bgcolor: "rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: { xs: 24, sm: 28, md: 34 },
          }}
        >
          🏛️
        </Box>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, fontSize: { xs: 16, sm: 17, md: 18 } }}
        >
          {loc.title}
        </Typography>
        <Typography
          sx={{
            color: "#aaa",
            fontSize: { xs: 12, sm: 13, md: 14 },
            mt: 1,
            textAlign: "center",
          }}
        >
          {loc.address}
        </Typography>
      </Grid>
    ))}
  </Grid>

  {/* ======= Middle Footer ======= */}
  <Grid
    container
    spacing={4}
    sx={{
      justifyContent: { xs: "center", md: "flex-start" },
      textAlign: { xs: "center", md: "left" },
    }}
  >
    {/* Column 1: Logo + About */}
    <Grid item xs={12} sm={6} md={3} sx={{ mb: { xs: 6, md: 0 } }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 900,
          mb: 2,
          color: "#ffbf00ff",
          letterSpacing: 1,
          fontSize: { xs: 20, md: 22 },
        }}
      >
        ShopEase
      </Typography>
      <Typography
        sx={{
          color: "#bbb",
          fontSize: { xs: 12, md: 14 },
          mb: 3,
          lineHeight: 1.6,
        }}
      >
        ShopEase offers premium ecommerce products with fast delivery and high-quality service. We connect you to trusted brands worldwide.
      </Typography>

      <Typography
        sx={{
          fontWeight: 700,
          color: "#ffbf00ff",
          mb: 1,
          fontSize: { xs: 12, md: 14 },
        }}
      >
        OUR LOCATION
      </Typography>
      <Typography sx={{ color: "#bbb", fontSize: { xs: 12, md: 14 } }}>
        Delivering worldwide with fulfillment centers in Asia, Europe, and USA.
      </Typography>
    </Grid>

    {/* Column 2: About Links */}
    <Grid item xs={12} sm={6} md={2} sx={{ mb: { xs: 4, md: 0 } }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 2,
          color: "#ffbf00ff",
          fontSize: { xs: 16, md: 18 },
        }}
      >
        ABOUT US
      </Typography>
      {[
        "About Us",
        "Blog",
        "Contact Us",
        "Privacy Policy",
        "Terms of Use",
        "Refund Policy",
      ].map((link) => (
        <Typography
          key={link}
          sx={{
            fontSize: { xs: 12, md: 14 },
            color: "#bbb",
            mb: 1,
            cursor: "pointer",
            "&:hover": { color: "#fff" },
          }}
        >
          {link}
        </Typography>
      ))}
    </Grid>

    {/* Column 3: Categories */}
    <Grid item xs={12} sm={6} md={2} sx={{ mb: { xs: 4, md: 0 } }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 2,
          color: "#ffbf00ff",
          fontSize: { xs: 16, md: 18 },
        }}
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
            fontSize: { xs: 12, md: 14 },
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

    {/* Column 4: Tools */}
    <Grid item xs={12} sm={6} md={2} sx={{ mb: { xs: 4, md: 0 } }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 2,
          color: "#ffbf00ff",
          fontSize: { xs: 16, md: 18 },
        }}
      >
        TOOLS
      </Typography>
      {["Track Order", "Size Guide", "Gift Cards", "FAQ", "Help Center"].map(
        (tool) => (
          <Typography
            key={tool}
            sx={{
              fontSize: { xs: 12, md: 14 },
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

    {/* Column 5: Contacts + Social */}
    <Grid item xs={12} sm={6} md={3} sx={{ mb: { xs: 4, md: 0 } }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 2,
          color: "#ffbf00ff",
          fontSize: { xs: 16, md: 18 },
        }}
      >
        CONTACTS
      </Typography>
      <Typography sx={{ color: "#bbb", mb: 1, fontSize: { xs: 12, md: 14 } }}>
        Phone: +92 (321) 5658565
      </Typography>
      <Typography sx={{ color: "#bbb", mb: 3, fontSize: { xs: 12, md: 14 } }}>
        Email: info@shopease.com
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: { xs: 1, md: 2 },
          flexWrap: "wrap",
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map(
          (Icon, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: 32, md: 36 },
                height: { xs: 32, md: 36 },
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
    mt: { xs: 6, md: 8 },
    pt: 3,
    fontSize: { xs: 11, md: 13 },
    color: "#999",
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    flexWrap: "wrap",
  }}
>
  <Box>© {new Date().getFullYear()} ShopEase. All rights reserved.</Box>

  {/* Hidden on mobile */}
  <Box sx={{ display: { xs: "none", md: "block" } }}>|</Box>
  <Box sx={{ display: { xs: "none", md: "block" } }}>Privacy Policy</Box>
  <Box sx={{ display: { xs: "none", md: "block" } }}>|</Box>
  <Box sx={{ display: { xs: "none", md: "block" } }}>Refund Policy</Box>
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
