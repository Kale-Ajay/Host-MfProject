import React, { Suspense, lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { loginRequest } from "./api.js";
import "./styles.css";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery
} from "@mui/material";
import LoginPage from "./components/login/LoginPage.jsx";
import HomeScreen from "./HomeScreen.jsx";

const drawerWidth = 216;




export default function App() {
  const [session, setSession] = useState(() => {
    try { return JSON.parse(localStorage.getItem("salesight_session") || "null"); } catch { return null; }
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!session?.token) return;
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/auth/me`, {
      headers: { Authorization: `Bearer ${session.token}` }
    }).then(r => { if (!r.ok) throw new Error("Session expired"); return r.json(); })
      .then(data => setSession(current => current ? { ...current, user: data.user } : current))
      .catch(() => { localStorage.removeItem("salesight_session"); setSession(null); });
    // Validate a restored session once when the app starts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogin(email, password) {
    const data = await loginRequest(email, password);
    const next = { token: data.token, user: data.user };
    localStorage.setItem("salesight_session", JSON.stringify(next));
    setSession(next);
    navigate("/dashboard");
  }
  function handleLogout() {
    localStorage.removeItem("salesight_session");
    setSession(null);
    navigate("/login");
  }

  return (
    <Routes>
      <Route path="/login" element={session?.token ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />} />
      <Route path="/*" element={session?.token ? <HomeScreen user={session.user} onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}
