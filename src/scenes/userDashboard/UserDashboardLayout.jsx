import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const UserDashboardLayout = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        bgcolor: "#fff",
        color: "#000",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Main content area */}
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          height: "100%",
          overflowY: "auto", // scrollable if content is long
        }}
      >
        {/* Nested pages like UserDashboardShop will render here */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserDashboardLayout;
