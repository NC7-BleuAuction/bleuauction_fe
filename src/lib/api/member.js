import {
  accessTokenRefresh,
  sendAxiosRequest,
  sendAxiosMultipartRequest
} from '../common';
import axios, { formToJSON } from 'axios';
import jwtDecode from 'jwt-decode';

export const memberData = ({ accessToken, loginUser, setMember, setCurrentImage }) => {

  sendAxiosRequest(
    `/api/member/${jwtDecode(accessToken).sub}`,
    'GET',
    null,
    (response) => {
      console.log('응답 성공', response.data);
      setMember(response.data);
      setCurrentImage(
        'http://kr.object.ncloudstorage.com/bleuauction-bucket/' +
          loginUser.memberAttaches[0].filePath +
          loginUser.memberAttaches[0].saveFilename
      );
    },
    (error) => {
      console.log('응답 실패', error);
    },
    null,
    accessToken
  );
};

export const memberUpdate = ({ accessToken, formData}) => {

    sendAxiosMultipartRequest(
      '/api/member/update',
      formData,
      (response) => {
        console.log('수정한 정보', formToJSON(formData));
        console.log('서버 응답:', response.data);

        // console.log(formToJSON(updateStoreRequest));
        // 성공적으로 업데이트된 경우에 수행할 작업을 추가하세요
      },
      (error) => {
        console.error('가게 업데이트 중에 오류가 발생했습니다', error);
        // 오류 발생 시 처리를 추가하세요
      },
      accessToken
    );
};

