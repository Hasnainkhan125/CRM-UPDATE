import React, { useState } from "react";
import {
  Box,
  Paper,
  Grid,
  Typography,
  Avatar,
  Button,
  TextField,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Divider,
  useTheme,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export default function SettingsPage() {
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({
    name: "Bessie Cooper",
    email: "bcooper@terastore.co",
    phone: "+62532 4892 0287",
  });
  const [avatar, setAvatar] = useState("/assets/icons/admin.png");
  const [twoFA, setTwoFA] = useState(true);
  const [loginAlert, setLoginAlert] = useState(true);

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatar(url);
  };

  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        p: { xs: 2, md: 6 },
        minHeight: "100vh",
        background: isDark ? "#0b0f1a" : "#f7f7f7",
        transition: "all 0.3s ease",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          background: isDark
            ? "rgba(16,16,33,0.85)"
            : "rgba(255,255,255,0.95)",
          color: isDark ? "#e6eef8" : "#1f1f1f",
          backdropFilter: "blur(12px)",
          border: isDark
            ? "1px solid rgba(255,255,255,0.05)"
            : "1px solid rgba(0,0,0,0.05)",
          boxShadow: isDark
            ? "0 15px 50px rgba(0,0,0,0.8)"
            : "0 15px 50px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: { xs: 3, md: 6 },
            py: { xs: 3, md: 4 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: isDark ? "#cbd5e1" : "#1f1f1f",
                fontWeight: 800,
                fontSize: { xs: 20, md: 24 },
              }}
            >
              Settings
            </Typography>
            <Typography
              sx={{ color: isDark ? "#94a3b8" : "#555", mt: 0.5, fontSize: 13 }}
            >
              Manage account, profile and preferences
            </Typography>
          </Box>

          <Button
            startIcon={<SaveIcon />}
            variant="contained"
            sx={{
              textTransform: "none",
              background: "linear-gradient(90deg,#7c3aed,#06b6d4)",
              px: 3,
              py: 1.2,
              borderRadius: 8,
              boxShadow: "0 10px 30px rgba(124,58,237,0.25)",
              "&:hover": {
                boxShadow: "0 15px 40px rgba(124,58,237,0.35)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Save Changes
          </Button>
        </Box>

        <Divider
          sx={{
            borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)",
          }}
        />

        {/* Main Content */}
        <Grid container>
          {/* Left Sidebar */}
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              borderRight: {
                md: isDark ? "1px solid rgba(255,255,255,0.02)" : "1px solid rgba(0,0,0,0.05)",
              },
              p: { xs: 3, md: 4 },
              background: {
                xs: "transparent",
                md: isDark
                  ? "linear-gradient(180deg, rgba(255,255,255,0.02), transparent)"
                  : "linear-gradient(180deg, rgba(0,0,0,0.02), transparent)",
              },
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <NavItem label="Account Settings" active isDark={isDark} />
              <NavItem label="Billing & Subscription" isDark={isDark} />
              <NavItem label="Appearance" isDark={isDark} />
              <NavItem label="Notifications" isDark={isDark} />
              <NavItem label="Integrations" isDark={isDark} />
              <NavItem label="Privacy & Data" isDark={isDark} />
            </Box>
          </Grid>

          {/* Right Content */}
          <Grid item xs={12} md={9} sx={{ p: { xs: 3, md: 5 } }}>
            {/* Tabs */}
            <Tabs
              value={tab}
              onChange={(e, v) => setTab(v)}
              sx={{
                mb: 4,
                "& .MuiTabs-indicator": {
                  height: 4,
                  borderRadius: 2,
                  background: "#7c3aed",
                  transition: "all 0.3s ease",
                },
              }}
            >
              <Tab label="Profile" sx={tab === 0 ? neonTabActive(isDark) : neonTab(isDark)} />
              <Tab label="Security" sx={tab === 1 ? neonTabActive(isDark) : neonTab(isDark)} />
              <Tab label="Password" sx={tab === 2 ? neonTabActive(isDark) : neonTab(isDark)} />
            </Tabs>

            {/* PROFILE TAB */}
            {tab === 0 && <ProfileTab form={form} handleChange={handleChange} avatar={avatar} handleAvatar={handleAvatar} isDark={isDark} />}
            {/* SECURITY TAB */}
            {tab === 1 && <SecurityTab twoFA={twoFA} setTwoFA={setTwoFA} loginAlert={loginAlert} setLoginAlert={setLoginAlert} isDark={isDark} />}
            {/* PASSWORD TAB */}
            {tab === 2 && <PasswordTab inputStyle={inputStyle(isDark)} isDark={isDark} />}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

/* ----------------- Helper Components ----------------- */
function NavItem({ label, active, isDark }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        cursor: "pointer",
        px: 1.5,
        py: 1,
        borderRadius: 2,
        transition: "all 0.3s ease",
        background: active
          ? "rgba(124,58,237,0.15)"
          : "transparent",
        "&:hover": { background: "rgba(124,58,237,0.05)" },
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 32,
          borderRadius: 2,
          background: active
            ? "linear-gradient(180deg,#7c3aed,#06b6d4)"
            : "transparent",
          boxShadow: active ? "0 6px 18px rgba(124,58,237,0.15)" : "none",
        }}
      />
      <Typography
        sx={{
          color: active ? (isDark ? "#e6eef8" : "#1f1f1f") : (isDark ? "#94a3b8" : "#555"),
          fontWeight: 600,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

/* ----------------- Tab Components ----------------- */
const ProfileTab = ({ form, handleChange, avatar, handleAvatar, isDark }) => (
  <Paper
    sx={{
      ...panelStyle(isDark),
      p: 4,
      borderRadius: 3,
      boxShadow: isDark
        ? "0 10px 30px rgba(0,0,0,0.6)"
        : "0 8px 24px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
    }}
    elevation={0}
  >
    {/* Header */}
    <Typography fontWeight={700} sx={{ mb: 1, color: isDark ? "#e6eef8" : "#1f1f1f", fontSize: 22 }}>
      Profile Information
    </Typography>
    <Typography sx={{ mb: 3, color: isDark ? "#94a3b8" : "#555", fontSize: 14 }}>
      Manage your personal details, contact info, and preferences.
    </Typography>

    <Grid container spacing={4}>
      {/* Avatar Section */}
      <Grid item xs={12} md={4}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <Avatar
            src={avatar}
            sx={{
              width: 110,
              height: 110,
              border: `4px solid ${isDark ? "rgba(124,58,237,0.35)" : "rgba(124,58,237,0.25)"}`,
              transition: "all 0.3s ease",
              "&:hover": { transform: "scale(1.1)", boxShadow: "0 10px 30px rgba(124,58,237,0.35)" },
            }}
          />
          <label htmlFor="upload-avatar">
            <input
              accept="image/*"
              id="upload-avatar"
              type="file"
              onChange={handleAvatar}
              style={{ display: "none" }}
            />
            <Button
              startIcon={<PhotoCamera />}
              component="span"
              sx={{
                textTransform: "none",
                background: isDark ? "rgba(124,58,237,0.1)" : "rgba(124,58,237,0.05)",
                color: isDark ? "#e6eef8" : "#1f1f1f",
                "&:hover": { background: isDark ? "rgba(124,58,237,0.2)" : "rgba(124,58,237,0.1)" },
                borderRadius: 2,
              }}
            >
              Change Photo
            </Button>
          </label>
          <Typography sx={{ color: isDark ? "#94a3b8" : "#555", fontSize: 13 }}>
            PNG, JPG up to 2MB
          </Typography>
        </Box>
      </Grid>

      {/* Personal Info Section */}
      <Grid item xs={12} md={8}>
        <Grid container spacing={2}>
          {[
            { name: "name", label: "Full Name" },
            { name: "email", label: "Email Address" },
            { name: "phone", label: "Phone Number" },
            { name: "role", label: "Role / Job Title" },
          ].map((field) => (
            <Grid item xs={12} sm={6} key={field.name}>
              <TextField
                name={field.name}
                value={form[field.name] || ""}
                onChange={handleChange}
                fullWidth
                variant="filled"
                label={field.label}
                InputLabelProps={{ shrink: true }}
                sx={inputStyle(isDark)}
              />
            </Grid>
          ))}

          {/* About Me */}
          <Grid item xs={12}>
            <TextField
              name="bio"
              value={form.bio || ""}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              variant="filled"
              label="About Me"
              InputLabelProps={{ shrink: true }}
              sx={inputStyle(isDark)}
            />
          </Grid>

          {/* Social Links */}
          <Grid item xs={12}>
            <Typography sx={{ color: isDark ? "#94a3b8" : "#555", fontWeight: 600, mb: 1 }}>
              Social Links
            </Typography>
            <Grid container spacing={2}>
              {["twitter", "linkedin"].map((field) => (
                <Grid item xs={12} sm={6} key={field}>
                  <TextField
                    name={field}
                    value={form[field] || ""}
                    onChange={handleChange}
                    fullWidth
                    variant="filled"
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    InputLabelProps={{ shrink: true }}
                    sx={inputStyle(isDark)}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Preferences */}
          <Grid item xs={12}>
            <Typography sx={{ color: isDark ? "#94a3b8" : "#555", fontWeight: 600, mb: 1 }}>
              Preferences
            </Typography>
            <Grid container spacing={1}>
              {[
                { name: "emailAlerts", label: "Email Alerts" },
                { name: "smsAlerts", label: "SMS Alerts" },
                { name: "newsletter", label: "Subscribe to Newsletter" },
              ].map((pref) => (
                <Grid item xs={12} sm={6} key={pref.name}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={form[pref.name] || false}
                        onChange={(e) =>
                          handleChange({ target: { name: pref.name, value: e.target.checked } })
                        }
                      />
                    }
                    label={pref.label}
                    sx={{ color: isDark ? "#e6eef8" : "#1f1f1f" }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Interests / Tags */}
          <Grid item xs={12}>
            <Typography sx={{ color: isDark ? "#94a3b8" : "#555", fontWeight: 600, mb: 1 }}>
              Interests
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {["Design", "Development", "Marketing", "Music", "Gaming"].map((tag) => (
                <Button
                  key={tag}
                  onClick={() => console.log(`Toggle ${tag}`)}
                  sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    textTransform: "none",
                    background: form.interests?.includes(tag)
                      ? "#7c3aed"
                      : isDark
                      ? "rgba(124,58,237,0.1)"
                      : "rgba(124,58,237,0.05)",
                    color: form.interests?.includes(tag)
                      ? "#fff"
                      : isDark
                      ? "#e6eef8"
                      : "#1f1f1f",
                    "&:hover": {
                      background: "#7c3aed",
                      color: "#fff",
                    },
                  }}
                >
                  {tag}
                </Button>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Paper>
);


/* SECURITY TAB */
const SecurityTab = ({ twoFA, setTwoFA, loginAlert, setLoginAlert, isDark }) => (
  <Paper sx={panelStyle(isDark)} elevation={0}>
    <Typography fontWeight={700} sx={{ mb: 1, color: isDark ? "#e6eef8" : "#1f1f1f" }}>
      Security
    </Typography>
    <Typography sx={{ mb: 3, color: isDark ? "#94a3b8" : "#555" }}>
      Keep your account secure with extra authentication and alerts.
    </Typography>

    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper elevation={0} sx={smallCard(isDark)}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box>
              <Typography fontWeight={700}>Two-Factor Authentication</Typography>
              <Typography sx={{ color: isDark ? "#94a3b8" : "#555", fontSize: 13 }}>
                Add an extra layer of protection.
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={twoFA}
                  onChange={() => setTwoFA((s) => !s)}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#7c3aed",
                    },
                  }}
                />
              }
              label=""
            />
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={0} sx={smallCard(isDark)}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box>
              <Typography fontWeight={700}>Login Alert Notification</Typography>
              <Typography sx={{ color: isDark ? "#94a3b8" : "#555", fontSize: 13 }}>
                Get notified on new device access.
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch checked={loginAlert} onChange={() => setLoginAlert((s) => !s)} />
              }
              label=""
            />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  </Paper>
);

/* PASSWORD TAB */
const PasswordTab = ({ inputStyle, isDark }) => (
  <Paper sx={panelStyle(isDark)} elevation={0}>
    <Typography fontWeight={700} sx={{ mb: 1, color: isDark ? "#e6eef8" : "#1f1f1f" }}>
      Password Management
    </Typography>
    <Typography sx={{ mb: 3, color: isDark ? "#94a3b8" : "#555" }}>
      Change your password regularly to secure your account.
    </Typography>

    <Grid container spacing={2} maxWidth={600}>
      <Grid item xs={12}>
        <TextField fullWidth variant="filled" label="Old Password" type="password" sx={inputStyle} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth variant="filled" label="New Password" type="password" sx={inputStyle} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth variant="filled" label="Confirm Password" type="password" sx={inputStyle} />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          sx={{
            background: "linear-gradient(90deg,#7c3aed,#06b6d4)",
            textTransform: "none",
            "&:hover": { boxShadow: "0 5px 20px rgba(124,58,237,0.3)" },
          }}
        >
          Update Password
        </Button>
      </Grid>
    </Grid>
  </Paper>
);

/* ----------------- Styles ----------------- */
const panelStyle = (isDark) => ({
  p: 3,
  borderRadius: 3,
  background: isDark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.03)",
  border: isDark ? "1px solid rgba(255,255,255,0.03)" : "1px solid rgba(0,0,0,0.05)",
  backdropFilter: "blur(10px)",
  transition: "all 0.3s ease",
});

const inputStyle = (isDark) => ({
  ".MuiFilledInput-root": {
    background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.05)",
    borderRadius: 2,
  },
  "& .MuiInputLabel-root": { color: isDark ? "#9ca3af" : "#555" },
  "& .MuiFilledInput-input": { color: isDark ? "#e6eef8" : "#1f1f1f" },
});

const smallCard = (isDark) => ({
  p: 2,
  borderRadius: 2.5,
  background: isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.02)",
  border: isDark ? "1px solid rgba(255,255,255,0.03)" : "1px solid rgba(0,0,0,0.05)",
});

const neonTab = (isDark) => ({
  color: isDark ? "#9ca3af" : "#555",
  textTransform: "none",
  fontWeight: 700,
}); 

const neonTabActive = (isDark) => ({
  color: isDark ? "#e6eef8" : "#1f1f1f",
  textTransform: "none",
  fontWeight: 900,
  bgcolor: "rgba(124,58,237,0.1)",
  borderRadius: 2,
  px: 2,
});
