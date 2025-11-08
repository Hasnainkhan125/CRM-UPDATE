import { useState, useEffect } from "react";
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
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart"; // Added
import PieChart from "../../components/PieChart"; // Added
import GeographyChart from "../../components/GeographyChart"; // Added
import StatBox from "../../components/StatBox";
import ContactEmailForm from "../../components/ContactEmailForm";

const ADMIN_SESSION_KEY = "admin-access-granted";
const ADMIN_PASSWORD = "admin123";
const TEAM_KEY = "team-members";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
    const timer = setTimeout(() => setLoadingPage(false), 1500);
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
          { _id: "2", name: "John Doe", age: 25, email: "john@gmail.com", password: "john123", access: "manager" },
          { _id: "3", name: "Jane Smith", age: 27, email: "jane@gmail.com", password: "jane123", access: "user" },
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

    const handleStorageEvent = () => {
      const updatedRaw = localStorage.getItem(TEAM_KEY);
      const updated = updatedRaw ? JSON.parse(updatedRaw) : [];
      const cleaned = (updated || []).map((u) => ({
        ...u,
        email: u.email ?? u.emailAddress ?? u.username ?? "",
        password: u.password ?? u.pw ?? u.pass ?? "",
        name: u.name ?? u.fullName ?? "",
      }));
      setRecentUsers(cleaned);
    };

    window.addEventListener("storage", handleStorageEvent);
    window.addEventListener("teamDataUpdated", handleStorageEvent);

    return () => {
      window.removeEventListener("storage", handleStorageEvent);
      window.removeEventListener("teamDataUpdated", handleStorageEvent);
    };
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
    }, 1500);
  };

  if (loadingPage) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "80vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.primary[400],
        }}
      >
        <CircularProgress color="secondary" size={80} thickness={5} />
        <Typography variant="h3" sx={{ mt: 3, fontWeight: "bold" }}>
          Loading Dashboard...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100vh", overflow: "hidden", p: isMobile ? 2 : 3, position: "relative" }}>
      {/* HEADER */}
      <Box display="flex" flexDirection={isMobile ? "column" : "row"} justifyContent="space-between" alignItems={isMobile ? "flex-start" : "center"} mb={isMobile ? 3 : 2} gap={2}>
        <Header title="DASHBOARD" subtitle="REGIN ESTATE" />
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
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

      {/* GRID & CHARTS */}
      <Box display="grid" gridTemplateColumns={isMobile ? "repeat(1, 1fr)" : isTablet ? "repeat(6, 1fr)" : "repeat(12, 1fr)"} gridAutoRows="140px" gap="20px">
        {/* Stat Boxes */}
        <Box gridColumn={isMobile ? "span 1" : "span 3"} backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title={(recentUsers?.length ?? 0).toLocaleString()}
            subtitle="Total Users"
            progress="0.75"
            increase="+14%"
            icon={<EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box gridColumn={isMobile ? "span 1" : "span 3"} backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title={`PK ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            subtitle="Total Revenue"
            progress="0.50"
            increase="+21%"
            icon={<PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box gridColumn={isMobile ? "span 1" : "span 3"} backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress="0.30"
            increase="+5%"
            icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box gridColumn={isMobile ? "span 1" : "span 3"} backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center">
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={<TrafficIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>

        {/* Revenue Chart */}
        <Box gridColumn={isMobile ? "span 1" : isTablet ? "span 6" : "span 8"} gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box mt="0px" m="-20px" p="0px 30px" display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Revenue Generated
              </Typography>
              <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
                ${totalRevenue?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? "0.00"}
              </Typography>
            </Box>
            <IconButton>
              <DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
            </IconButton>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>


             {/* Recent Users */}
        <Box gridColumn={isMobile ? "span 1" : isTablet ? "span 6" : "span 4"} gridRow="span 2" backgroundColor={colors.primary[400]} overflow="auto">
          <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Added Users
            </Typography>
          </Box>

          {!adminAccess ? (
            <Fade in={!adminAccess}>
              <Box p="30px" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Typography variant="h6" color={colors.grey[500]} fontWeight="600" mb={2}>
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
                  <CircularProgress color="secondary" size={40} thickness={5} sx={{ mt: 2 }} />
                )}
              </Box>
            </Fade>
          ) : recentUsers.length === 0 ? (
            <Typography color={colors.grey[100]} p="15px">
              No recent users
            </Typography>
          ) : (
            [...recentUsers].reverse().map((user) => (
              <Box
                key={user._id ?? user.id ?? user.email}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography color={colors.greenAccent[600]} fontWeight="600">
                    {user.email}
                  </Typography>
                  <Typography color={colors.grey[100]}>Password: {user.password}</Typography>
                  <Typography color={colors.redAccent[300]} sx={{ textTransform: "uppercase" }}>
                    Name: {user.name}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor={
                    user.access === "admin"
                      ? colors.blueAccent[500]
                      : user.access === "manager"
                      ? colors.redAccent[500]
                      : colors.greenAccent[500]
                  }
                  p="5px 10px"
                  borderRadius="4px"
                >
                  {user.access === "admin" && <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 18, mr: 1 }} />}
                  {user.access === "manager" && <SecurityOutlinedIcon sx={{ fontSize: 18, mr: 1 }} />}
                  {user.access === "user" && <LockOpenOutlinedIcon sx={{ fontSize: 18, mr: 1 }} />}
                  <Typography color={colors.grey[100]} sx={{ textTransform: "uppercase", fontWeight: "600" }}>
                    {user.access}
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </Box>

          {/* Bar Chart */}
          <Box gridColumn={isMobile ?  "span 1" : isTablet ? "span 3" : "span 4"}  gridRow="span 2" ackgroundColor={colors.primary[400]}>
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}  m="20px" p="30px">
              Sales Overview
            </Typography>
            <Box height="250px" m="-40px">
              <BarChart isDashboard={true} />
            </Box>
          </Box>

          {/* Pie Chart */}
          <Box gridColumn={isMobile ? "span 1" : isTablet ? "span 3" : "span 4"} gridRow="span 2" >
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}m="20px" p="40px">
              User Distribution
            </Typography>
            <Box height="190px" m="-40px">
              <PieChart isDashboard={true} />
            </Box>
          </Box>

          {/* Geography Chart */}
          <Box gridColumn={isMobile ? "span 1" : isTablet ? "span 3" : "span 4"} gridRow="span 2">
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}m="20px" p="30px">
              Traffic by Region
            </Typography>
            <Box height="250px" m="-40px">
              <GeographyChart isDashboard={true} />
            </Box>
          </Box>

    
        </Box>

      {/* Success Snackbar */}
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
};

export default Dashboard;
