import { AppBar, Avatar, Box, CircularProgress, Divider, Drawer, IconButton, InputAdornment, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, TextField, Toolbar, Typography, useMediaQuery } from "@mui/material";
import React, { Suspense, lazy, useEffect, useState } from "react";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTheme } from "@mui/material/styles";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
const DashboardRemote = lazy(() => import("dashboard/Dashboard"));
const WorkspaceRemote = lazy(() => import("workspace/Workspace"));

function HomeScreen({ user, onLogout }) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const active = location.pathname.startsWith("/workspace") ? "workspace" : "dashboard";

  const [profileAnchor, setProfileAnchor] = useState(null);

  const handleProfileClick = (event) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

  const handleProfileLogout = () => {
    handleProfileClose();
    onLogout();
  };

  const nav = (
    <Box className="sidebar-inner">
      <Typography className="brand"><span>Sale</span>Sight</Typography>
      <Typography className="sidebar-label">WORKSPACE</Typography>
      <List disablePadding>
        <ListItemButton selected={active === "dashboard"} onClick={() => { navigate("/dashboard"); setMobileOpen(false); }} className="nav-item">
          <ListItemIcon><DashboardRoundedIcon /></ListItemIcon><ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton selected={active === "workspace"} onClick={() => { navigate("/workspace"); setMobileOpen(false); }} className="nav-item">
          <ListItemIcon><WidgetsOutlinedIcon /></ListItemIcon><ListItemText primary="Workspace" />
        </ListItemButton>
      </List>
      {/* <Box className="sidebar-bottom">
        <Divider sx={{ mb: 2 }} />
        <Box display="flex" alignItems="center" gap={1.2} px={1}>
          <IconButton
            onClick={handleProfileClick}
            aria-label="Open profile menu"
            aria-controls={profileAnchor ? "profile-menu" : undefined}
            aria-haspopup="true"
            sx={{ p: 0.25 }}
          >
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: "primary.main",
                fontSize: 14
              }}
            >
              {(user?.name || "A").slice(0, 1).toUpperCase()}
            </Avatar>
          </IconButton>

          <Menu
            id="profile-menu"
            anchorEl={profileAnchor}
            open={Boolean(profileAnchor)}
            onClose={handleProfileClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
          >
            <Box sx={{ px: 2, py: 1, minWidth: 190 }}>
              <Typography fontWeight={700} fontSize={14}>
                {user?.name || "Admin"}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                {user?.email || ""}
              </Typography>
            </Box>

            <Divider />

            <MenuItem onClick={handleProfileLogout} sx={{ color: "error.main", gap: 1 }}>
              <LogoutRoundedIcon fontSize="small" />
              Logout
            </MenuItem>
          </Menu>
          <Box flex={1} minWidth={0}>
            <Typography fontSize={12} fontWeight={700} noWrap>{user?.name || "Admin"}</Typography>
            <Typography fontSize={11} color="text.secondary">Administrator</Typography>
          </Box>
          <IconButton size="small" onClick={onLogout} title="Sign out"><LogoutRoundedIcon fontSize="small" /></IconButton>
        </Box>
      </Box> */}
    </Box>
  );

  return (
    <Box className="app-layout">
      {!mobile && <Box className="sidebar">{nav}</Box>}
      {mobile && <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)}>{nav}</Drawer>}
      <Box className="main-area">
        <AppBar position="sticky" elevation={0} color="inherit" className="topbar">
          <Toolbar className="topbar-toolbar">
            {mobile && <IconButton onClick={() => setMobileOpen(true)}><WidgetsOutlinedIcon /></IconButton>}
            <Typography variant="h6" fontWeight={750} sx={{ flex: 1 }}>{active === "dashboard" ? "Dashboard" : "Workspace"}</Typography>
            <TextField className="search-field" size="small" placeholder="Search" variant="standard"
              InputProps={{ disableUnderline: true, startAdornment: <InputAdornment position="start"><SearchRoundedIcon fontSize="small" /></InputAdornment> }} />
            <IconButton aria-label="notifications"><NotificationsNoneRoundedIcon /></IconButton>
            <IconButton aria-label="messages"><MailOutlineRoundedIcon /></IconButton>
            <IconButton
              onClick={handleProfileClick}
              aria-label="Open profile menu"
              aria-controls={profileAnchor ? "profile-menu" : undefined}
              aria-haspopup="true"
              sx={{ p: 0.25 }}
            >
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  bgcolor: "primary.main",
                  fontSize: 14
                }}
              >
                {(user?.name || "A").slice(0, 1).toUpperCase()}
              </Avatar>
            </IconButton>

            <Menu
              id="profile-menu"
              anchorEl={profileAnchor}
              open={Boolean(profileAnchor)}
              onClose={handleProfileClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
            >
              <Box sx={{ px: 2, py: 1, minWidth: 190 }}>
                <Typography fontWeight={700} fontSize={14}>
                  {user?.name || "Admin"}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {user?.email || ""}
                </Typography>
              </Box>

              <Divider />

              <MenuItem onClick={handleProfileLogout} sx={{ color: "error.main", gap: 1 }}>
                <LogoutRoundedIcon fontSize="small" />
                Logout
              </MenuItem>
            </Menu>

          </Toolbar>
        </AppBar>
        <Box component="main" className="page-content">
          <Suspense fallback={<Box display="flex" justifyContent="center" py={10}><CircularProgress /></Box>}>
            <Routes>
              <Route path="/dashboard" element={<DashboardRemote />} />
              <Route path="/workspace" element={<WorkspaceRemote />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
}
 export default HomeScreen;