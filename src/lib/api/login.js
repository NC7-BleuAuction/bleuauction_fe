import {
  accessTokenRefresh,
  sendAxiosRequest,
  sendAxiosMultipartRequest,
  isTokenExpired
} from '../common';
import { useNavigate } from 'react-router-dom';
import axios, { formToJSON } from 'axios';
import jwtDecode from 'jwt-decode';


// 로그인 요청
export const login = ({loginRequest, navigate, setLoginUser}) => {

  sendAxiosRequest(
    '/api/member/login',
    'POST',
    loginRequest,
    (response) => {
      const repDataList = response.data;
      console.log('repDataList', repDataList);

      if (repDataList) {
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        const user = response.data.loginUser;
        if (!isTokenExpired(accessToken) && !isTokenExpired(refreshToken)) {
          sessionStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          const decodedAccessToken = jwtDecode(accessToken);
          setLoginUser(user);
          console.log("유저: " + user.memberName);
          alert(
            "'" +
              decodedAccessToken.memberName +
              "' 회원님 BLEU AUCTION에 오신 것을 환영합니다!"
          );
          navigate('/');
        }
      }
    },
    (error) => console.log(error),
    'application/json'
  );
}


