import * as React from 'react';
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
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Register() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem('accessToken') != null) {
      navigate('/', { replace: true });
    }
  }, []);

  const handleSignUp = async ({ email, password }) => {
    const { success, message, data } = await userService.default.registerUser({
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

    toast.success(`${message} Redirecting to login page!`, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored'
    });

    // 👇 Redirects to about page, note the `replace: true`
    navigate('/login', { replace: true });
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
            Sign Up
          </Typography>
          <Form handleSubmit={handleSignUp} buttonType={`signup`} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
