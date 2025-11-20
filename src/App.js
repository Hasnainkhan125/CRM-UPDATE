import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { NotificationProvider } from "./context/NotificationContext";
import ProtectedRoute from "./ProtectedRoute";

// 🔹 Admin Imports
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import EditInvoice from "./scenes/invoices/EditInvoice";
import AddInvoice from "./scenes/invoices/addinvoice";
import ViewInvoice from "./scenes/invoices/ViewInvoice";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";
import Profile from "./scenes/profile/profile";
import Setting from "./scenes/profile/setting";
import AdminSecurity from "./scenes/adminSecurity/adminSecurity";
import Form from "./scenes/form/form";
import AIDashboard from "./scenes/aiDashboard/aidashboard";
import DynamicTable from "./components/dynamic-table";

// 🔹 User Dashboard Imports
import UserDashboardLayout from "./scenes/userDashboard/UserDashboardLayout";
import UserDashboardHome from "./scenes/userDashboard/UserDashboardHome";
import UserProfile from "./scenes/userDashboard/Userprofile";
import CheckoutForm from "./scenes/userDashboard/CheckoutForm";
import ShopPage from "./scenes/userDashboard/ShopPage";
import ProductDetails from "./scenes/userDashboard/ProductDetails";

// 🔹 Auth & Homepage
import Login from "./scenes/login/Login";
import ForgotPassword from "./scenes/login/ForgotPassword";
import Register from "./scenes/register/Register";
import HomePage from "./scenes/Homepage/HomePage";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode") || "dark";
    document.body.dataset.theme = savedMode;
  }, [theme]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotificationProvider>
          <Routes>

            {/* 🌍 PUBLIC ROUTES */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* 🛍 USER DASHBOARD */}
            <Route
              path="/user-dashboard/*"
              element={
                <ProtectedRoute roles={["user", "admin"]}>
                  <UserDashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<UserDashboardHome />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="checkout" element={<CheckoutForm />} />
              <Route path="shop" element={<ShopPage />} />
              <Route path="product/:id" element={<ProductDetails />} />
            </Route>

            {/* 🧑‍💼 ADMIN DASHBOARD */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <div className="app">
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                      <Topbar setIsSidebar={setIsSidebar} user={currentUser} />
                      <Outlet />
                    </main>
                  </div>
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="team" element={<Team />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="invoices/add" element={<AddInvoice />} />
              <Route path="invoices/view/:id" element={<ViewInvoice />} />
              <Route path="invoices/edit/:id" element={<EditInvoice />} />
              <Route path="form" element={<Form />} />
              <Route path="bar" element={<Bar />} />
              <Route path="pie" element={<Pie />} />
              <Route path="line" element={<Line />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="geography" element={<Geography />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Setting />} />
              <Route path="admin-security" element={<AdminSecurity />} />
              <Route path="ai-dashboard" element={<AIDashboard />} />
              <Route path="dynamictable" element={<DynamicTable />} />
              <Route path="*" element={<Navigate to="/admin/dashboard" />} />
            </Route>

            {/* ✅ Shortcut route for /admin-dashboard URL */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <div className="app">
                    <Sidebar isSidebar={isSidebar} />
                    <main className="content">
                      <Topbar setIsSidebar={setIsSidebar} user={currentUser} />
                      <Dashboard />
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </NotificationProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
