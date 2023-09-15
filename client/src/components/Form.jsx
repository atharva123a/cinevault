import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';

const Form = (props) => {
  const [message, setMessage] = useState();
  const [buttonMessage, setButtonMessage] = useState('');
  const [ref, setRef] = useState('');

  const handleInput = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    props.handleSubmit({
      email: data.get('email'),
      password: data.get('password')
    });
  };

  const setPageMessage = () => {
    if (props.buttonType === 'login') {
      setMessage(`Don't have an account? Sign Up`);
      setButtonMessage(`Sign In`);
      setRef('/register');
      return;
    }

    setMessage(`Already have an account? Login`);
    setButtonMessage('Sign Up');
    setRef('/login');
  };

  //   calls the function when it gets mounted
  useEffect(() => {
    setPageMessage();
  }, []);

  return (
    <Box component="form" onSubmit={handleInput} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {buttonMessage}
      </Button>
      <Grid container>
        <Grid item>
          <Link href={ref} variant="body2">
            {message}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;
