import { Box, Button, CircularProgress, Paper, TextField, Typography } from "@mui/material";
import React, { Suspense, lazy, useEffect, useState } from "react";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("admin@salesight.local");
  const [password, setPassword] = useState("Admin@12345");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try { await onLogin(email, password); }
    catch (err) { setError(err.message || "Could not sign in."); }
    finally { setBusy(false); }
  }

  return (
    <Box className="login-page">
      <Paper elevation={0} className="login-card">
        <Typography variant="h5" fontWeight={800} color="primary.main" mb={1}>SaleSight</Typography>
        <Typography variant="h5" fontWeight={750} mb={1}>Welcome back</Typography>
        <Typography color="text.secondary" mb={3}>Sign in to your sales workspace.</Typography>
        <Box component="form" onSubmit={submit} display="grid" gap={2}>
          <TextField label="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} required fullWidth />
          <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required fullWidth />
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          <Button type="submit" variant="contained" size="large" disabled={busy} sx={{ py: 1.35 }}>
            {busy ? <CircularProgress size={22} color="inherit" /> : "Sign in"}
          </Button>
        </Box>
        <Typography variant="caption" color="text.secondary" display="block" mt={3}>
          Demo: admin@salesight.local / Admin@12345
        </Typography>
      </Paper>
    </Box>
  );
}
export default LoginPage;