import { React, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Form from '../components/Form';
import { userService } from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { redirect, useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

const Login = () => {
  useEffect(() => {
    if (localStorage.getItem('accessToken') != null) {
      navigate('/', { replace: true });
    }
  }, []);

  const navigate = useNavigate();

  const setTokens = (data) => {
    let accessToken = {
      token: data.accessToken.accessTokenJWT,
      expiresIn: data.accessToken.expiresIn + new Date().getTime()
    };
    let refreshToken = {
      token: data.refreshToken.refreshTokenJWT,
      expiresIn: data.refreshToken.expiresIn + new Date().getTime()
    };
    localStorage.setItem('accessToken', accessToken.token);
    localStorage.setItem('refreshToken', refreshToken.token);
    localStorage.setItem('accessExpiry', accessToken.expiresIn);
    localStorage.setItem('refreshExpiry', refreshToken.expiresIn);
  };

  const handleSignIn = async ({ email, password }) => {
    const { success, message, data } = await userService.default.loginUser({
      email,
      password
    });

    if (success == false) {
      toast.error(`${message}`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
      return;
    }

    toast.success(`${message}`, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored'
    });
    navigate('/', { redirect: true });
    setTokens(data);

    navigate('/', { replace: true });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Form handleSubmit={handleSignIn} buttonType={`login`} />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
