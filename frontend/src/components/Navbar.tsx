import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useAuth, getters } from './helpers/AuthProvider';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './helpers/BaseURL';
import PetsIcon from '@mui/icons-material/Pets'

function ResponsiveAppBar() {
  const {appState, setAppState} = useAuth();
  const navigate = useNavigate();

  function logoutUser() {
    const config = {
        headers: {
            authorization: appState?.auth_token,
        },
    };
    new Promise<void>((resolve, reject) => {
        axios
            .delete(`${BASE_URL}users/sign_out`, config)
            .then(() => {
                setAppState({
                  auth_token: null,
                  user: {
                    id: null,
                    username: null,
                    email: null,
                  }
                });
                localStorage.removeItem("auth_token");
                localStorage.removeItem("user_info");
                axios.defaults.headers.common["Authorization"] = null;
                resolve();
            })
            .catch((error) => {
                reject(error);
            }).then(() => navigate('/'))

    })
}

  const handleLogOut = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    logoutUser();
  }


  return (
    <AppBar position='fixed'>
      <Container sx={{backgroundColor: '#FEE569'}} maxWidth="xl">
        <Toolbar disableGutters>
          <PetsIcon sx={{margin: 3}}></PetsIcon>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            The Trusted Pet Groomer Reviewer
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

          </Box>
                {getters.isLoggedIn(appState) && <Typography variant='h5' sx={{fontFamily: 'poppins'}}>Welcome to Groomers Reviewers {appState.user.email}</Typography>}
        </Toolbar>
        {getters.isLoggedIn(appState) && <Box sx={{display: 'flex', justifyContent: 'space-between', margin: 1}}>
        <Box>
          <Button onClick={() => navigate('/session')}>
            Browse Reviews
          </Button>
          <Button onClick={() => navigate('/review')}>
            Make a Review
          </Button>
        </Box>
        <Button
          onClick={(event) => handleLogOut(event)}
          variant='contained'
        >
          Log Out
        </Button>
        </Box>
        }
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;