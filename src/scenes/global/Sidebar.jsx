import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Avatar, Fade, Tooltip, useMediaQuery } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";

// Icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SmartToyIcon from "@mui/icons-material/SmartToy"; // AI Dashboard icon
import TableChartIcon from "@mui/icons-material/TableChart";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === to) setSelected(title);
  }, [location.pathname, to, title, setSelected]);

  return (
    <MenuItem active={selected === title} style={{ color: colors.grey[100] }} icon={icon}>
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const isMobile = useMediaQuery("(max-width:768px)");

  const [profileData, setProfileData] = useState({
    name: "Hasnain",
    role: "Admin",
    dp: "../../assets/user.png",
    verified: false,
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("profileData"));
    if (storedData) setProfileData(storedData);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedData = JSON.parse(localStorage.getItem("profileData"));
      if (storedData) setProfileData(storedData);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Collapse sidebar by default on mobile
  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  return (
    <Box
      sx={{
        height: "100vh",
        position: "relative",
        "& .pro-sidebar-inner": { background: `${colors.primary[400]} !important` },
        "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
        "& .pro-inner-item": { padding: "5px 35px 5px 20px !important" },
        "& .pro-inner-item:hover": { color: "#868dfb !important" },
        "& .pro-menu-item.active": { color: "#6870fa !important" },
      }}
    >
      {/* Toggle Icon for Mobile */}
      {isMobile && (
        <IconButton
          onClick={() => setIsCollapsed(!isCollapsed)}
          sx={{ position: "fixed", top: 10, left: 10, zIndex: 1300, color: colors.grey[100] }}
        >
          {isCollapsed ? <MenuOutlinedIcon /> : <CloseOutlinedIcon />}
        </IconButton>
      )}

      <ProSidebar
        collapsed={isCollapsed}
        breakPoint="md"
        style={{
          position: isMobile ? "fixed" : "relative",
          zIndex: isMobile ? 1200 : "auto",
          height: "100vh",
          left: isCollapsed && isMobile ? "-250px" : 0,
          transition: "left 0.3s",
        }}
      >
        <Menu iconShape="square">
          {/* LOGO */}
<MenuItem
  onClick={() => setIsCollapsed(!isCollapsed)}
  style={{ margin: "30px 0 20px 0", color: colors.grey[100] }}
  icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
>
  {!isCollapsed && (
    <Box display="flex" justifyContent="flex-start" alignItems="center" ml="15px">
      <Typography variant="h4" color={colors.grey[100]}>
        REGIN ESTATE
      </Typography>
    </Box>
  )}
</MenuItem>


          {/* PROFILE INFO */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center" position="relative">
                <Avatar src={profileData.dp || "../../assets/user.png"} alt={profileData.name || "User"} sx={{ width: 80, height: 80, cursor: "pointer" }} />
                {profileData.verified && (
                  <Fade in={profileData.verified}>
                    <Tooltip title="Verified User" arrow>
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: "rgba(76, 175, 80, 0.7)",
                          backdropFilter: "blur(6px)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: `1px solid ${colors.primary[400]}`,
                        }}
                      >
                        <CheckCircleIcon sx={{ color: "#fff", fontSize: 16 }} />
                      </Box>
                    </Tooltip>
                  </Fade>
                )}
              </Box>
              <Box textAlign="center" mt={1}>
                <Typography variant="h5" color={colors.grey[100]} sx={{ m: "5px 0" }}>
                  {profileData.name || "Ed Roh"}
                </Typography>
                <Typography variant="h6" color={colors.greenAccent[500]}>
                  {profileData.role || "Admin"}
                </Typography>
              </Box>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item title="Dashboard" to="/admin/dashboard" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Manage Team" to="/admin/team" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Contacts Information" to="/admin/contacts" icon={<ContactsOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Invoices Balances" to="/admin/invoices" icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="AI Dashboard" to="/admin/ai-dashboard" icon={<SmartToyIcon />} selected={selected} setSelected={setSelected} />

<Item
  title="Dynamic Table"
  to="/admin/dynamictable"
  icon={<TableChartIcon />}
  selected={selected}
  setSelected={setSelected}
/>

            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Pages</Typography>
            <Item title="User Form" to="/admin/form" icon={<PersonOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Calendar" to="/admin/calendar" icon={<CalendarTodayOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="FAQ Page" to="/admin/faq" icon={<HelpOutlineOutlinedIcon />} selected={selected} setSelected={setSelected} />


            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Security</Typography>
            <Item title="Admin Security" to="/admin/admin-security" icon={<SecurityOutlinedIcon />} selected={selected} setSelected={setSelected} />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
