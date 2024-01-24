import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import { getCsrfToken } from './helpers/csrfUtils';
import axios from 'axios';
import { useAuth, getters } from './helpers/AuthProvider';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';


// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const {appState, setAppState} = useAuth();
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:3000/";
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
                // commit("resetUserInfo");
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
    // const data = new FormData(event.currentTarget);
    // const token = getCsrfToken();
    logoutUser();
  }


  return (
    <AppBar position="sticky">
      <Container className='page-black navbar' maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              // fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              // fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
      
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
          </Box>
                {getters.isLoggedIn(appState) 
                ? <h3 className='page-black m-3'>Welcome to Groomers Reviewers {appState.user.email}</h3>
                : <h3 className='page-black m-3'>Welcome to Groomers Reviewers</h3>}
        </Toolbar>
        {getters.isLoggedIn(appState) && <>
        <Button
          onClick={(event) => handleLogOut(event)}
          variant='contained'
        >
            Log Out
        </Button>
        <Link 
          role="button"  
          to={"/session"} 
          className="btn custom-button page-black">
        See Reviews
        </Link>
        <Link 
          role="button"  
          to={"/review"} 
          className="btn custom-button page-black">
        Make a Review
        </Link>
        </>
        }
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;