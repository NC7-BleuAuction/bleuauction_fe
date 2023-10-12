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
import axios from 'axios';
import { useState } from 'react';



// function Test() {
//   const [test, setTest] = useState({response: '', loading: true});

//   useEffect(() => {
//     axios.get('/api/test')
//       .then(response => setTest(response.data))
//       .catch(error => console.log(error));
//   }, []);


const defaultTheme = createTheme();

// export default function LoginPage() {
    
// const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),

//     });
//     navigate('/main');
//   };

export default function LoginPage() {
  const navigate = useNavigate();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
    
  //   const loginData = {
  //     memberEmail: data.get('email'),
  //     memberPwd: data.get('password'),
  //   };

  //   console.log(loginData);

  //   try {
  //     const response = await axios.post('/api/member/login', loginData); // /api/login은 백엔드 로그인 API의 엔드포인트입니다. 실제 경로를 사용해야 합니다.
      
  //     if (response.data.success) { // 응답에 따라 조건을 변경할 수 있습니다.
  //       console.log("로그인 성공!");
  //       navigate('/main');
  //     } else {
  //       console.error("로그인 실패:", response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("서버에서 에러가 발생했습니다:", error.response.data);
  //   }
  // };




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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                InputProps={{ style: { borderRadius: '30px' } }}
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