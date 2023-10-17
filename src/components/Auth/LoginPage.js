import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { sendAxiosRequest } from '../utility/common';
import { formToJSON } from 'axios';
import { useState, useContext } from 'react';
import { useUser} from './UserContext';


const defaultTheme = createTheme();

function LoginPage() {

  const navigate = useNavigate();

    const { user, login, logout } = useUser();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(formToJSON(data));
    console.log({
      memberEmail: data.get('memberEmail'),
      memberPwd: data.get('memberPwd'),
    });

    sendAxiosRequest("/api/member/login", 'POST', formToJSON(data), response => {
      console.log(response.data);
      console.log(formToJSON(data));
      login(formToJSON(data));
      localStorage.setItem('memberEmail', data.get('memberEmail'));
      localStorage.setItem('memberPwd', data.get('memberPwd'));
    }, error => {
      console.log(error);
    });
    navigate('/');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/images/login.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 27,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >

            <Typography component="h1" variant="h5">
              안녕!
            </Typography>
            <Box component="form" sx={{ mt: 1 }} noValidate onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="memberEmail"

                autoComplete="email"
                autoFocus
                InputProps={{ style: { borderRadius: '30px' } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="memberPwd"

                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputProps={{ style: { borderRadius: '30px' } }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: '30px' }} // borderRadius 추가
              >
                Login
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  borderRadius: '30px',
                  backgroundColor: '#FFEB00',  // 카카오 노란색
                  '&:hover': {
                    backgroundColor: '#FFD600', // 노란색의 어두운 톤으로 hover 효과 추가
                  }
                }}
              >
                KAKAO Login
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"회원가입"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginPage;
