import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useNavigate } from 'react-router-dom';
import { getCsrfToken } from '../helpers/csrfUtils';
import axios from 'axios';
import { LoginState, useAuth } from '../helpers/AuthProvider';
import { BASE_URL } from '../helpers/BaseURL';

export default function SignIn() {
  const {appState, setAppState} = useAuth();
  const navigate = useNavigate();
  
  function loginUser(payload: LoginState) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${BASE_URL}users/sign_in`, payload)
            .then((response) => {
                console.log(response);
                setAppState({
                  auth_token: response.headers.authorization,
                  user: response.data.user,
                })
                axios.defaults.headers.common["Authorization"] = response.headers.authorization;
                localStorage.setItem("auth_token", response.headers.authorization);
                localStorage.setItem("user_info", JSON.stringify(response.data.user))
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            }).then(() => navigate('/'))
    })
}

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const token = getCsrfToken();
    
    const payload: LoginState = {
      user: {
        email: data.get('log_in_email')?.toString(),
        password: data.get('log_in_password')?.toString(),
      }
    }

    loginUser(payload);
    
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="log_in_email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="log_in_password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}