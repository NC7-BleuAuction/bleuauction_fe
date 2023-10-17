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
import { useState, useContext } from 'react';
import { useUser} from './UserContext';


const defaultTheme = createTheme();

 function LoginPage() {
  const navigate = useNavigate();


    const { user, login, logout } = useUser();
  
    const handleLogin = () => {
      // 사용자 로그인 로직
      login({ username: 'exampleuser' });
    };
  
    // const handleLogout = () => {
    //   // 사용자 로그아웃 로직
    //   logout();
    // };


  const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);  // values는 폼 컨트롤의 상태를 나타냄, initialValues로 초기 설정
    const handleChange = (e) => {   //폼 컨트롤의 onChange 이벤트 핸들러
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    };
    return [values, handleChange];
  };

  const [values, handleChange] = useForm({ //useForm은 초기 값 initialValues를 인수로 받음,  그 상태와 상태를 변경하는 함수를 반환하는 useForm 훅을 호출
    email: '',
    password: '',
  });

  const requestData = { //객체는 폼에서 사용자가 입력한 데이터를 서버로 전송하기 위해 준비되는 데이터 구조
    memberEmail: values.email,      //values 객체의 email 속성 값을 requestData 객체의 email 속성에 할당
    memberPwd: values.password,
  };


 


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/member/login', requestData);       // 백엔드로 데이터 보내기
      console.log('API 응답: ', response.data);                                   // 백엔드에서 반환된 데이터 처리하기
      login(requestData);
      console.log(requestData);
      navigate('/');                      
    } catch (error) {
      console.error('API 호출 중 에러 발생: ', error.response.data);
      alert('로그인에 실패ㅡㅡ');
    }
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
            <Box component="form"  sx={{ mt: 1 }} noValidate onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={values.email}
                onChange={handleChange}
                autoComplete="email"
                autoFocus
                InputProps={{ style: { borderRadius: '30px' } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={values.password}
                onChange={handleChange}
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
