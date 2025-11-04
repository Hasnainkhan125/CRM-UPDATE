import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Snackbar,
  Alert,
  useTheme,
  Slide,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const API_URL = "http://localhost:5000/api/team";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.down("md"));

  const [teamData, setTeamData] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [access, setAccess] = useState("user");

  const [viewMember, setViewMember] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editAccess, setEditAccess] = useState("");

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const panelRef = useRef(null);

  // Fetch team data from backend
  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      const res = await axios.get(API_URL);
      setTeamData(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setViewMember(null);
      }
    };
    if (viewMember) window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [viewMember]);

  const handleAddNewMember = async () => {
  if (!name || !age || !password || !email) {
    setNotification({
      open: true,
      message: "Please fill all fields.",
      severity: "error",
    });
    return;
  }

  try {
    const res = await axios.post(API_URL, { name, age, email, password, access });
    const newMember = res.data;

    // ✅ Update backend + localStorage (used by login page)
    const saved = JSON.parse(localStorage.getItem("team-members")) || [];
    saved.push(newMember);
    localStorage.setItem("team-members", JSON.stringify(saved));

    setTeamData([...teamData, newMember]);
    setName(""); setAge(""); setPassword(""); setEmail(""); setAccess("user");
    setNotification({ open: true, message: "User added successfully!", severity: "success" });
  } catch (err) {
    setNotification({ open: true, message: "Error adding user.", severity: "error" });
  }
};

  const handleDeleteMember = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTeamData(teamData.filter((m) => m._id !== id));
      if (viewMember?._id === id) setViewMember(null);
      setNotification({
        open: true,
        message: "User deleted!",
        severity: "info",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewMember = (member) => {
    setViewMember(member);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    if (!viewMember) return;
    setIsEditing(true);
    setEditName(viewMember.name || "");
    setEditAge(viewMember.age || "");
    setEditPassword(viewMember.password || "");
    setEditEmail(viewMember.email || "");
    setEditAccess(viewMember.access || "user");
  };

  const handleSaveEdit = async () => {
    const updatedData = {
      name: editName,
      age: editAge,
      email: editEmail,
      password: editPassword,
      access: editAccess,
    };

    try {
      const res = await axios.put(`${API_URL}/${viewMember._id}`, updatedData);
      const updatedTeam = teamData.map((m) =>
        m._id === viewMember._id ? res.data : m
      );
      setTeamData(updatedTeam);
      setViewMember(res.data);
      setIsEditing(false);
      setNotification({
        open: true,
        message: "User updated successfully!",
        severity: "success",
      });
      setTimeout(() => setViewMember(null), 500);
    } catch (err) {
      console.error(err);
    }
  };

  const baseColumns = [
    { field: "_id", headerName: "ID", width: 180 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 120 },
    { field: "age", headerName: "Age", width: 80 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
    { field: "password", headerName: "Password", flex: 1, minWidth: 120 },
    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
      minWidth: 140,
      renderCell: ({ row: { access } }) => (
        <Box
          width="80%"
          m="0 auto"
          color={"white"}
          p={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor={
            access === "admin"
              ? colors.blueAccent[500]
              : access === "manager"
              ? colors.redAccent[500]
              : colors.greenAccent[500]
          }
          borderRadius="4px"
        >
          {access === "admin" && <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 16 }} />}
          {access === "manager" && <SecurityOutlinedIcon sx={{ fontSize: 16 }} />}
          {access === "user" && <LockOpenOutlinedIcon sx={{ fontSize: 16 }} />}
          <Typography sx={{ ml: 1, fontSize: 12 }}>{access}</Typography>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      renderCell: ({ row }) => (
        <Box display="flex" gap={1}>
          <IconButton
            sx={{ color: colors.blueAccent[400] }}
            onClick={() => handleViewMember(row)}
            aria-label="view"
            size="small"
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDeleteMember(row._id)}
            aria-label="delete"
            size="small"
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const columns = isXs
    ? baseColumns.filter((c) => c.field !== "password")
    : baseColumns;

  const gridHeight = isXs ? 420 : isSm ? 520 : 520;

  return (
    <Box m={isXs ? 1 : 2}>
      <Header title="TEAM" subtitle="Manage Team Members" />

      {/* Add Member Form */}
      <Box
        display="flex"
        gap={2}
        mb={2}
        flexWrap="wrap"
        sx={{
          alignItems: "flex-end",
          flexDirection: isXs ? "column" : "row",
          "& .MuiTextField-root": { minWidth: isXs ? "100%" : 180 },
        }}
      >
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <TextField
          select
          label="Access"
          value={access}
          onChange={(e) => setAccess(e.target.value)}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </TextField>

        <Button
          variant="contained"
          onClick={handleAddNewMember}
          sx={{
            minWidth: 80,
            height: 50,
            background: "#e6b524ee",
            color: "#fff",
            fontWeight: 600,
            borderRadius: "5px",
            "&:hover": { background: "#b58b0eee" },
          }}
        >
          Add
        </Button>
      </Box>

      {/* Team Table */}
      <Box
        sx={{
          height: gridHeight,
          width: "100%",
          mb: 2,
          "& .MuiDataGrid-root": {
            background: theme.palette.mode === "dark" ? "#0d001cff" : "#fff",
          },
        }}
      >
        <DataGrid
          rows={teamData}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          sx={{
            border: "none",
            ".MuiDataGrid-columnHeaders": {
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              fontWeight: "bold",
            },
          }}
        />
      </Box>

      {/* Right Side Slide Panel */}
      <Slide direction="left" in={!!viewMember} mountOnEnter unmountOnExit>
        <Box
          ref={panelRef}
          position="fixed"
          top={0}
          right={0}
          height="100vh"
          width={isXs ? "100%" : isSm ? "60%" : "30%"}
          bgcolor={theme.palette.mode === "dark" ? "#1e1e2f" : "#fff"}
          color={theme.palette.mode === "dark" ? "#fff" : "#000"}
          boxShadow={6}
          p={isXs ? 2 : 4}
          overflow="auto"
          zIndex={1300}
        >
          {viewMember && (
            <>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Member Details
              </Typography>

              <Box component="form" noValidate autoComplete="off" display="grid" gap={2}>
                <TextField
                  label="Name"
                  value={isEditing ? editName : viewMember.name}
                  onChange={(e) => setEditName(e.target.value)}
                  InputProps={{ readOnly: !isEditing }}
                  fullWidth
                />
                <TextField
                  label="Age"
                  type="number"
                  value={isEditing ? editAge : viewMember.age}
                  onChange={(e) => setEditAge(e.target.value)}
                  InputProps={{ readOnly: !isEditing }}
                  fullWidth
                />
                <TextField
                  label="Email"
                  value={isEditing ? editEmail : viewMember.email}
                  onChange={(e) => setEditEmail(e.target.value)}
                  InputProps={{ readOnly: !isEditing }}
                  fullWidth
                />
                <TextField
                  label="Password"
                  type="password"
                  value={isEditing ? editPassword : viewMember.password}
                  onChange={(e) => setEditPassword(e.target.value)}
                  InputProps={{ readOnly: !isEditing }}
                  fullWidth
                />

                {isEditing ? (
                  <TextField
                    select
                    label="Access Level"
                    value={editAccess}
                    onChange={(e) => setEditAccess(e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </TextField>
                ) : (
                  <TextField
                    label="Access Level"
                    value={viewMember.access}
                    InputProps={{ readOnly: true }}
                    fullWidth
                  />
                )}
              </Box>

              <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                {isEditing ? (
                  <Button variant="contained" color="secondary" onClick={handleSaveEdit}>
                    Save
                  </Button>
                ) : (
                  <Button variant="contained" color="primary" onClick={handleEditClick}>
                    Edit
                  </Button>
                )}
                <Button variant="outlined" color="secondary" onClick={() => setViewMember(null)}>
                  Close
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Slide>

      {/* Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: isXs ? "center" : "right" }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Team;
