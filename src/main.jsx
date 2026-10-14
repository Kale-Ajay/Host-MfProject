import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App.jsx";

const theme = createTheme({
  palette: {
    primary: { main: "#319b82", dark: "#267b68", light: "#e8f5f1" },
    background: { default: "#f6f8f7", paper: "#ffffff" },
    text: { primary: "#202625", secondary: "#7d8582" }
  },
  shape: { borderRadius: 12 },
  typography: { fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif', button: { textTransform: "none", fontWeight: 600 } }
});

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter><App /></BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
