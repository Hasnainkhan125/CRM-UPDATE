import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  TextField,
  Fade,
  CircularProgress,
  Snackbar,
  Alert,
  useMediaQuery,

} from "@mui/material";
import { grey } from "@mui/material/colors";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LineChart from "../../components/LineChart";
import Header from "../../components/Header";
import ContactEmailForm from "../../components/ContactEmailForm";
import { motion } from "framer-motion";
import PieChart from "../../components/PieChart"; // adjust the path if needed

import { Users, Wallet, UserPlus, BarChart3 } from "lucide-react";


const ADMIN_SESSION_KEY = "admin-access-granted";
const ADMIN_PASSWORD = "admin123";
const TEAM_KEY = "team-members";

export default function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode) || {};
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");
const [recentUsers, setRecentUsers] = useState([]);
  const [rows, setRows] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [adminAccess, setAdminAccess] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Compute totalPending safely
  const totalPending = rows.length
    ? rows.filter((i) => i.status === "Pending").length
    : 0;

  // Load invoices and compute total revenue
  useEffect(() => {
    const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    setRows(storedInvoices);

    const revenue = storedInvoices.reduce(
      (sum, i) => sum + (parseFloat(i.cost || 0) + parseFloat(i.agencyFee || 0)),
      0
    );
    setTotalRevenue(revenue);
  }, []);

  // Load recent users and admin access
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem(TEAM_KEY)) || [];
    setRecentUsers(
      storedUsers.length
        ? storedUsers.map((u) => ({
            ...u,
            email: u.email ?? u.emailAddress ?? u.username ?? "",
            password: u.password ?? u.pw ?? u.pass ?? "",
            name: u.name ?? u.fullName ?? "",
          }))
        : [
            {
              _id: "1",
              name: "Admin User",
              email: "admin@gmail.com",
              password: "admin123",
              access: "admin",
            },
          ]
    );

    if (!storedUsers.length)
      localStorage.setItem(TEAM_KEY, JSON.stringify(recentUsers));

    if (sessionStorage.getItem(ADMIN_SESSION_KEY) === "true") setAdminAccess(true);
  }, []);

  // Loading page animation
  useEffect(() => {
    const timer = setTimeout(() => setLoadingPage(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseSnackbar = () => setOpenSnackbar(false);
  const handleAdminAccess = () => {
    setLoading(true);
    setTimeout(() => {
      if (passwordInput === ADMIN_PASSWORD) {
        setAdminAccess(true);
        sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
        setOpenSnackbar(true);
      } else {
        alert("❌ Incorrect password! Only admin can view this section.");
      }
      setPasswordInput("");
      setLoading(false);
    }, 800);
  };

  const c = {
    grey100: colors?.grey?.[100] ?? grey[100],
    grey300: colors?.grey?.[300] ?? grey[300],
    greenAccent500: colors?.greenAccent?.[500] ?? "#22c55e",
    blueAccent700: colors?.blueAccent?.[700] ?? "#5b21b6",
    redAccent500: colors?.redAccent?.[500] ?? "#ef4444",
    primary400: colors?.primary?.[400] ?? "rgba(255,255,255,0.02)",
  };


  if (loadingPage) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
          bgcolor: theme.palette.mode === "dark" ? "#0b1220" : "#f7f7f7",
        }}
      >
        <CircularProgress sx={{ color: c.greenAccent500 }} />
        <Typography sx={{ color: c.grey300 }}>Loading dashboard...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: theme.palette.mode === "dark" ? "#0b1220" : "#f7f7f7",
        px: isMobile ? 2 : 4,
        py: 3,
      }}
    >
      
{/* HEADER */}
<Box
  display="flex"
  flexDirection={isMobile ? "column" : "row"}
  justifyContent={isMobile ? "center" : "space-between"}
  alignItems={isMobile ? "center" : "center"}
  mb={3}
  gap={isMobile ? 2 : 0}
>
  <Header
    title="DASHBOARD"
    subtitle="REGIN ESTATE"
    sx={{ textAlign: isMobile ? "center" : "left" }}
  />

  <Box
    sx={{
      width: isMobile ? "100%" : "auto",  // Full width on mobile
      display: "flex",
      justifyContent: isMobile ? "center" : "flex-end",
    }}
  >
    <Button
      fullWidth={isMobile} // Makes button full width on mobile
      sx={{
        background: theme.palette.mode === "dark" ? "#a200ff" : "#0077ff",
        color: "#fff",
        fontWeight: "bold",
        mt: isMobile ? 2 : 0,
        px: isMobile ? 2 : 3,
        py: 1.5,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        gap: 1,
        fontSize: isMobile ? 12 : 14,
        transition: "all 0.3s ease",
        textTransform: "none",
        "&:hover": {
          background: theme.palette.mode === "dark" ? "#7c00c4" : "#4f0ab8",
          transform: "scale(1.03)",
        },
      }}
    >
      <DownloadOutlinedIcon sx={{ fontSize: isMobile ? 16 : 18 }} />
      Download Resume
    </Button>
  </Box>
</Box>


<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>{/* MODERN STAT CARDS - BIGGER VERSION */}



<Box
  display="grid"
  gridTemplateColumns={isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)"}
  gap={isMobile ? 2 : 4}
>
  {[
    {
  title: recentUsers.length.toLocaleString(),
  subtitle: "Total Users",
  icon: <Users sx={{ fontSize: isMobile ? 26 : 30 }} />,   // Changed
  color: "#6366f1",
  gradient: "linear-gradient(135deg,#6366f1,#a5b4fc)",
},


{
  title: `PKR ${Number(totalRevenue).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`,
  subtitle: "Invoice Revenue",
  icon: <Wallet sx={{ fontSize: isMobile ? 26 : 30 }} />,
  color: "#06b6d4",
  gradient: "linear-gradient(135deg,#06b6d4,#67e8f9)",
},




{
    title: totalPending.toLocaleString(),           // Shows 0 if none
  subtitle: "Pending Invoices",                  // Updated label
  icon: <UserPlus sx={{ fontSize: isMobile ? 26 : 30 }} />, // Keep same icon
  color: "#ef4444",                              // Red color for pending
  gradient: "linear-gradient(135deg,#ef4444,#fca5a5)", // Red gradient
},

{
  title: "1,325,134",
  subtitle: "Traffic Received",
  icon: <BarChart3 sx={{ fontSize: isMobile ? 26 : 30 }} />,  // Changed
  color: "#f472b6",
  gradient: "linear-gradient(135deg,#f472b6,#f9a8d4)",
},

  ].map((item, idx) => (
   <Box
  key={idx}
  sx={{
    p: isMobile ? 3 : 4,
    borderRadius: "20px",
    backdropFilter: "blur(12px)",
    background:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.04)"
        : "rgba(255,255,255,0.65)",

    border: theme.palette.mode === "dark"
      ? "1px solid rgba(255,255,255,0.06)"
      : "1px solid rgba(0,0,0,0.06)",

    // ⭐ Right side border
    borderRight: `4px solid ${item.color}`,

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    transition: "0.35s ease",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 8px 30px rgba(0,0,0,0.5)"
        : "0 8px 30px rgba(0,0,0,0.10)",

    "&:hover": {
      transform: "translateY(-6px) scale(1.04)",
      boxShadow:
        theme.palette.mode === "dark"
          ? `0 12px 40px ${item.color}44`
          : `0 12px 40px ${item.color}33`,
      "& .glow": {
        opacity: 0.4,
        transform: "scale(1.4)",
      },
    },
  }}
>

      {/* Glow Background Animation */}
      <Box
        className="glow"
        sx={{
          position: "absolute",
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: item.gradient,
          opacity: 0.18,
          filter: "blur(35px)",
          top: "-40px",
          right: "-40px",
          transition: "0.4s ease",
        }}
      />

      {/* Text Info */}
      <Box sx={{ zIndex: 2 }}>
        <Typography
          fontWeight={800}
          fontSize={isMobile ? 16 : 22}
          sx={{ color: item.color }}
        >
          {item.title}
        </Typography>
        <Typography fontSize={isMobile ? 11 : 13} sx={{ color: c.grey300 }}>
          {item.subtitle}
        </Typography>
      </Box>

      {/* Icon Box */}
      <Box
        sx={{
          width: isMobile ? 45 : 55,
          height: isMobile ? 45 : 55,
          borderRadius: "14px",
          background: item.gradient,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          boxShadow: `0 8px 25px ${item.color}55`,
          zIndex: 2,
          transition: "0.3s ease",
        }}
      >
        {item.icon}
      </Box>
    </Box>
  ))}
</Box>








{/* Revenue Chart - Fully Responsive */}
<Box
  sx={{
    mt: { xs: 3, sm: 4 },
    p: { xs: 2, sm: 3 },
    borderRadius: 3,
    background: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "#fff",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  }}
>
  {/* Header: Title + Revenue + Download */}
  <Box
    display="flex"
    flexDirection={{ xs: "column", sm: "row" }}
    justifyContent="space-between"
    alignItems={{ xs: "flex-start", sm: "center" }}
    mb={2}
    gap={1.5}
  >
<Box
  sx={{
    p: { xs: 3, sm: 4 },
    borderRadius: 3,
    background:
      theme.palette.mode === "dark"
        ? "rgba(15, 23, 42, 0.6)" // dark glass
        : "rgba(0, 187, 255, 0.15)", // light glass
    color: theme.palette.mode === "dark" ? "#fff" : "#111",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 12px 40px rgba(0,0,0,0.6)"
        : "0 8px 30px rgba(0,0,0,0.1)",
    position: "relative",
    overflow: "hidden",
    border:
      theme.palette.mode === "dark"
        ? "1px solid rgba(255,255,255,0.1)"
        : "1px solid rgba(0,0,0,0.08)",
    minWidth: 300,
    maxWidth: 480,
    transition: "0.3s ease",
    "&:hover": {
      transform: "translateY(-5px) scale(1.03)",
      boxShadow:
        theme.palette.mode === "dark"
          ? "0 16px 50px rgba(0,0,0,0.7)"
          : "0 12px 40px rgba(0,0,0,0.2)",
    },
  }}
>
  {/* Soft Glow Circle */}
  <Box
    sx={{
      position: "absolute",
      width: 120,
      height: 120,
      borderRadius: "50%",
      background:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.1)"
          : "rgba(0,187,255,0.2)",
      top: "-30px",
      right: "-30px",
      filter: "blur(50px)",
      transition: "0.3s ease",
    }}
  />

  {/* Title */}
  <Typography
    fontWeight={700}
    fontSize={{ xs: 16, sm: 20 }}
    color={theme.palette.mode === "dark" ? "#fff" : "#111"}
  >
    Revenue Generated
  </Typography>

  {/* Amount */}
  <Typography
    fontWeight="bold"
    fontSize={{ xs: 24, sm: 32 }}
    sx={{ mt: 1, color: theme.palette.mode === "dark" ? "#fff" : "#111" }}
  >
    PKR {totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
  </Typography>

  {/* Wallet Icon */}
  <Wallet
    size={28}
    style={{
      position: "absolute",
      bottom: 16,
      right: 16,
      color: theme.palette.mode === "dark" ? "#fff" : "#00b3ff",
      opacity: 0.3,
    }}
  />
</Box>


    <IconButton
      sx={{
        mt: { xs: 1, sm: 0 },
        background: theme.palette.mode === "dark" ? "#1f2937" : "#e0f2fe",
        "&:hover": {
          background: theme.palette.mode === "dark" ? "#374151" : "#bae6fd",
        },
      }}
    >
      <DownloadOutlinedIcon sx={{ fontSize: { xs: 18, sm: 22 }, color: c.greenAccent500 }} />
    </IconButton>
  </Box>

  {/* Chart */}
  <Box
    sx={{
      width: "100%",
      height: { xs: 180, sm: 220 }, // smaller on mobile
      minHeight: 260,
    }}
  >
    <LineChart isDashboard />
  </Box>
</Box>


{/* Pie Chart - Modern Sales Distribution */}
<Box
  sx={{
    mt: { xs: 3, sm: 4 },
    p: { xs: 2, sm: 3 },
    borderRadius: 3,
    background: theme.palette.mode === "dark" ? "#1f2937" : "#fff",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  }}
>
  <Typography fontWeight={600} fontSize={{ xs: 13, sm: 15 }} mb={2}>
    Sales Distribution
  </Typography>
  <Box sx={{ width: "100%", height: { xs: 250, sm: 350 } }}>
    <PieChart />
  </Box>
</Box>





        
{/* Recent Users - Modern CRM Card Layout with Avatars */}
<Box
  mt={{ xs: 2, sm: 4 }}
  p={{ xs: 1.5, sm: 3 }}
  borderRadius={4}
  bgcolor={theme.palette.mode === "dark" ? "#1f2937" : "#f9fafb"}
  boxShadow={{ xs: "0 4px 15px rgba(0,0,0,0.05)", sm: "0 12px 30px rgba(0,0,0,0.08)" }}
>
  <Typography fontWeight={700} mb={{ xs: 2, sm: 3 }} fontSize={{ xs: 14, sm: 16 }}>
    Recent Users
  </Typography>

  {!adminAccess ? (
    <Fade in={!adminAccess}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2} p={{ xs: 1, sm: 2 }}>
        <Typography fontSize={{ xs: 11, sm: 12 }}>🔒 Admin Access Required</Typography>
        <TextField
          type="password"
          label="Admin Password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          size="small"
          fullWidth
        />
        {!loading ? (
          <Button variant="contained" onClick={handleAdminAccess} fullWidth sx={{ mt: 1 }}>
            Submit
          </Button>
        ) : (
          <CircularProgress size={24} sx={{ mt: 1 }} />
        )}
      </Box>
    </Fade>
  ) : recentUsers.length === 0 ? (
    <Typography fontSize={{ xs: 11, sm: 12 }} color={c.grey300}>
      No recent users
    </Typography>
  ) : (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(auto-fill, minmax(220px, 1fr))" },
        gap: 2,
        maxHeight: { xs: 900, sm: 500 },
        overflowY: "auto",
      }}
    >
      {[...recentUsers].reverse().map((user) => (
        <Box
          key={user._id}
          p={{ xs: 2, sm: 3 }}
          borderRadius={3}
          bgcolor={theme.palette.mode === "dark" ? "#111827" : "#fff"}
          boxShadow={{ xs: "0 3px 12px rgba(0,0,0,0.04)", sm: "0 6px 25px rgba(0,0,0,0.05)" }}
          transition="all 0.3s ease"
          sx={{
            "&:hover": {
              transform: "translateY(-3px) scale(1.02)",
              boxShadow: { xs: "0 6px 18px rgba(0,0,0,0.08)", sm: "0 12px 40px rgba(0,0,0,0.12)" },
            },
          }}
        >
   {/* Avatar + User Info */}
<Box display="flex" alignItems="center" mb={1}>
  <Box
    component="img"
    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=64`}
    alt={user.name}
    sx={{
      width: { xs: 36, sm: 40 },
      height: { xs: 36, sm: 40 },
      borderRadius: "50%",
      objectFit: "cover",
      mr: 2,
    }}
  />
  <Box>
    <Typography
      fontSize={{ xs: 12, sm: 13 }}
      fontWeight={600}
      width={100}
      color={c.greenAccent500}
      overflow="hidden"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
    >
      {user.name}
    </Typography>
    <Typography
      fontSize={{ xs: 10, sm: 12 }}
      color={c.grey300}
      overflow="hidden"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
    >
      {user.email}
    </Typography>
    <Typography
      fontSize={{ xs: 10, sm: 12 }}
      color={c.redAccent500} // optional: make password red for visibility
      overflow="hidden"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
    >
      {user.password} {/* show password */}
    </Typography>

              
            </Box>
          </Box>

          {/* Access Badge */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              px: { xs: 2, sm: 2 },
              py: 0.5,
              borderRadius: 2,
              fontSize: { xs: 10, sm: 10 },
              fontWeight: 600,
              color: "#fff",
              width: { xs: "100%", sm: "110px" }, // full width on mobile
              justifyContent: "center",
              background:
                user.access === "admin"
                  ? c.blueAccent700
                  : user.access === "manager"
                  ? c.redAccent500
                  : c.greenAccent500,
            }}
          >
            {user.access === "admin" && <AdminPanelSettingsOutlinedIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />}
            {user.access === "manager" && <SecurityOutlinedIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />}
            {user.access === "user" && <LockOpenOutlinedIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />}
            {user.access.toUpperCase()}
          </Box>
        </Box>
      ))}
    </Box>
  )}
</Box>
</motion.div>




      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
          ✅ Admin password successful!
        </Alert>
      </Snackbar>

      <Box sx={{ position: "fixed", bottom: 10, right: 10 }}>
        <ContactEmailForm />
      </Box>
    </Box>
  );
}
