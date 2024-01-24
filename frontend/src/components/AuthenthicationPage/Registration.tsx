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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getCsrfToken } from '../helpers/csrfUtils';
import axios from 'axios';
import { SignUpState, AuthProvider, useAuth } from '../helpers/AuthProvider';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Groomers Reviewers
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {

  const {appState, setAppState} = useAuth();

  const navigate = useNavigate();
  const BASE_URL = "http://localhost:3000/";

  function registerUser(payload:SignUpState) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${BASE_URL}users`, payload)
            .then((response) => {
                // commit("setUserInfo", response);
                setAppState({
                  auth_token: response.headers.authorization,
                  user: response.data.user,
                })
                axios.defaults.headers.common["Authorization"] = response.headers.authorization;
                localStorage.setItem("auth_token", response.headers.authorization);
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
    const payload: SignUpState = {
      user: {
        email: data.get('sign_up_email')?.toString(),
        password: data.get('sign_up_password')?.toString(),
      }
    }

    registerUser(payload);
  }
//     fetch(url, {
//       method: "POST",
//       headers: {
//         "X-CSRF-Token": token!,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         user: {
//           first_name: data.get('firstName'),
//           last_name: data.get('lastName'),
//           username: data.get('username'),
//           password: data.get('password'),
//           password_confirmation: data.get('password'),
//           email: data.get('email')
//         }
//       }),
//     }).then((response) => {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error("Network response was not ok.");
//     })
//     .then((response) => navigate(`/session`))
//     .catch((error) => console.log(error.message));
// };


  return (
    <ThemeProvider theme={defaultTheme}>
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="sign_up_email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="sign_up_username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="sign_up_password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}