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
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  InputBase,
  Paper,
  LinearProgress,
  Grid,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import ContactEmailForm from "../../components/ContactEmailForm";
import { motion } from "framer-motion";

const ADMIN_SESSION_KEY = "admin-access-granted";
const ADMIN_PASSWORD = "admin123";
const TEAM_KEY = "team-members";

export default function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode) || {};
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");

  const [recentUsers, setRecentUsers] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [adminAccess, setAdminAccess] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  
  // simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => setLoadingPage(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Load data + sync with localStorage
  useEffect(() => {
    const loadData = () => {
      const storedUsersRaw = localStorage.getItem(TEAM_KEY);
      const storedUsers = storedUsersRaw ? JSON.parse(storedUsersRaw) : null;
      const storedRevenue = localStorage.getItem("totalRevenue");

      if (storedUsers && Array.isArray(storedUsers)) {
        const cleaned = storedUsers.map((u) => ({
          ...u,
          email: u.email ?? u.emailAddress ?? u.username ?? "",
          password: u.password ?? u.pw ?? u.pass ?? "",
          name: u.name ?? u.fullName ?? "",
        }));
        setRecentUsers(cleaned);
      } else {
        const defaultUsers = [
          { _id: "1", name: "Admin User", age: 30, email: "admin@gmail.com", password: "admin123", access: "admin" },
        ];
        setRecentUsers(defaultUsers);
        localStorage.setItem(TEAM_KEY, JSON.stringify(defaultUsers));
      }

      if (storedRevenue) {
        setTotalRevenue(parseFloat(storedRevenue));
      } else {
        const defaultRevenue = 75230.55;
        setTotalRevenue(defaultRevenue);
        localStorage.setItem("totalRevenue", defaultRevenue.toString());
      }

      const sessionAccess = sessionStorage.getItem(ADMIN_SESSION_KEY);
      if (sessionAccess === "true") setAdminAccess(true);
    };

    loadData();
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
    }, 1000);
  };

  // helper color getters with fallbacks
  const c = {
    grey100: colors?.grey?.[100] ?? grey[100],
    grey200: colors?.grey?.[200] ?? grey[200],
    grey300: colors?.grey?.[300] ?? grey[300],
    grey400: colors?.grey?.[400] ?? grey[400],
    primary900: colors?.primary?.[900] ?? "#0b1220",
    primary400: colors?.primary?.[400] ?? "rgba(255,255,255,0.02)",
    greenAccent400: colors?.greenAccent?.[400] ?? "#4ade80",
    greenAccent500: colors?.greenAccent?.[500] ?? "#22c55e",
    blueAccent700: colors?.blueAccent?.[700] ?? "#5b21b6",
    purpleAccent300: colors?.purpleAccent?.[300] ?? "#9f7aea",
    redAccent300: colors?.redAccent?.[300] ?? "#fb7185",
    blueAccent500: colors?.blueAccent?.[500] ?? "#3b82f6",
    redAccent500: colors?.redAccent?.[500] ?? "#ef4444",
  };

  if (loadingPage) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          bgcolor: theme.palette.mode === "dark" ? c.primary900 : "#fff",
        }}
      >
        <CircularProgress sx={{ color: c.greenAccent400 }} />
        <Typography sx={{ fontSize: "1.1rem", color: c.grey400 }}>Loading dashboard...</Typography>
      </Box>
    );
  }


  return (
    <Box sx={{ height: "100%", overflow: "auto", pb: 6 }}>
      {/* HEADER */}
      <Box display="flex" flexDirection={isMobile ? "column" : "row"} justifyContent="space-between" alignItems={isMobile ? "flex-start" : "center"} mb={3} gap={2} p={isMobile ? 2 : 3}>
        <Header title="DASHBOARD" subtitle="REGIN ESTATE" />
        <Button
          sx={{
            backgroundColor: c.blueAccent700,
            color: c.grey100,
            fontSize: "14px",
            fontWeight: "bold",
            padding: isMobile ? "8px 16px" : "10px 20px",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Download Resume
        </Button>
      </Box>
{/* MAIN GRID - your existing stat boxes and charts */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  <Box
    display="grid"
    gridTemplateColumns={
      isMobile
        ? "repeat(1, 1fr)"
        : isTablet
        ? "repeat(6, 1fr)"
        : "repeat(12, 1fr)"
    }
    gridAutoRows="140px"
    gap="20px"
    px={isMobile ? 2 : 3}
  >
    {/* Stat Boxes */}
    <Box
      gridColumn={isMobile ? "span 1" : "span 3"}
      sx={{
        background: c.primary400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 1,
      }}
    >
      <StatBox
        title={(recentUsers?.length ?? 0).toLocaleString()}
        subtitle="Total Users"
        progress="0.75"
        increase="+14%"
        icon={<EmailIcon sx={{ color: c.greenAccent500, fontSize: "26px" }} />}
      />
    </Box>

    <Box
      gridColumn={isMobile ? "span 1" : "span 3"}
      sx={{
        background: c.primary400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 1,
      }}
    >
      <StatBox
        title={`PK ${totalRevenue.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
        subtitle="Total Revenue"
        progress="0.50"
        increase="+21%"
        icon={<PointOfSaleIcon sx={{ color: c.greenAccent500, fontSize: "26px" }} />}
      />
    </Box>

    <Box
      gridColumn={isMobile ? "span 1" : "span 3"}
      sx={{
        background: c.primary400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 1,
      }}
    >
      <StatBox
        title="32,441"
        subtitle="New Clients"
        progress="0.30"
        increase="+5%"
        icon={<PersonAddIcon sx={{ color: c.greenAccent500, fontSize: "26px" }} />}
      />
    </Box>

    <Box
      gridColumn={isMobile ? "span 1" : "span 3"}
      sx={{
        background: c.primary400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 1,
      }}
    >
      <StatBox
        title="1,325,134"
        subtitle="Traffic Received"
        progress="0.80"
        increase="+43%"
        icon={<TrafficIcon sx={{ color: c.greenAccent500, fontSize: "26px" }} />}
      />
    </Box>

    {/* Revenue Chart */}
    <Box
      gridColumn={isMobile ? "span 1" : isTablet ? "span 6" : "span 8"}
      gridRow="span 2"
      sx={{ background: c.primary400, borderRadius: 1 }}
    >
      <Box
        mt="0px"
        m="-20px"
        p="0px 30px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography variant="h5" fontWeight="600" sx={{ color: c.grey100 }}>
            Revenue Generated
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ color: c.greenAccent400 }}
          >
            $
            {totalRevenue?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) ?? "0.00"}
          </Typography>
        </Box>
        <IconButton>
          <DownloadOutlinedIcon
            sx={{ fontSize: "26px", color: c.greenAccent400 }}
          />
        </IconButton>
      </Box>
      <Box height="250px" m="-20px 0 0 0" p={1}>
        <LineChart isDashboard={true} />
      </Box>
    </Box>

    {/* Recent Users */}
    <Box
      gridColumn={isMobile ? "span 1" : isTablet ? "span 6" : "span 4"}
      gridRow="span 2"
      sx={{ background: c.primary400, borderRadius: 1, overflow: "auto" }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${
          colors?.primary?.[500] ?? "rgba(255,255,255,0.04)"
        }`}
        p="15px"
      >
        <Typography sx={{ color: c.grey100 }} variant="h5" fontWeight="600">
          Recent Added Users
        </Typography>
      </Box>

      {!adminAccess ? (
        <Fade in={!adminAccess}>
          <Box
            p="30px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="h6"
              sx={{ color: c.grey300, fontWeight: "600", mb: 2 }}
            >
              🔒 Admin Access Required
            </Typography>
            <TextField
              type="password"
              label="Enter Admin Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              autoComplete="new-password"
              sx={{ mb: 3, width: "75%" }}
            />
            {!loading ? (
              <Button variant="contained" onClick={handleAdminAccess}>
                Submit
              </Button>
            ) : (
              <CircularProgress
                color="secondary"
                size={40}
                thickness={5}
                sx={{ mt: 2 }}
              />
            )}
          </Box>
        </Fade>
      ) : recentUsers.length === 0 ? (
        <Typography sx={{ color: c.grey100, p: "15px" }}>
          No recent users
        </Typography>
      ) : (
        [...recentUsers].reverse().map((user) => (
          <Box
            key={user._id ?? user.id ?? user.email}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${
              colors?.primary?.[500] ?? "rgba(255,255,255,0.04)"
            }`}
            p="15px"
          >
            <Box>
              <Typography sx={{ color: c.greenAccent500, fontWeight: "600" }}>
                {user.email}
              </Typography>
              <Typography sx={{ color: c.grey100 }}>
                Password: {user.password}
              </Typography>
              <Typography
                sx={{ color: c.redAccent300, textTransform: "uppercase" }}
              >
                Name: {user.name}
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                p: "5px 10px",
                borderRadius: 1,
                bgcolor:
                  user.access === "admin"
                    ? c.blueAccent500
                    : user.access === "manager"
                    ? c.redAccent500
                    : c.greenAccent500,
              }}
            >
              {user.access === "admin" && (
                <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 18, mr: 1 }} />
              )}
              {user.access === "manager" && (
                <SecurityOutlinedIcon sx={{ fontSize: 18, mr: 1 }} />
              )}
              {user.access === "user" && (
                <LockOpenOutlinedIcon sx={{ fontSize: 18, mr: 1 }} />
              )}
              <Typography
                sx={{
                  color: c.grey100,
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {user.access}
              </Typography>
            </Box>
          </Box>
        ))
      )}
    </Box>
  </Box>
</motion.div>


{/* ================= COMPACT TEAM MEMBERS SECTION ================= */}
<Box px={isMobile ? 2 : 3} mt={10}>
  {/* Section Header */}
  <Typography
    variant="h5"
    fontWeight={700}
    mb={3}
    sx={{
      color: c.grey100,
      display: "flex",
      alignItems: "center",
      gap: 1,
      letterSpacing: "-0.2px",
    }}
  >
    👥 Team Members
  </Typography>
<Paper
  elevation={3} // Slight elevation for a modern card feel
  sx={{
    p: 3,
    borderRadius: 4, // softer, modern rounded corners
    background:
      theme.palette.mode === "dark"
        ? "rgba(30,30,30,0.95)"
        : "rgba(255,255,255,0.98)",
    border: theme.palette.mode === "dark"
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid rgba(0,0,0,0.08)",
    backdropFilter: "blur(12px)", // glass-like effect
    maxHeight: 360, // slightly taller
    overflowY: "auto",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 6px 20px rgba(0,0,0,0.4)"
        : "0 6px 20px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)", // subtle lift on hover
      boxShadow:
        theme.palette.mode === "dark"
          ? "0 10px 30px rgba(0,0,0,0.5)"
          : "0 10px 30px rgba(0,0,0,0.12)",
    },
    "&::-webkit-scrollbar": { width: 6 },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#666" : "#bbb",
      borderRadius: 4,
    },
  }}
>

    {/* Table Header */}
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1.2fr 2fr 2fr 1fr",
        py: 2.5,
        px: 2,
        borderBottom:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(0,0,0,0.08)",
        color: theme.palette.mode === "dark" ? "#9ca3af" : "#444",
        fontWeight: 700,
        fontSize: 13,
        textTransform: "uppercase",
        letterSpacing: "0.3px",
        top: 0,
        bgcolor:
          theme.palette.mode === "dark"
            ? "rgba(30,30,30,0.95)"
            : "rgba(255,255,255,0.95)",
        zIndex: 2,
      }}
    >
  <Typography
  sx={{
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: "0.6px",
    textTransform: "uppercase",
    color: theme.palette.mode === "dark" ? "#ffaa00ff" : "#374151",
    opacity: 0.9,
  }}
>
</Typography>

<Typography
  sx={{
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: "0.6px",
    textTransform: "uppercase",
    color: theme.palette.mode === "dark" ? "#ffaa00ff" : "#374151",
    opacity: 0.9,
  }}
>
  Name
</Typography>

<Typography
  sx={{
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: "0.6px",
    textTransform: "uppercase",
    color: theme.palette.mode === "dark" ? "#ffaa00ff" : "#374151",
    opacity: 0.9,
  }}
>
  Email
</Typography>

<Typography
  sx={{
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: "0.6px",
    textTransform: "uppercase",
    color: theme.palette.mode === "dark" ? "#699ff0ff" : "#374151",
    opacity: 0.9,
    textAlign: "center",
  }}
>
  Role
</Typography>

    </Box>

    {/* Users List */}
    {recentUsers.map((user, index) => {
      const onlineEmails = ["admin@gmail.com", "manager@example.com"];
      const isOnline = onlineEmails.includes(user.email);

      return (
        <Box
          key={user._id ?? index}
          sx={{
            display: "grid",
            gridTemplateColumns: "1.2fr 2fr 2fr 1fr",
            alignItems: "center",
            py: 1.2,
            px: 1,
            borderBottom:
              index !== recentUsers.length - 1
                ? "1px solid rgba(255,255,255,0.05)"
                : "none",
            backgroundColor:
              index % 2 === 0
                ? theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.02)"
                  : "rgba(0,0,0,0.02)"
                : "transparent",
          }}
        >
          {/* Avatar */}
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Avatar
              src={
                user.email === "admin@gmail.com"
                  ? "/assets/icons/admin.png"
                  : `https://randomuser.me/api/portraits/${
                      index % 2 ? "women" : "men"
                    }/${index + 10}.jpg`
              }
              sx={{
                width: 36,
                height: 36,
                border: `2px solid ${c.blueAccent500}`,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: isOnline ? "#22c55e" : "#ef4444",
                border: "2px solid #fff",
              }}
            />
          </Box>

          {/* Name */}
          <Typography
            fontWeight={600}
            sx={{ color: c.grey100, fontSize: 14 }}
          >
            {user.name}
          </Typography>

          {/* Email */}
          <Typography
            sx={{
              color: c.grey300,
              fontSize: 13,
              opacity: 0.9,
              wordBreak: "break-word",
            }}
          >
            {user.email}
          </Typography>

          {/* Role */}
          <Chip
            label={user.access.toUpperCase()}
            sx={{
              bgcolor:
                user.access === "admin"
                  ? c.blueAccent500
                  : user.access === "manager"
                  ? c.redAccent500
                  : c.greenAccent500,
              color: "#fff",
              fontWeight: 600,
              fontSize: 12,
              height: 24,
              borderRadius: "8px",
            }}
          />
        </Box>
      );
    })}
  </Paper>
</Box>


{/* =============== PROJECTS SECTION =============== */}
<Box mt={10}>
  <Typography
    variant="h4"
    fontWeight={800}
    mb={4}
    sx={{
      color: c.grey100,
      display: "flex",
      alignItems: "center",
      gap: 1,
      letterSpacing: "-0.4px",
    }}
  >
    <Box component="span" fontSize={30}>📦</Box> Active Projects
  </Typography>

  <Grid container spacing={3}>
    {[
      { title: "CRM Dashboard", progress: 82, team: ["admin@gmail.com", "manager@example.com"] },
      { title: "Ecommerce Platform", progress: 64, team: ["dev@example.com", "designer@example.com"] },
      { title: "Analytics Tool", progress: 47, team: ["data@example.com"] },
    ].map((project, i) => (
      <Grid item xs={12} md={4} key={i}>
        <Paper
          sx={{
            p: 3,
            borderRadius: 6,
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(145deg, rgba(40,40,40,0.95), rgba(25,25,25,0.9))"
                : "linear-gradient(145deg, #ffffff, #f8fafc)",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 8px 30px rgba(0,0,0,0.5)"
                : "0 8px 25px rgba(0,0,0,0.08)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
            "&:hover": {
              transform: "translateY(-4px)",
              border: "1px solid rgba(99,102,241,0.4)",
              boxShadow: "0 12px 35px rgba(99,102,241,0.2)",
            },
          }}
        >
          <Typography
            fontWeight={700}
            sx={{
              color: c.grey100,
              fontSize: 17,
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {project.title}
            <Typography
              sx={{
                fontSize: 12,
                color: c.grey400,
                fontWeight: 500,
              }}
            >
              {project.progress}% done
            </Typography>
          </Typography>

          {/* Progress Bar */}
          <LinearProgress
            variant="determinate"
            value={project.progress}
            sx={{
              height: 8,
              borderRadius: 10,
              backgroundColor: "rgba(255,255,255,0.08)",
              "& .MuiLinearProgress-bar": {
                background: "linear-gradient(90deg, #ffbb00ff, #22d3ee)",
              },
            }}
          />

          {/* Team Avatars */}
          <Box sx={{ display: "flex", mt: 2, gap: 1 }}>
            {project.team.map((email, idx) => (
              <Avatar
                key={idx}
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`}
                sx={{
                  width: 36,
                  height: 36,
                  border: "2px solid rgba(255,255,255,0.2)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.1)",
                    borderColor: "#1e21eaff",
                  },
                }}
              />
            ))}
          </Box>
        </Paper>
      </Grid>
    ))}
  </Grid>
</Box>

{/* =============== PERFORMANCE OVERVIEW =============== */}
<Box mt={12}>
  <Typography
    variant="h4"
    fontWeight={800}
    mb={4}
    sx={{
      color: c.grey100,
      display: "flex",
      alignItems: "center",
      gap: 1,
      letterSpacing: "-0.4px",
    }}
  >
    <Box component="span" fontSize={30}>📈</Box> Performance Overview
  </Typography>

  <Grid container spacing={3}>
    {[
      { title: "Total Users", value: "1,247", change: "+8%" },
      { title: "Revenue", value: "$12,340", change: "+4%" },
      { title: "New Orders", value: "189", change: "-2%" },
      { title: "Active Projects", value: "7", change: "+1%" },
    ].map((metric, i) => (
      <Grid item xs={12} sm={6} md={3} key={i}>
        <Paper
          sx={{
            p: 3,
            borderRadius: 6,
            textAlign: "center",
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(145deg, rgba(30,30,30,0.95), rgba(45,45,45,0.85))"
                : "linear-gradient(145deg, #ffffff, #f3f4f6)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 8px 30px rgba(0,0,0,0.5)"
                : "0 6px 20px rgba(0,0,0,0.08)",
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 12px 40px rgba(99,102,241,0.25)"
                  : "0 12px 35px rgba(99,102,241,0.15)",
            },
          }}
        >
          <Typography
            sx={{ color: c.grey400, fontSize: 14, mb: 1 }}
          >
            {metric.title}
          </Typography>
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{ color: c.grey100 }}
          >
            {metric.value}
          </Typography>
          <Typography
            sx={{
              color: metric.change.startsWith("+") ? "#22c55e" : "#ef4444",
              fontSize: 13,
              mt: 0.5,
              fontWeight: 600,
            }}
          >
            {metric.change}
          </Typography>
        </Paper>
      </Grid>
    ))}
  </Grid>
</Box>

{/* =============== MODERN TIMELINE ACTIVITY SECTION =============== */}
<Box mt={12}>
  {/* Section Header */}
  <Typography
    variant="h4"
    fontWeight={800}
    mb={4}
    sx={{
      color: c.grey100,
      display: "flex",
      alignItems: "center",
      gap: 1,
      letterSpacing: "-0.4px",
    }}
  >
    <Box component="span" fontSize={30}>💬</Box> Recent Activities
  </Typography>

  <Paper
    sx={{
      p: 4,
      borderRadius: 6,
      position: "relative",
      background:
        theme.palette.mode === "dark"
          ? "linear-gradient(145deg, rgba(30,30,30,0.95), rgba(20,20,20,0.9))"
          : "linear-gradient(145deg, #ffffff, #f9fafb)",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow:
        theme.palette.mode === "dark"
          ? "0 8px 30px rgba(0,0,0,0.4)"
          : "0 8px 25px rgba(0,0,0,0.08)",
    }}
  >
    {/* Vertical Timeline Line */}
    <Box
      sx={{
        position: "absolute",
        top: 32,
        bottom: 32,
        left: 48,
        width: 6,
        background: theme.palette.mode === "dark" ? "#555" : "#ccc",
        borderRadius: 3,
      }}
    />

    {[
      { user: "Admin", icon: "🛠️", text: "updated CRM Dashboard", time: "2 mins ago", email: "admin@gmail.com", color: "#22c55e" },
      { user: "Client", icon: "💸", text: "made a payment", time: "1 hour ago", email: "client@example.com", color: "#ef4444" },
      { user: "Developer", icon: "🧑‍💻", text: "added new API endpoint", time: "Yesterday", email: "dev@example.com", color: "#1e40af" },
    ].map((activity, i) => (
      <Box
        key={i}
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          py: 4,
          pl: 12,
        }}
      >
        {/* Timeline Marker */}
        <Box
          sx={{
            position: "absolute",
            left: 40,
            width: 20,
            height: 20,
            borderRadius: "50%",
            bgcolor: activity.color,
            border: "3px solid #fff",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          }}
        />

        {/* Left Content: Avatar + Text */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Avatar
            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${activity.email}`}
            sx={{ width: 40, height: 40, border: "2px solid rgba(255,255,255,0.1)" }}
          />
          <Box>
            <Typography sx={{ color: c.grey100, fontSize: 15, fontWeight: 500 }}>
              <strong>{activity.user}</strong> {activity.text}
            </Typography>
          </Box>
        </Box>

        {/* Right Content: Time */}
        <Typography sx={{ color: c.grey400, fontSize: 13, ml: "auto" }}>
          {activity.time}
        </Typography>
      </Box>
    ))}
  </Paper>
</Box>


 {/* 📊 STATS SUMMARY */}
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  <Paper
    elevation={8}
    sx={(theme) => ({
      mt: 6,
      p: 5,
      borderRadius: 6,
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
      gap: 3,
      backdropFilter: "blur(18px)",
      background:
        theme.palette.mode === "dark"
          ? "linear-gradient(180deg,rgba(15,15,25,0.95),rgba(20,25,40,0.9))"
          : "linear-gradient(180deg,#ffffff,#f8fafc)",
      border:
        theme.palette.mode === "dark"
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(0,0,0,0.06)",
      boxShadow:
        theme.palette.mode === "dark"
          ? "0 12px 40px rgba(0,0,0,0.35)"
          : "0 8px 28px rgba(0,0,0,0.07)",
      color: theme.palette.mode === "dark" ? "#fff" : "#111827",
    })}
  >
    {[
      { title: "Total Orders", value: "1,896", sub: "Last year expenses", color: "#10b981", icon: "📦" },
      { title: "Followers", value: "45.9%", sub: "People Interested", color: "#ef4444", icon: "👥" },
      { title: "Products Sold", value: "$12.6k", sub: "Total revenue streams", color: "#2563eb", icon: "🛒" },
      { title: "Clients", value: "$3M", sub: "Total Clients Profit", color: "#f59e0b", icon: "💼" },
    ].map((s, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.05, y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        style={{ flex: "1 1 240px", maxWidth: 280 }}
      >
        <Paper
          elevation={3}
          sx={(theme) => ({
            p: 3,
            textAlign: "center",
            borderRadius: 5,
            transition: "all 0.3s ease",
            background:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.04)"
                : "rgba(0,0,0,0.02)",
            border:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.06)",
            "&:hover": {
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 8px 32px rgba(37,99,235,0.35)"
                  : "0 8px 28px rgba(37,99,235,0.15)",
              transform: "translateY(-4px)",
            },
          })}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography sx={{ fontSize: 28, mr: 1.5 }}>{s.icon}</Typography>
            <Typography
              sx={(theme) => ({
                fontSize: 16,
                fontWeight: 700,
                color:
                  theme.palette.mode === "dark" ? "#e2e8f0" : "#374151",
              })}
            >
              {s.title}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: 36,
              fontWeight: 900,
              color: s.color,
              mb: 0.8,
            }}
          >
            {s.value}
          </Typography>

          <Typography
            sx={(theme) => ({
              fontSize: 14,
              color:
                theme.palette.mode === "dark" ? "#9ca3af" : "#6b7280",
              fontWeight: 500,
            })}
          >
            {s.sub}
          </Typography>
        </Paper>
      </motion.div>
    ))}
  </Paper>
</motion.div>

{/* ================= NEW SECTION: Modern Dynamic Table + Tasks + Chat + Stats Summary ================= */}
<Box px={isMobile ? 2 : 3} mt={15}>
  {/* 🌐 DYNAMIC TABLE (Light + Dark mode) */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <Paper
      elevation={6}
      sx={(theme) => ({
        borderRadius: 5,
        overflow: "hidden",
        backdropFilter: "blur(14px)",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg,rgba(15,15,30,0.9),rgba(20,25,40,0.85))"
            : "linear-gradient(180deg,#ffffff,#f8fafc)",
        border:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(0,0,0,0.08)",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 12px 40px rgba(0,0,0,0.25)"
            : "0 6px 20px rgba(0,0,0,0.08)",
        color: theme.palette.mode === "dark" ? "#fff" : "#111827",
      })}
    >
      {/* Header */}
      <Box
        sx={(theme) => ({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(90deg,#3730a3,#2563eb)"
              : "linear-gradient(90deg,#fff,#fff)",
          color: "#000000ff",
          borderBottom:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255,255,255,0.15)"
              : "1px solid rgba(0,0,0,0.1)",
        })}
      >
        <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: 0.5 }}>
          🌐 Dynamic Tables
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            variant="contained"
            sx={{
              px: 3,
              fontWeight: 600,
              fontSize: 15,
              background: "rgba(0, 0, 0, 0.9)",
              "&:hover": { background: "rgba(33, 33, 33, 0.3)" },
            }}
          >
            Refresh
          </Button>
          <Button
            variant="outlined"
            sx={{
              px: 3,
              fontWeight: 600,
              color: "#000000ff",
              borderColor: "rgba(0, 0, 0, 0.6)",
              "&:hover": {
                borderColor: "#fff",
                bgcolor: "rgba(35, 35, 35, 0.15)",
              },
            }}
          >
            Remove
          </Button>
        </Box>
      </Box>

      {/* Body */}
      <Box p={3}>
        <Box mb={3} display="flex" alignItems="center" gap={2}>
          <Typography
            sx={(theme) => ({
              fontSize: 16,
              fontWeight: 600,
              color:
                theme.palette.mode === "dark" ? grey[300] : grey[700],
            })}
          >
            🔍 Search:
          </Typography>
          <InputBase
            placeholder="Type to filter results..."
            sx={(theme) => ({
              border:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255,255,255,0.15)"
                  : "1px solid rgba(0,0,0,0.15)",
              pl: 2,
              py: 1.2,
              borderRadius: 3,
              width: 380,
              fontSize: 15,
              color: theme.palette.mode === "dark" ? "#fff" : "#111",
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.03)",
              "&::placeholder": {
                color:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(0,0,0,0.4)",
              },
            })}
          />
        </Box>

        {/* Table */}
        <Table>
          <TableHead>
            <TableRow
              sx={(theme) => ({
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(142, 142, 142, 1)"
                    : "rgba(228, 228, 228, 1)",
              })}
            >
              {["#", "Country", "Area", "Population"].map((col, i) => (
                <TableCell
                  key={i}
                  sx={(theme) => ({
                    color:
                      theme.palette.mode === "dark" ? "#fff" : "#111",
                    fontWeight: 700,
                    fontSize: 15,
                  })}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              {
                id: 1,
                country: "Russia",
                flag: "🇷🇺",
                area: "17,075,200",
                population: "146,989,754",
              },
              {
                id: 2,
                country: "France",
                flag: "🇫🇷",
                area: "640,679",
                population: "64,979,548",
              },
              {
                id: 3,
                country: "Germany",
                flag: "🇩🇪",
                area: "357,114",
                population: "82,114,224",
              },
              {
                id: 4,
                country: "Portugal",
                flag: "🇵🇹",
                area: "92,090",
                population: "10,329,506",
              },
            ].map((r) => (
              <TableRow
                key={r.id}
                hover
                sx={(theme) => ({
                  transition: "0.3s",
                  "&:hover": {
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.03)",
                  },
                })}
              >
                <TableCell
                  sx={(theme) => ({
                    color:
                      theme.palette.mode === "dark"
                        ? "#c7d2fe"
                        : "#1e3a8a",
                  })}
                >
                  {r.id}
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Typography fontSize={20}>{r.flag}</Typography>
                    <Typography
                      fontWeight={600}
                      sx={(theme) => ({
                        color:
                          theme.palette.mode === "dark"
                            ? "#fff"
                            : "#111827",
                      })}
                    >
                      {r.country}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell
                  sx={(theme) => ({
                    color:
                      theme.palette.mode === "dark"
                        ? "#cbd5e1"
                        : "#374151",
                  })}
                >
                  {r.area}
                </TableCell>
                <TableCell
                  sx={(theme) => ({
                    color:
                      theme.palette.mode === "dark"
                        ? "#cbd5e1"
                        : "#374151",
                  })}
                >
                  {r.population}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Box>
            <Button
              variant="outlined"
              sx={(theme) => ({
                color: theme.palette.mode === "dark" ? "#fff" : "#111",
                borderColor:
                  theme.palette.mode === "dark" ? "#555" : "#ccc",
              })}
            >
              «
            </Button>
            {[1, 2, 3, 4].map((n) => (
              <Button
                key={n}
                sx={(theme) => ({
                  mx: 0.5,
                  px: 2,
                  fontSize: 15,
                  bgcolor:
                    n === 1
                      ? "#2563eb"
                      : theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.04)",
                  color: "#fff",
                  "&:hover": {
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "#3b82f6"
                        : "#2563eb",
                  },
                })}
              >
                {n}
              </Button>
            ))}
            <Button
              variant="outlined"
              sx={(theme) => ({
                color: theme.palette.mode === "dark" ? "#fff" : "#111",
                borderColor:
                  theme.palette.mode === "dark" ? "#555" : "#ccc",
              })}
            >
              »
            </Button>
          </Box>
          <Typography
            sx={(theme) => ({
              fontSize: 14,
              color:
                theme.palette.mode === "dark"
                  ? grey[400]
                  : grey[700],
            })}
          >
            4 items per page
          </Typography>
        </Box>
      </Box>
    </Paper>
  </motion.div>




<Grid container spacing={4} mt={5}>
  <Grid item xs={12} md={6}>
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Paper
        elevation={8}
        sx={(theme) => ({
          borderRadius: 6,
          overflow: "hidden",
          backdropFilter: "blur(20px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 12px 40px rgba(0,0,0,0.4)"
              : "0 8px 24px rgba(0,0,0,0.08)",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(180deg,rgba(17,24,39,0.98),rgba(15,15,30,0.95))"
              : "linear-gradient(180deg,#ffffff,#f8fafc)",
          color: theme.palette.mode === "dark" ? "#fff" : "#111827",
          border:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(0,0,0,0.08)",
        })}
      >
        {/* Header */}
        <Box
          sx={(theme) => ({
            p: 4,
            borderBottom:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.15)"
                : "1px solid rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background:
              theme.palette.mode === "dark"
                ? "rgba(30,41,59,0.7)"
                : "rgba(248,250,252,0.8)",
          })}
        >
          <Typography variant="h4" fontWeight={800} letterSpacing={0.5}>
            📝 Task List
          </Typography>

          <Button
            variant="contained"
            sx={(theme) => ({
              px: 3,
              py: 1,
              borderRadius: 3,
              fontWeight: 600,
              fontSize: 15,
              color: theme.palette.mode === "dark" ? "#fff" : "#111",
              background:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(0,0,0,0.05)",
              "&:hover": {
                background:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.25)"
                    : "rgba(0,0,0,0.1)",
              },
            })}
          >
            + Add Task
          </Button>
        </Box>

        {/* Task List */}
        <List sx={{ p: 3 }}>
          {[
            { title: "Wash the car", by: "Bob", status: "rejected" },
            { title: "Go grocery shopping", by: "Alice", status: "latest" },
            { title: "Prepare presentation", by: "Johnny", status: "new" },
          ].map((t, i) => (
            <React.Fragment key={i}>
              <ListItem sx={{ py: 3, px: 2 }}>
                <ListItemAvatar>
                  <Avatar
                    src={`https://randomuser.me/api/portraits/${
                      i % 2 ? "women" : "men"
                    }/${i + 10}.jpg`}
                    sx={(theme) => ({
                      width: 50,
                      height: 50,
                      border:
                        theme.palette.mode === "dark"
                          ? "2px solid rgba(255,255,255,0.15)"
                          : "2px solid rgba(0,0,0,0.1)",
                    })}
                  />
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography fontWeight={700} fontSize={20}>
                      {t.title}{" "}
                      {t.status === "rejected" && (
                        <Chip
                          label="REJECTED"
                          size="small"
                          sx={{
                            ml: 1,
                            bgcolor: "rgba(239,68,68,0.15)",
                            color: "#ef4444",
                            fontWeight: 700,
                          }}
                        />
                      )}
                      {t.status === "latest" && (
                        <Chip
                          label="LATEST"
                          size="small"
                          sx={{
                            ml: 1,
                            bgcolor: "rgba(34,197,94,0.15)",
                            color: "#22c55e",
                            fontWeight: 700,
                          }}
                        />
                      )}
                      {t.status === "new" && (
                        <Chip
                          label="NEW"
                          size="small"
                          sx={{
                            ml: 1,
                            bgcolor: "rgba(59,130,246,0.15)",
                            color: "#3b82f6",
                            fontWeight: 700,
                          }}
                        />
                      )}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      sx={(theme) => ({
                        color:
                          theme.palette.mode === "dark"
                            ? "#cbd5e1"
                            : "#4b5563",
                        fontSize: 15,
                        mt: 0.5,
                      })}
                    >
                      Assigned by <strong>{t.by}</strong>
                    </Typography>
                  }
                />
              </ListItem>
              <Divider
                sx={(theme) => ({
                  borderColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.08)",
                  mx: 3,
                })}
              />
            </React.Fragment>
          ))}
        </List>

        {/* Footer */}
        <Box
          sx={(theme) => ({
            p: 3,
            textAlign: "center",
            borderTop:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid rgba(0,0,0,0.08)",
          })}
        >
          <Button
            variant="text"
            sx={(theme) => ({
              fontWeight: 600,
              fontSize: 16,
              color:
                theme.palette.mode === "dark"
                  ? "#93c5fd"
                  : "#2563eb",
              "&:hover": {
                color:
                  theme.palette.mode === "dark"
                    ? "#60a5fa"
                    : "#1d4ed8",
              },
            })}
          >
            View All Tasks →
          </Button>
        </Box>
      </Paper>
    </motion.div>
  </Grid>

 {/* 💬 CHAT BOX (ChatGPT style) */}
<Grid item xs={12} md={6}>
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
  >
    <Paper
      elevation={6}
      sx={(theme) => ({
        borderRadius: 5,
        overflow: "hidden",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg,rgba(17,24,39,0.98),rgba(15,15,30,0.96))"
            : "linear-gradient(180deg,#f9fafb,#ffffff)",
        border:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(0,0,0,0.08)",
        color: theme.palette.mode === "dark" ? "#e5e7eb" : "#111827",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 10px 35px rgba(0,0,0,0.5)"
            : "0 10px 30px rgba(0,0,0,0.08)",
      })}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2.5,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          💬 Chat Assistant
        </Typography>
        <Chip
          label="Online"
          size="small"
          sx={{
            bgcolor: "rgba(16,185,129,0.15)",
            color: "#10b981",
            fontWeight: 600,
          }}
        />
      </Box>

      {/* Messages */}
      <Box
        sx={{
          p: 3,
          height: 360,
          overflowY: "auto",
          background:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.02)"
              : "rgba(0,0,0,0.02)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {[
          { side: "left", text: "Hey there! How’s the CRM redesign going?", time: "10:02 AM" },
          { side: "right", text: "Looking great! Added some ChatGPT-style elements 👌", time: "10:04 AM" },
          { side: "left", text: "Nice! Let’s push the update soon 🚀", time: "10:06 AM" },
        ].map((m, i) => (
          <Box
            key={i}
            display="flex"
            justifyContent={m.side === "right" ? "flex-end" : "flex-start"}
            alignItems="flex-start"
            gap={1}
          >
            {m.side === "left" && (
              <Avatar
                src="https://randomuser.me/api/portraits/men/12.jpg"
                sx={{ width: 36, height: 36 }}
              />
            )}
            <Paper
              sx={(theme) => ({
                p: 1.6,
                px: 2,
                borderRadius: 3,
                maxWidth: "75%",
                bgcolor:
                  m.side === "right"
                    ? theme.palette.mode === "dark"
                      ? "rgba(37,99,235,0.25)"
                      : "#2563eb"
                    : theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.08)"
                      : "#f3f4f6",
                color:
                  m.side === "right"
                    ? "#fff"
                    : theme.palette.mode === "dark"
                      ? "#e5e7eb"
                      : "#111827",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 2px 10px rgba(0,0,0,0.4)"
                    : "0 2px 8px rgba(0,0,0,0.08)",
              })}
            >
              <Typography fontSize={15}>{m.text}</Typography>
              <Typography
                sx={{
                  fontSize: 11,
                  opacity: 0.6,
                  mt: 0.5,
                  textAlign: "right",
                }}
              >
                {m.time}
              </Typography>
            </Paper>
            {m.side === "right" && (
              <Avatar
                src="https://randomuser.me/api/portraits/women/24.jpg"
                sx={{ width: 36, height: 36 }}
              />
            )}
          </Box>
        ))}
      </Box>

      {/* Input */}
      <Box
        sx={{
          p: 2.5,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          background:
            theme.palette.mode === "dark"
              ? "rgba(17,24,39,0.9)"
              : "rgba(249,250,251,0.95)",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Paper
          sx={(theme) => ({
            flex: 1,
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 1.2,
            borderRadius: 4,
            border:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.08)",
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.05)"
                : "#fff",
          })}
        >
          <InputBase
            placeholder="Message Chat Assistant..."
            sx={{
              flex: 1,
              fontSize: 15,
              color: "inherit",
              "&::placeholder": { opacity: 0.6 },
            }}
          />
          <IconButton color="primary">
            <SendRoundedIcon />
          </IconButton>
        </Paper>
      </Box>
    </Paper>
  </motion.div>
</Grid>
</Grid>

</Box>

      {/* Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled" sx={{ width: "100%" }}>
          ✅ Admin password successful!
        </Alert>
      </Snackbar>

      {/* Contact Form */}
      <Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
        <ContactEmailForm />
      </Box>
    </Box>
  );
}
