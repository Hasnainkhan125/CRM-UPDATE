import React, { useState, useEffect , useContext } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  AppBar,
  Toolbar,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { ColorModeContext } from "../../theme";
import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";


const sectionMap = {
  Home: "aboutSection",
  About: "investSection",
  Service: "resourcesSection",
  Data: "companySection",
  Clients: "alphaSection",
  Contact: "servicesSection",
};





const HomePage = () => {
  const navigate = useNavigate();

// 🌓 Theme mode state from localStorage
const colorMode = useContext(ColorModeContext);
const [themeMode, setThemeMode] = useState(localStorage.getItem("themeMode") || "dark");

// Keep it in sync when toggled
useEffect(() => {
  document.body.setAttribute("data-theme", themeMode);
  localStorage.setItem("themeMode", themeMode);
}, [themeMode]);


  // 🔹 Navbar scroll-hide logic
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) setShowNavbar(false);
    else setShowNavbar(true);
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, );

    return (
  <Box
    sx={{
      minHeight: "100vh",
    position: "relative",
      fontFamily: "Inter, sans-serif",
      transition: "all 0.4s ease-in-out",
      color: themeMode === "dark" ? "#fff" : "#111827",
      backgroundColor: themeMode === "dark" ? "#0a0018" : "#f9fafb",
    }}
  >
    {/* 🔹 Navbar with scroll hide */}
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 100,
      }}
    >

<AppBar
  position="fixed"
  elevation={0}
  sx={{
    width: "75%",
    mx: "auto",
    left: "50%",
    transform: "translateX(-50%)",
    mt: 2,
    borderRadius: "50px",

    // 🌑 MATCH YOUR DARK BACKGROUND COLOR
    background:
      themeMode === "dark"
        ? "rgba(18, 1, 38, 0.55)"   // ← glass version of #120126ff
        : "rgba(255, 255, 255, 0.7)",

    // 🌑 PURPLE NEON GLOW
    boxShadow:
      themeMode === "dark"
        ? "0 0 18px rgba(164, 69, 255, 0.45)" // purple glow
        : "0 4px 20px rgba(39,39,39,0.07)",

    // 🌑 PURPLE BORDER
    border:
      themeMode === "dark"
        ? "1px solid rgba(164, 69, 255, 0.55)"
        : "1px solid rgba(200,200,200,0.4)",

    backdropFilter: "blur(14px)",
    px: 4,
    transition: "0.3s ease",
  }}
>
  <Toolbar
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "75px",
    }}
  >
    {/* 🔹 Logo */}
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <img
        src="/assets/logo/logo1.png"
        alt="Hu Visa Logo"
        style={{
          height: "44px",
          cursor: "pointer",
          transition: "0.3s",
        }}
        onClick={() => navigate("/")}
      />
    </Box>

    {/* 🔹 Navigation */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
      {["Home", "About", "Service", "Data", "Clients", "Contact"].map(
        (item) => (
          <Button
            key={item}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              fontSize: "1.05rem",
              color: themeMode === "dark" ? "#f5f5f5" : "#1f2937",
              "&:hover": {
                transform: "translateY(-2px)",
                color: "#a445ff", // purple hover
              },
            }}
            onClick={() => {
              const id = sectionMap[item];
              document.getElementById(id)?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            {item}
          </Button>
        )
      )}
    </Box>

    {/* 🔹 Right Side */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <IconButton
        onClick={() => {
          colorMode.toggleColorMode();
          setThemeMode(prev => prev === "light" ? "dark" : "light");
        }}
        sx={{
          color: themeMode === "dark" ? "#fff" : "#111",
          "&:hover": { transform: "scale(1.15)" },
        }}
      >
        {themeMode === "light" ? <DarkMode /> : <LightMode />}
      </IconButton>

      {/* Login button */}
      <Button
        variant="outlined"
        onClick={() => navigate("/login")}
        sx={{
          borderRadius: "50px",
          width: "100px",
          height: "44px",
          textTransform: "none",
          fontWeight: 500,
          color: themeMode === "dark" ? "#fff" : "#111",
          borderColor:
            themeMode === "dark"
              ? "rgba(164,69,255,0.65)"
              : "rgba(0,0,0,0.25)",
          "&:hover": {
            borderColor: "#a445ff",
            background:
              themeMode === "dark"
                ? "rgba(164,69,255,0.15)"
                : "rgba(164,69,255,0.12)",
          },
        }}
      >
        Login
      </Button>

      {/* Register button */}
      <Button
        variant="contained"
        onClick={() => navigate("/register")}
        sx={{
          borderRadius: "50px",
          width: "140px",
          height: "49px",
          textTransform: "none",
          fontWeight: 600,
          background:
            themeMode === "dark"
              ? "#a445ff" // purple
              : "#007acc",
          color: "#fff",
          transition: '0.4s',
          "&:hover": {
            transform: "scale(1.05)",
            background:
              themeMode === "dark"
                ? "#872ee6"
                : "#0289e2ff",
          },
        }}
      >
        Register
      </Button>
    </Box>
  </Toolbar>
</AppBar>

    </motion.div>



{/* 🔹 Hero Section - Fullstack Portfolio */}
<Box
  id="heroSection"
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100vh",
    px: { xs: 3, md: 10 },
    background: themeMode === "dark"
      ? `radial-gradient(
          circle at top left,
          #1a0f2cff 0%,
          #120120ff 40%,
          #0c0029ff 100%
        )`
      : "radial-gradient(circle at top left, #ffffff, #e6e6e6)",
    color: themeMode === "dark" ? "#fff" : "#111",
    transition: "all 0.5s ease-in-out",
    overflow: "hidden",
  }}
>

  {/* Left Content */}
  <Box sx={{ flex: 1, maxWidth: "600px" }}>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Skills Line */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        {["React", "Node.js", "TypeScript", "MongoDB","Java"].map((skill, i) => (
          <Box
            key={i}
            sx={{
              px: 2,
              py: 1,
              borderRadius: "20px",
              bgcolor: themeMode === "dark" ? "rgba(14, 0, 26, 0.86)" : "#f0f0f0",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "default",
            }}
          >
            {skill}
          </Box>
        ))}
      </Box>

<Typography
  variant="h2"
  sx={{
    fontWeight: 700,
    mb: 2,
    lineHeight: 1.1,
    fontSize: { xs: "3.2rem", md: "4.5rem" },
    color: themeMode === "dark" ? "#fff" : "#000",
  }}
>
  I'm{" "}
  <Box
    component="span"
    sx={{
      background: themeMode === "dark"
        ? "linear-gradient(90deg, #00ffcc, #00aaff, #00ffcc)"
        : "linear-gradient(90deg, #007acc, #00b4d8, #007acc)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animation: "gradientFlow 4s ease infinite",
      backgroundSize: "200% 100%",
      fontWeight: 800,
    }}
  >
    Hasnain Khan
  </Box>
  <br />
  Fullstack Developer.
</Typography>

<style>
{`
@keyframes gradientFlow {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 0%; }
  100% { background-position: 0% 0%; }
}
`}
</style>


      <Typography
        variant="h6"
        sx={{
          mb: 4,
          color: themeMode === "dark" ? "#a0aec0" : "#555",
          maxWidth: 500,
          lineHeight: 1.6,
          fontSize: "1.3rem",
        }}
      >
        I build scalable web apps and sleek UIs. My focus is on React, Node.js, and
        modern JavaScript ecosystems to deliver production-ready projects.
      </Typography>

{/* Modern CTA Buttons with 50px Border Radius */}
  <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
  {/* Primary Button - high contrast */}
      {/* Register button */}
      <Button
        variant="contained"
        onClick={() => navigate("/viewproject")}
        sx={{
          borderRadius: "50px",
           padding: "16px 40px",
          textTransform: "none",
         fontSize: "1rem",
         backdropFilter: "blur(8px)",
          background:
            themeMode === "dark"
              ? "#a445ff" // purple
              : "#007acc",
          color: "#fff",
          transition: '0.4s',
          "&:hover": {
            transform: "scale(1.05)",
            textDecoration: 'underline',
            background:
              themeMode === "dark"
                ? "#872ee6"
                : "#0289e2ff",
          },
        }}
      >
        VIEW PROJECTS
      </Button>
{/* Secondary Button - Modern 3D Glass Outline */}
<motion.div
  whileHover={{
    scale: 1.04,
    rotateX: 6,
    rotateY: -6,
  }}
  transition={{ type: "spring", stiffness: 200, damping: 12 }}
  style={{ borderRadius: "50px" }}
>
  <Button
    variant="outlined"
    sx={{
      borderColor: themeMode === "dark" ? "#00ffcc" : "#007acc",
      color: themeMode === "dark" ? "#00ffcc" : "#007acc",
      fontWeight: 700,
      fontSize: "1rem",
      padding: "16px 40px",
      borderRadius: "50px",
      backdropFilter: "blur(8px)",
      background: themeMode === "dark"
        ? "rgba(0,255,204,0.07)"
        : "rgba(0,122,204,0.07)",
      boxShadow: themeMode === "dark"
        ? "0 0 18px rgba(0,255,204,0.15)"
        : "0 0 18px rgba(0,122,204,0.15)",
      transition: "all 0.3s ease",

      "&:hover": {
        borderColor: themeMode === "dark" ? "#00ffcc" : "#0099ff",
        color: themeMode === "dark" ? "#00ffcc" : "#0099ff",
        boxShadow: themeMode === "dark"
          ? "0 0 25px rgba(61, 61, 61, 0.45)"
          : "0 0 25px rgba(0,122,204,0.35)",
      },
    }}
    onClick={() => navigate("/contact")}
  >
    Contact Me
  </Button>
</motion.div>

</Box>

    </motion.div>
  </Box>

 {/* Right - 3D Styled Project Image with Conditional Border */}
<Box
  sx={{
    flex: 1,
    display: { xs: "none", md: "flex" },
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: "50px",
  }}
>
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 1, ease: "easeOut" }}
    whileHover={{ scale: 1.03, rotateX: -19, rotateY: 5 }}
    style={{
      width: "100%",
      maxWidth: 700,
      borderRadius: "24px",
      padding: "6px",
      background: "transparent", // no background
      boxShadow: "0 15px 40px rgba(0,0,0,0.1)", // subtle shadow
      perspective: "1000px",
      position: "relative",
      cursor: "default",
    }}
  >
    <motion.div
      style={{
        borderRadius: "20px",
        overflow: "hidden",
        willChange: "transform",
        border: "none",
      }}
      animate={{
        rotateY: [0, 2, -2, 1, 0], // subtle floating rotation
        rotateX: [0, -1, 1, -0.5, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.img
        src="/assets/icons/robot.png"
        alt="Project Screenshot"
        style={{
          width: "100%",
          maxWidth: "700px",
          display: "block",
          borderRadius: "20px",
        }}
      />
    </motion.div>
  </motion.div>
</Box>

</Box>

{/* 🔹 Modern Continuous Tech Scroll Section */}
<Box
  sx={{
    py: 5,
    px: { xs: 3, md: 8 },
    background:
      themeMode === "dark"
        ? "radial-gradient(circle at top left, #140028, #050012)"
        : "radial-gradient(circle at top left, #ffffff, #e6e6e6)",
    overflow: "hidden",
    position: "relative",
    transition: "all 0.5s ease-in-out",
  }}
>
{/* Title */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
{/* Heading */}
<Typography
  variant="h6"
  sx={{
    textAlign: "center",
    mb: 2,
    fontFamily: `"Orbitron", "Poppins", "Montserrat", sans-serif`,
    fontSize: { xs: "2.4rem", md: "3rem" },
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    fontWeight: '900',
    background: themeMode === "dark" ? "#a445ff" : "#007acc",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    cursor: "pointer",
    transition: "0.4s ease",
    "&:hover": {
      transform: "scale(1.05)",
      textDecoration: "underline",
      background: themeMode === "dark" ? "#ffffffff" : "#0289e2ff",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
  }}
>
  MY SKILLS
</Typography>

{/* Short description */}
<Typography
  sx={{
    textAlign: "center",
    color: themeMode === "dark" ? "#d1d5db" : "#4b5563",
    fontSize: { xs: "1rem", md: "1.10rem" },
    maxWidth: 600,
    mx: "auto",
    mb: 6,
    lineHeight: 1.6,
  }}
>
 The tools and technologies I use to build modern, scalable web applications from frontend to backend.
</Typography>

</motion.div>



  <Box sx={{ display: "flex", whiteSpace: "nowrap", width: "200%" }}>
  <motion.div
    animate={{ x: ["0%", "-50%"] }}
    transition={{
      repeat: Infinity,
      duration: 35,
      ease: "linear",
    }}
    style={{ display: "flex", alignItems: "center", gap: "70px" }}
  >
    {[
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", name: "Java" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", name: "C++" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", name: "JavaScript" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", name: "React JS" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", name: "Node.js" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", name: "Python" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", name: "TypeScript" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", name: "HTML5" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", name: "CSS3" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", name: "MongoDB" },
    ]
      .concat([
        { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", name: "Java" },
        { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", name: "C++" },
        { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", name: "JavaScript" },
        { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", name: "React JS" },
        { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", name: "Node.js" },
        { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", name: "Python" },
        { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", name: "TypeScript" },
        { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", name: "HTML5" },
        { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", name: "CSS3" },
        { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", name: "MongoDB" },
      ])
      .map((tech, i) => (
        <motion.div
          key={i}
          whileHover={{
            scale: 1.2,
            y: -10,
            rotate: 5,
            boxShadow: themeMode === "dark"
              ? "0 15px 35px rgba(255, 255, 255, 0.2)"
              : "0 15px 35px rgba(0, 0, 0, 0.15)",
          }}
          transition={{ duration: 0.3 }}
          style={{
            textAlign: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {/* Glass Card */}
          <Box
            sx={{
              width: 90,
              height: 90,
              borderRadius: "20px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 1,
              background: themeMode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: themeMode === "dark"
                ? "1px solid rgba(255,255,255,0.2)"
                : "1px solid rgba(255,255,255,0.3)",
              transition: "0.3s ease-in-out",
            }}
          >
            <img
              src={tech.src}
              alt={tech.name}
              style={{ width: "70%", height: "70%", objectFit: "contain" }}
            />
          </Box>

          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "0.85rem",
              mt: 1,
              color: themeMode === "dark" ? "#fff" : "#222",
            }}
          >
            {tech.name}
          </Typography>
        </motion.div>
      ))}
  </motion.div>
</Box>
</Box>

{/* 🌟 Modern Our Services Section with Zoom-Out Animation */}
<motion.div
  initial={{ opacity: 0, scale: 1.15 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1.2, ease: "easeOut" }}
  viewport={{ once: true }}
>
  <Box
    sx={{
      py: 18,
      px: { xs: 3, md: 12 },
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      color: themeMode === "dark" ? "#f9fafb" : "#111827",
      background:
        themeMode === "dark"
          ? "radial-gradient(circle at top left, #0a0018, #050012)"
          : "radial-gradient(circle at top left, #ffffff, #f2f2f2)",
      transition: "all 0.5s ease-in-out",
    }}
  >
    {/* Decorative Gradient Glows */}
    <Box
      sx={{
        position: "absolute",
        top: "-15%",
        left: "-10%",
        width: "50%",
        height: "80%",
        background:
          themeMode === "dark"
            ? "radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)"
            : "radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%)",
        filter: "blur(100px)",
        zIndex: 0,
      }}
    />
    <Box
      sx={{
        position: "absolute",
        bottom: "-15%",
        right: "-10%",
        width: "50%",
        height: "70%",
        background:
          themeMode === "dark"
            ? "radial-gradient(circle, rgba(236,72,153,0.15), transparent 70%)"
            : "radial-gradient(circle, rgba(236,72,153,0.1), transparent 70%)",
        filter: "blur(120px)",
        zIndex: 0,
      }}
    />

    {/* Heading */}
    <Box sx={{ position: "relative", zIndex: 1 }}>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Typography
          variant="overline"
          sx={{
            color: themeMode === "dark" ? "#9ca3af" : "#6b7280",
            letterSpacing: 3,
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          Our Services
        </Typography>

        <Typography
          variant="h1"
          sx={{
            mt: 1,
            fontWeight: 900,
            mb: 6,
            textTransform: "uppercase",
            fontSize: { xs: "2.5rem", md: "4.5rem" },
            background:
              themeMode === "dark"
                ? "linear-gradient(90deg, #a445ff, #a445ff)"
                : "linear-gradient(90deg, #0080ffff, #0080ffff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          What I Can Do
        </Typography>

        <Typography
          sx={{
            maxWidth: 900,
            mx: "auto",
            color: themeMode === "dark" ? "#d1d5db" : "#4b5563",
            mb: 12,
            fontSize: "1.2rem",
            lineHeight: 1.8,
          }}
        >
          I provide end-to-end solutions for web applications, including CRM development, UI/UX design, API integration, payment solutions, and more — tailored for performance, scalability, and stunning user experience.
        </Typography>
      </motion.div>

      {/* 🔹 Services Grid */}
      <Grid container spacing={4} justifyContent="center">
        {[
          {
            icon: "https://cdn-icons-png.flaticon.com/512/2919/2919600.png",
            title: "CRM Projects",
            desc: "Design and develop custom CRM solutions to streamline business processes and manage customer relationships effectively.",
          },
          {
            icon: "https://cdn-icons-png.flaticon.com/512/2919/2919637.png",
            title: "UI/UX Design",
            desc: "Create intuitive, modern, and user-friendly interfaces that enhance user engagement and deliver seamless experiences.",
          },
          {
            icon: "https://cdn-icons-png.flaticon.com/512/2919/2919683.png",
            title: "API Management",
            desc: "Develop and integrate robust APIs to connect applications, enabling smooth data flow and enhanced system functionality.",
          },
          {
            icon: "https://cdn-icons-png.flaticon.com/512/2919/2919697.png",
            title: "Payment Integration",
            desc: "Implement secure and reliable payment solutions, including gateways and wallets, for smooth online transactions.",
          },
          {
            icon: "https://cdn-icons-png.flaticon.com/512/2919/2919673.png",
            title: "Workflow Automation",
            desc: "Automate business processes and repetitive tasks to improve efficiency and reduce manual errors.",
          },
          {
            icon: "https://cdn-icons-png.flaticon.com/512/2919/2919652.png",
            title: "Cloud Deployment",
            desc: "Deploy and manage applications on cloud platforms to ensure scalability, high availability, and performance.",
          },
        ].map((service, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: false }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 5,
                  borderRadius: 5,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    themeMode === "dark"
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(255,255,255,0.25)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border:
                    themeMode === "dark"
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "1px solid rgba(255,255,255,0.3)",
                  boxShadow:
                    themeMode === "dark"
                      ? "0 8px 30px rgba(0,0,0,0.3)"
                      : "0 8px 30px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.05)",
                    boxShadow:
                      themeMode === "dark"
                        ? "0 12px 40px rgba(124,58,237,0.25)"
                        : "0 12px 40px rgba(124,58,237,0.15)",
                  },
                }}
              >
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={service.icon}
                    alt={service.title}
                    style={{
                      width: "128px",
                      height: "120px",
                      borderRadius: "50%",
                      objectFit: "contain",
                      marginBottom: "16px",
                      padding: "8px",
                      background: themeMode === "dark" ? "#1e1b29" : "white",
                    }}
                  />
                </motion.div>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: themeMode === "dark" ? "#fff" : "#111827",
                  }}
                >
                  {service.title}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    color: themeMode === "dark" ? "#a9a9a9ff" : "#4b5563",
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                  }}
                >
                  {service.desc}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Box
          sx={{
            mt: 14,
            height: 3,
            width: 180,
            mx: "auto",
            background:
              themeMode === "dark"
                ? "linear-gradient(90deg, #a78bfa, #ec4899, #a78bfa)"
                : "linear-gradient(90deg, #7c3aed, #ec4899, #7c3aed)",
            borderRadius: 3,
            transition: "all 0.5s ease-in-out",
          }}
        />
      </motion.div>

      {/* Subtext */}
      <Typography
        sx={{
          mt: 6,
          color: themeMode === "dark" ? "#9ca3af" : "#6b7280",
          fontSize: "1.15rem",
          maxWidth: 720,
          mx: "auto",
          lineHeight: 1.8,
          textAlign: "center",
          transition: "color 0.4s ease-in-out",
        }}
      >
        I craft modern, scalable web applications that seamlessly connect front-end interfaces with back-end systems, automate workflows, and deliver smooth, intuitive user experiences.
      </Typography>
    </Box>
  </Box>
</motion.div>



{/* 🔥 Premium Insights / Analytics Section */}
<Box
  id="resourcesSection"
  sx={{
    py: { xs: 10, md: 16 },
    px: { xs: 3, md: 10 },
    background:
      themeMode === "dark"
        ? "linear-gradient(180deg, #0a0118 0%, #140028 100%)"
        : "linear-gradient(180deg, #ffffff 0%, #f3f4f7 100%)",
    color: themeMode === "dark" ? "#f8fafc" : "#1e293b",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* 🔹 Background Bubbles (only in dark mode) */}
  {themeMode === "dark" &&
    Array.from({ length: 8 }).map((_, i) => {
      const size = 20 + Math.random() * 60;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const colors = [
        "rgba(167,139,250,0.3)",
        "rgba(236,72,153,0.3)",
        "rgba(59,130,246,0.25)",
        "rgba(16,185,129,0.25)",
        "rgba(234,179,8,0.25)",
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      return (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${color}, transparent 70%)`,
            top: `${top}%`,
            left: `${left}%`,
            filter: "blur(14px)",
            transform: `rotate(${Math.random() * 360}deg)`,
            animation: `floatBubble ${5 + Math.random() * 8}s ease-in-out infinite alternate`,
            zIndex: 0,
          }}
        />
      );
    })}

  {/* 🔹 Content Wrapper */}
  <Box sx={{ position: "relative", zIndex: 1 }}>
    {/* Place your existing content here */}
  </Box>

  {/* 🔹 Bubble Animation Keyframes */}
  <style>
    {`
      @keyframes floatBubble {
        0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
        25% { transform: translateY(-15px) translateX(10px) rotate(45deg); }
        50% { transform: translateY(-25px) translateX(-10px) rotate(90deg); }
        75% { transform: translateY(-15px) translateX(5px) rotate(135deg); }
        100% { transform: translateY(0px) translateX(0px) rotate(360deg); }
      }
    `}
  </style>


  {/* Noise Overlay */}
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      opacity: themeMode === "dark" ? 0.05 : 0.08,
      backgroundImage:
        "url(https://upload.wikimedia.org/wikipedia/commons/5/5f/Noise_Texture.png)",
      backgroundSize: "300px",
      pointerEvents: "none",
    }}
  />

  {/* Neon Gradient Orbs */}
  <Box
    sx={{
      position: "absolute",
      top: "-10%",
      left: "-10%",
      width: "45%",
      height: "45%",
      filter: "blur(120px)",
      background:
        themeMode === "dark"
          ? "rgba(167,139,250,0.27)"
          : "rgba(124,58,237,0.14)",
    }}
  />

  <Box
    sx={{
      position: "absolute",
      bottom: "-10%",
      right: "-5%",
      width: "45%",
      height: "45%",
      filter: "blur(140px)",
      background:
        themeMode === "dark"
          ? "rgba(236,72,153,0.22)"
          : "rgba(236,72,153,0.14)",
    }}
  />

  {/* ================= MODERN INSIGHTS SECTION ================= */}
<Box
  sx={{
    py: 14,
    px: { xs: 3, md: 10 },
    background:
      themeMode === "dark"
        ? "radial-gradient(circle at top, #0a0118, #050011)"
        : "linear-gradient(180deg, #fdfdfd, #f3f4f6)",
    color: themeMode === "dark" ? "#f3f4f6" : "#111827",
    position: "relative",
    overflow: "hidden",
  }}
>

  {/* ===== Decorative Glow Elements ===== */}
  <Box
    sx={{
      position: "absolute",
      top: "-10%",
      left: "-10%",
      width: "45%",
      height: "45%",
      background:
        themeMode === "dark"
          ? "radial-gradient(circle, rgba(124,58,237,0.28), transparent 70%)"
          : "radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)",
      filter: "blur(120px)",
    }}
  />
  <Box
    sx={{
      position: "absolute",
      bottom: "-15%",
      right: "-10%",
      width: "55%",
      height: "55%",
      background:
        themeMode === "dark"
          ? "radial-gradient(circle, rgba(236,72,153,0.28), transparent 70%)"
          : "radial-gradient(circle, rgba(236,72,153,0.12), transparent 70%)",
      filter: "blur(120px)",
    }}
  />

  {/* ================= HERO: IMAGE + TEXT SIDE BY SIDE ================= */}
  <Grid container spacing={6} alignItems="center">
    {/* TEXT SIDE */}
    <Grid item xs={12} md={6}>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
<Typography
  variant="overline"
  sx={{
    color: themeMode === "dark" ? "#8b5cf6" : "#6d28d9",
    letterSpacing: "0.25em",
    fontWeight: 700,
    opacity: 0.9,
    textTransform: "uppercase",
  }}
>
  expertise & Analytics
</Typography>

<Typography
  variant="h1"
  sx={{
    mt: 1,
    mb: 2.5,
  fontSize: "4.2rem",
    lineHeight: 1.15,
    fontFamily: `"Poppins", "Montserrat", "Inter", sans-serif`,
    background: themeMode === "dark"
      ? "linear-gradient(90deg, #c084fc, #f472b6, #818cf8)"
      : "linear-gradient(90deg, #7c3aed, #db2777, #4f46e5)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
>
  Smarter Insights Faster Decisions.
</Typography>

<Typography
  sx={{
    fontSize: "1.2rem",
    color: themeMode === "dark" ? "#e5e7eb" : "#374151",
    lineHeight: 1.85,
    maxWidth: 640,
    opacity: 0.9,
    fontFamily: `"Inter", "Poppins", sans-serif`,
    mt: 2,
  }}
>
From insights to action—instantly. CRM Nexus breaks down complex behavior into clean, data-driven 
intelligence so your team can decide faster, operate smarter, and scale confidently.
</Typography>

      </motion.div>
    </Grid>

    {/* IMAGE SIDE */}
    <Grid item xs={12} md={6}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1 }}
      >
<Box
  component="img"
  src="/assets/icons/card.png"   // ✅ your local asset
  alt="Analytics Dashboard"
  sx={{
    width: { xs: "100%", sm: "90%", md: "75%" },
    height: "auto",
    maxHeight: 420,
    borderRadius: 4,
    objectFit: "cover",

    // 3D effect
    transformStyle: "preserve-3d",
    perspective: 1000,

    // Shadow only in dark mode
    boxShadow: themeMode === "dark" 
      ? "0 20px 60px rgba(124,58,237,0.25), 0 10px 30px rgba(124,58,237,0.15)" 
      : "none",

    transition: "transform 0.5s ease, box-shadow 0.5s ease",
    mx: "auto",
    display: "block",

    "&:hover": {
      transform: "scale(1.05) rotateX(6deg) rotateY(6deg)",
      boxShadow: themeMode === "dark"
        ? "0 30px 80px rgba(167,139,250,0.35), 0 15px 50px rgba(124,58,237,0.2)"
        : "none",
    },
  }}
/>


      </motion.div>
    </Grid>
  </Grid>

  {/* ================= FEATURE CARDS ================= */}
  <Grid container spacing={4} sx={{ mt: 10 }}>
    {[
  {
    icon: "/assets/possibility.png", // ✅ your local image
    title: "AI Performance Tracking",
    desc: "AI‑driven predictions that help you understand trends and forecast results instantly.",
  },
  {
    icon: "/assets/payment.png", // ✅ your local image
    title: "Customer Intelligence",
    desc: "Break down customer behavior and uncover insights that drive conversions.",
  },
  {
    icon: "/assets/pay.png", // ✅ your local image
    title: "Sequre Payment ",
    desc: "Receive weekly, monthly and on‑demand performance reports generated automatically.",
  },
  {
    icon: "/assets/se3.png", // ✅ your local image
    title: "Live Heat Mapping",
    desc: "Visualize top–performing regions, products and funnels in real time using heat maps.",
  },

    ].map((item, i) => (
      <Grid item xs={12} sm={6} md={3} key={i}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
        >
          <Paper
            sx={{
              p: 4,
              borderRadius: 5,
              height: "100%",
              background:
                themeMode === "dark"
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(255,255,255,0.9)",
              border:
                themeMode === "dark"
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(0,0,0,0.05)",
              backdropFilter: "blur(15px)",
              textAlign: "center",
              transition: "0.4s",
              "&:hover": {
                transform: "translateY(-12px)",
                boxShadow:
                  themeMode === "dark"
                    ? "0 20px 50px rgba(167,139,250,0.35)"
                    : "0 20px 40px rgba(124,58,237,0.18)",
                border:
                  "1px solid rgba(167,139,250,0.4)",
              },
            }}
          >
            <Box
              component="img"
              src={item.icon}
              sx={{
                width: 95,
                mb: 5,
                filter:
                  themeMode === "dark"
                    ? "drop-shadow(0 0 12px rgba(167,139,250,0.5))"
                    : "drop-shadow(0 0 6px rgba(124,58,237,0.3))",
              }}
            />

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color:
                  themeMode === "dark" ? "#00ffddff" : "#7c3aed",
                mb: 1,
              }}
            >
              {item.title}
            </Typography>

            <Typography
              sx={{
                fontSize: "0.95rem",
                color:
                  themeMode === "dark" ? "#d8d8e5" : "#475569",
              }}
            >
              {item.desc}
            </Typography>
          </Paper>
        </motion.div>
      </Grid>
    ))}
  </Grid>

  {/* Divider */}
  <Box
    sx={{
      mt: 12,
      width: 140,
      height: 3,
      mx: "auto",
      borderRadius: 2,
      background:
        themeMode === "dark"
          ? "linear-gradient(90deg, #a78bfa, #ec4899)"
          : "linear-gradient(90deg, #7c3aed, #ec4899)",
    }}
  />

  {/* Closing Statement */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    <Typography
      textAlign="center"
      sx={{
        mt: 6,
        maxWidth: 700,
        mx: "auto",
        fontSize: "1.15rem",
        color: themeMode === "dark" ? "#d1d5db" : "#475569",
        lineHeight: 1.75,
      }}
    >
      CRM Nexus turns complexity into clarity — giving teams the power
      to move faster, think smarter, and grow confidently.
    </Typography>
  </motion.div>
</Box>
</Box>



{/* 🔹 ABOUT SECTION — PERSONAL PORTFOLIO VERSION */}
<Box
  id="about"
  sx={{
    py: 12,
    px: { xs: 2, md: 10 },
    background:
      themeMode === "dark"
        ? "radial-gradient(circle at top left, #140028, #050012)"
        : "linear-gradient(180deg, #ffffff, #f9fafb)",
    color: themeMode === "dark" ? "#f3f4f6" : "#111827",
    transition: "all 0.4s ease-in-out",
  }}
>
  <Grid container spacing={6} alignItems="center" justifyContent="center">

    {/* 🔸 LEFT COLUMN — IMAGE + OVERLAY */}
    <Grid item xs={12} md={5}>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          perspective: "1000px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "80%",
            borderRadius: "24px",
            overflow: "hidden",
            cursor: "pointer",
            transition: "all 0.5s ease",
            "&:hover .infoOverlay": {
              opacity: 1,
              transform: "translateY(0)",
            },
          }}
        >

{/* PROFILE IMAGE */}
<motion.img
  src="/assets/Gemini_Generated_Image_jwzcqvjwzcqvjwzc.png" // <-- your local image
  alt="Developer Portrait"
  style={{
    width: "90%",
    background: "black",
    height: "auto",
    borderRadius: "24px",
    display: "block",
    transformStyle: "preserve-3d",
    transition: "all 0.6s ease",
    filter: themeMode === "dark"
      ? "brightness(1.1) contrast(1.2) saturate(1.2) drop-shadow(0 0 10px #1e003b)"
      : "brightness(1) contrast(1.1) saturate(1.1) drop-shadow(0 0 15px #7c3aed55)",
  }}
  whileHover={{
    scale: 1.05,
    rotateY: 5,
    rotateX: -2,
  }}
/>

{/* OVERLAY */}
<Box
  className="infoOverlay"
  sx={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "24px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: { xs: "center", md: "flex-start" },
    padding: { xs: "24px", md: "48px" },
    opacity: 0,
    transform: "translateY(20px)",
    transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
    backdropFilter: "blur(12px) saturate(120%)",
    background:
      themeMode === "dark"
        ? "linear-gradient(135deg, rgba(25, 25, 35, 0.95), rgba(120, 0, 200, 0.4))"
        : "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,235,255,0.8))",
    boxShadow:
      themeMode === "dark"
        ? "0 20px 60px rgba(0,0,0,0.5)"
        : "0 15px 40px rgba(0,0,0,0.1)",
  }}
>
  {/* MODERN PROFILE SECTION */}
<Box
  sx={{
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: { xs: 4, md: 6 },
    borderRadius: "28px",
    backdropFilter: "blur(12px) saturate(120%)",
    background:
      themeMode === "dark"
        ? "rgba(20, 20, 30, 0.85)"
        : "rgba(255, 255, 255, 0.85)",
    boxShadow:
      themeMode === "dark"
        ? "0 20px 60px rgba(0,0,0,0.5)"
        : "0 10px 40px rgba(0,0,0,0.1)",
  }}
>
  {/* NAME */}
  <Typography
    variant="h3"
    sx={{
      fontWeight: 900,
      mb: 1,
      fontSize: { xs: "2rem", md: "2.5rem" },
      background: "linear-gradient(90deg, #ff5ca2, #6366f1)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textTransform: "uppercase",
      letterSpacing: 1.5,
      textAlign: { xs: "center", md: "left" },
    }}
  >
    HASNAIN
  </Typography>

  {/* ROLE / INFO */}
  <Typography
    variant="h5"
    sx={{
      mb: 3,
      fontWeight: 500,
      textAlign: { xs: "center", md: "left" },
      color: themeMode === "dark" ? "#c4b5fd" : "#5b21b6",
      lineHeight: 1.5,
    }}
  >
    🚀 Front-End Developer • Shopify & Web App Expert • UI/UX Designer
  </Typography>

  {/* QUICK INFO GRID */}
  <Grid container spacing={3}>
    {[
      { label: "Experience", value: "3+ Years" },
      { label: "Specialty", value: "Shopify & Modern Web Apps" },
      { label: "Clients", value: "350+ Worldwide" },
      { label: "Projects", value: "500+ Delivered" },
    ].map((item, index) => (
      <Grid item xs={12} sm={6} key={index}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 600,
              color: themeMode === "dark" ? "#d23aedff" : "#6b21a8",
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            {item.label}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1.25rem",
              color: themeMode === "dark" ? "#ffffffff" : "#7c3aed",
            }}
          >
            {item.value}
          </Typography>
        </Box>
      </Grid>
    ))}
  </Grid>
</Box>

     
          </Box>
        </Box>
      </motion.div>
    </Grid>

{/* 🔸 RIGHT COLUMN — ABOUT TEXT */}
<Grid item xs={12} md={7}>
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    {/* HEADING */}
    <Typography
      variant="h1"
      sx={{
        fontWeight: 900,
        mb: 3,
        textTransform: 'uppercase',
        fontSize: { xs: "2.5rem", md: "4.5rem" },
        lineHeight: { xs: 1.2, md: 1.1 },
        background: "linear-gradient(90deg, #a78bfa, #ec4899)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: 1.5,
      }}
    >
      About Me
    </Typography>
{/* DESCRIPTION */}
<Box
  sx={{
    maxWidth: 780,
    mb: 6,
    p: { xs: 5, md: 6 },
    borderRadius: "32px",
    background: themeMode === "dark"
      ? "rgba(15, 15, 35, 0.65)"
      : "rgba(255, 255, 255, 0.75)",
    border: "1px solid",
    borderColor: themeMode === "dark"
      ? "rgba(167, 133, 250, 0.35)"
      : "rgba(124, 58, 237, 0.2)",
    backdropFilter: "blur(24px) saturate(160%)",
    boxShadow: themeMode === "dark"
      ? "0 25px 80px rgba(124, 58, 237, 0.25)"
      : "0 20px 60px rgba(124, 58, 237, 0.15)",
    transition: "0.4s ease",
    position: "relative",
    overflow: "hidden",

    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: themeMode === "dark"
        ? "0 35px 90px rgba(167, 133, 250, 0.45)"
        : "0 25px 80px rgba(124, 58, 237, 0.25)"
    },

    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "32px",
      padding: "2px",
      background: "linear-gradient(120deg, #a78bfa55, #ec489955, #38bdf855)",
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      pointerEvents: "none",
    },

    "&::after": {
      content: '""',
      position: "absolute",
      top: "-30%",
      left: "-20%",
      width: "60%",
      height: "60%",
      background:
        "radial-gradient(circle, rgba(167,133,250,0.18), transparent 70%)",
      transform: "rotate(25deg)",
      filter: "blur(10px)",
    },
  }}
>

  <Typography
    sx={{
      mb: 3,
      fontSize: { xs: "1.05rem", md: "1.2rem" },
      lineHeight: 1.9,
      color: themeMode === "dark" ? "#e5e7eb" : "#1f2937",
    }}
  >
    I'm a{" "}
    <strong
      style={{
        background: "linear-gradient(90deg, #a78bfa, #ec4899)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      Front-End Developer, E-Commerce Expert & UI/UX Designer
    </strong>{" "}
    who builds premium, high-performance digital experiences that help brands
    stand out.
  </Typography>

  <Typography
    sx={{
      mb: 3,
      fontSize: { xs: "1.05rem", md: "1.2rem" },
      lineHeight: 1.9,
      color: themeMode === "dark" ? "#e5e7eb" : "#1f2937",
    }}
  >
    I specialize in{" "}
    <strong
      style={{
        background: "linear-gradient(90deg, #38bdf8, #22c55e)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      Shopify stores, modern web apps, animations, landing pages, and YouTube
      automation systems
    </strong>
    —optimized for speed, conversions, and user experience.
  </Typography>

  <Typography
    sx={{
      fontSize: { xs: "1.05rem", md: "1.2rem" },
      lineHeight: 1.9,
      color: themeMode === "dark" ? "#e5e7eb" : "#1f2937",
    }}
  >
    I combine{" "}
    <strong
      style={{
        background: "linear-gradient(90deg, #facc15, #f97316)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      clean aesthetics, fast performance, and data-driven strategy
    </strong>{" "}
    to help brands grow confidently and scale globally.
  </Typography>
</Box>



   {/* SKILLS CARDS – MODERN & BIG */}
<Grid container spacing={4}>
  {[
    { icon: "🔥", color: "#a78bfa", title: "Front-End Development", desc: "React, Next.js, responsive UI, animations, component systems." },
    { icon: "💼", color: "#ec4899", title: "E-Commerce & Shopify", desc: "High-converting stores, theme customization, product automation." },
    { icon: "🎨", color: "#38bdf8", title: "UI/UX Design", desc: "Clean layouts, premium UI, smooth motion, mobile-first interfaces." },
    { icon: "📈", color: "#22c55e", title: "Brand & Growth", desc: "Social content, YouTube automation, optimization strategies." },
  ].map((item, i) => (
    <Grid item xs={12} sm={6} key={i}>
      <Paper
        sx={{
          p: { xs: 5, md: 6 },
          minHeight: 260,
          borderRadius: "28px",
          background: themeMode === "dark"
            ? "rgba(20, 20, 40, 0.6)"
            : "rgba(255,255,255,0.7)",
          border: "1px solid",
          borderColor: themeMode === "dark"
            ? "rgba(255,255,255,0.15)"
            : "rgba(0,0,0,0.1)",
          backdropFilter: "blur(22px) saturate(160%)",
          boxShadow: themeMode === "dark"
            ? `0 25px 60px ${item.color}25`
            : `0 20px 50px ${item.color}25`,
          transition: "0.35s ease",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",

          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "28px",
            padding: "2px",
            background: `linear-gradient(120deg, ${item.color}60, ${item.color}15)`,
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            pointerEvents: "none",
          },

          "&:hover": {
            transform: "translateY(-10px) scale(1.02)",
            boxShadow: `0 30px 70px ${item.color}55`,
            borderColor: item.color,
          }
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            fontSize: { xs: "1.6rem", md: "1.9rem" },
            color: item.color,
          }}
        >
          <span style={{ fontSize: "2.1rem" }}>{item.icon}</span>
          {item.title}
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "1.05rem", md: "1.15rem" },
            lineHeight: 1.85,
            color: themeMode === "dark" ? "#e5e7eb" : "#374151",
            maxWidth: 380,
          }}
        >
          {item.desc}
        </Typography>
      </Paper>
    </Grid>
  ))}
</Grid>


   {/* STATS — MODERN & PREMIUM */}
<Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 4,
    mt: 8,
  }}
>
  {[
    { number: "350+", label: "Happy Clients" },
    { number: "500+", label: "Projects Delivered" },
    { number: "4.9★", label: "Client Rating" },
    { number: "20+", label: "Countries Served" },
  ].map((stat, i) => (
    <Box
      key={i}
      sx={{
        p: { xs: 4, md: 5 },
        minWidth: 200,
        minHeight: 150,
        borderRadius: "20px",
        textAlign: "center",
        background:
          themeMode === "dark"
            ? "rgba(40, 20, 60, 0.4)"
            : "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(18px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        position: "relative",
        overflow: "hidden",
        transition: "0.35s ease",
        cursor: "default",

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(167,133,250,0.2), rgba(236,72,153,0.2))",
          opacity: 0.3,
          zIndex: 0,
        },

        "&:hover": {
          transform: "translateY(-8px) scale(1.03)",
          boxShadow:
            themeMode === "dark"
              ? "0 22px 55px rgba(167,133,250,0.45)"
              : "0 22px 55px rgba(124,58,237,0.25)",
          borderColor: "#a78bfa",
        },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 900,
          color: "#a78bfa",
          zIndex: 1,
          position: "relative",
          fontSize: { xs: "2rem", md: "2.7rem" },
        }}
      >
        {stat.number}
      </Typography>

      <Typography
        sx={{
          mt: 1,
          fontWeight: 600,
          color: themeMode === "dark" ? "#e9d5ff" : "#4b5563",
          zIndex: 1,
          position: "relative",
          fontSize: { xs: "1rem", md: "1.15rem" },
          letterSpacing: "0.3px",
        }}
      >
        {stat.label}
      </Typography>
    </Box>
  ))}
</Box>
</motion.div>
</Grid>
</Grid>



{/* CONTACT SECTION */}
<Box sx={{ mt: { xs: 10, md: 14 }, textAlign: "center", px: { xs: 3, md: 0 } }}>
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    {/* Heading */}
    <Typography
      variant="h2"
      sx={{
        fontWeight: 900,
        mb: 2,
        fontSize: { xs: "3rem", md: "4.5rem" },
        background: "linear-gradient(90deg, #7c3aed, #ec4899)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: "2px",
        textTransform: "uppercase",
      }}
    >
      Let’s Connect
    </Typography>

    {/* Secondary Message */}
    <Typography
      sx={{
        mb: 6,
        fontSize: { xs: "1rem", md: "1.25rem" },
        color: themeMode === "dark" ? "#ddd6fe" : "#4b5563",
        maxWidth: 650,
        mx: "auto",
      }}
    >
      Have a project, collaboration, or idea? Drop me a message below and I’ll get back to you as soon as possible!
    </Typography>

    {/* FORM CARD */}
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        p: { xs: 5, md: 8 },
        borderRadius: "2rem",
        position: "relative",
        overflow: "hidden",
        background:
          themeMode === "dark"
            ? "rgba(20,10,35,0.85)"
            : "rgba(227, 227, 227, 0.95)",
        backdropFilter: "blur(25px) saturate(180%)",
        border: "2px solid rgba(255,255,255,0.18)",
        boxShadow:
          themeMode === "dark"
            ? "0 0 150px rgba(167,133,250,0.35)"
            : "0 0 100px rgba(124,58,237,0.12)",
        transition: "0.45s ease",
        "&:hover": {
          transform: "translateY(-6px) scale(1.015)",
        },
      }}
    >
      {/* Neon Glow Layer */}
      <Box
        sx={{
          position: "absolute",
          inset: "-50%",
          background:
            "radial-gradient(circle at center, rgba(167,133,250,0.35), rgba(236,72,153,0.2))",
          animation: "pulseGlow 6s infinite ease-in-out",
          zIndex: 0,
        }}
      />
      <style>
        {`
          @keyframes pulseGlow {
            0% { opacity: .15; transform: scale(1); }
            50% { opacity: .35; transform: scale(1.15); }
            100% { opacity: .15; transform: scale(1); }
          }
        `}
      </style>

      {/* FORM */}
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          position: "relative",
          zIndex: 2,
        }}
        onSubmit={(e) => {
          e.preventDefault();
          alert("Message sent! (Implement backend logic here)");
        }}
      >
        {/* Name */}
        <input
          type="text"
          placeholder="Your Name"
          required
          style={{
            padding: "20px 24px",
            borderRadius: "1.5rem",
            border: "2px solid rgba(255,255,255,0.25)",
            background: themeMode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(243,244,246,0.9)",
            color: themeMode === "dark" ? "#fff" : "#1f2937",
            fontSize: "1.1rem",
            outline: "none",
            transition: "0.3s",
            width: "100%",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#a78bfa")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.25)")}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Your Email"
          required
          style={{
            padding: "20px 24px",
            borderRadius: "1.5rem",
            border: "2px solid rgba(255,255,255,0.25)",
            background: themeMode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(243,244,246,0.9)",
            color: themeMode === "dark" ? "#fff" : "#1f2937",
            fontSize: "1.1rem",
            outline: "none",
            transition: "0.3s",
            width: "100%",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#a78bfa")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.25)")}
        />

        {/* Message */}
        <textarea
          placeholder="Your Message"
          required
          rows={7}
          style={{
            padding: "20px 24px",
            borderRadius: "1.5rem",
            border: "2px solid rgba(255,255,255,0.25)",
            background: themeMode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(243,244,246,0.9)",
            color: themeMode === "dark" ? "#fff" : "#1f2937",
            fontSize: "1.1rem",
            outline: "none",
            transition: "0.3s",
            resize: "none",
            width: "100%",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#a78bfa")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.25)")}
        />

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          style={{
            padding: "20px 0",
            borderRadius: "1.5rem",
            border: "none",
            fontWeight: 700,
            fontSize: "1.2rem",
            color: "#fff",
            background: "linear-gradient(90deg, #a78bfa, #ec4899)",
            cursor: "pointer",
            transition: "0.3s",
            marginTop: "10px",
          }}
        >
          Send Message
        </motion.button>
      </Box>
</Box>
  </motion.div>
</Box>




{/* ✨ Section 2: Full Video Section */}
<motion.div id="alphaSection"
  initial={{ opacity: 0, y: 60, scale: 0.98 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 1.2, ease: [0.25, 0.8, 0.25, 1] }}
  viewport={{ once: false, amount: 0.3 }}
  style={{ marginTop: "80px", display: "flex", justifyContent: "center" }}
>
  <motion.video
    src="https://public.com/wp-content/uploads/2025/10/Hero_w-Testimonials_R4.webm"
    autoPlay
    loop
    muted
    playsInline
    style={{
      width: "100%",
      maxWidth: "1900px",
      borderRadius: "24px",
      boxShadow:
        themeMode === "dark"
          ? "0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(124,58,237,0.3)"
          : "0 10px 40px rgba(0,0,0,0.15)",
      cursor: "pointer",
      transition: "all 0.5s ease",
    }}
  />
</motion.div>
</Box>

<motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
  viewport={{ once: false }}
>
  <Box
    sx={(theme) => ({
      background: theme.palette.mode === "light" ? "#fff" : "rgba(48, 0, 80, 0.6)",
      backdropFilter: theme.palette.mode === "dark" ? "blur(20px)" : "none",
      color: theme.palette.mode === "light" ? "#111" : "#eee",
      pt: 10,
      pb: 6,
      px: { xs: 3, md: 12 },
    })}
  >
    <Grid container spacing={8}>

{/* LEFT — Logo + Description + Social */}
<Grid item xs={12} md={4}>
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 3,
      alignItems: { xs: "center", md: "flex-start" },
      textAlign: { xs: "center", md: "left" },
    }}
  >
    {/* Logo + Name */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Box
        component="img"
        src="/assets/logo/logo1.png"
        alt="logo"
        sx={{
          width: 50,
          height: 50,
          borderRadius: "12px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
          transition: "transform 0.3s",
          "&:hover": { transform: "rotate(10deg) scale(1.1)" },
        }}
      />
      <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: 0.8 }}>
        CRM Nexus
      </Typography>
    </Box>

    {/* Description */}
    <Typography
      variant="body2"
      sx={{
        color: "text.secondary",
        lineHeight: 1.7,
        maxWidth: 320,
        fontSize: 15,
      }}
    >
      Transforming ambitious brands into category leaders through strategic CRM innovation and digital growth.
    </Typography>

    {/* Social Icons */}
    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
      {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map(
        (IconComponent, i) => (
          <IconButton
            key={i}
            sx={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "inherit",
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(8px)",
              transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
              "&:hover": {
                transform: "scale(1.3)",
                background: "linear-gradient(135deg, #7b2ff7, #f107a3)",
                color: "#fff",
                boxShadow: "0 8px 25px rgba(0,0,0,0.35)",
              },
            }}
          >
            <IconComponent fontSize="medium" />
          </IconButton>
        )
      )}
    </Box>
  </Box>
</Grid>

      {/* RIGHT — 3 Columns */}
      <Grid item xs={12} md={8}>
        <Grid container spacing={6}>
          {[
            { title: "Services", items: ["Enterprise SEO","Technical Optimization","Content Strategy","Link Building","Local SEO","International SEO"] },
            { title: "Company", items: ["About","Case Studies","Insights","Careers","Contact"] },
            { title: "Resources", items: ["Blog","SEO Tools","Guides","Webinars","Newsletter"] }
          ].map((col) => (
            <Grid item xs={6} sm={4} key={col.title}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                {col.title}
              </Typography>
              {col.items.map((item) => (
                <Typography
                  key={item}
                  sx={{
                    mb: 1.2,
                    fontSize: "0.95rem",
                    color: "text.secondary",
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": {
                      color: "cyan",
                      scale: '1.02',
                    },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>

    {/* Bottom Divider */}
    <Box
      sx={{
        mt: 8,
        borderTop: "1px solid rgba(255,255,255,0.1)",
        pt: 4,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
        © {new Date().getFullYear()} CRM Nexus. All rights reserved.
      </Typography>

      <Box sx={{ display: "flex", gap: 3 }}>
        {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((item) => (
          <Typography
            key={item}
            sx={{
              color: "text.secondary",
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": { textDecoration: 'underline'},
            }}
          >
            {item}
          </Typography>
        ))}
      </Box>
    </Box>
  </Box>
</motion.div>

</Box>
    );
  };

  export default HomePage;
