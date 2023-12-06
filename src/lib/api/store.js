import {
  accessTokenRefresh,
  redirectLogin,
  isNullUndefinedOrEmpty,
  sendAxiosRequest,
} from '../common';
import springClient from '../springClient';

export const list = async ({
  pageRowCount = 3,
  jwtToken = null,
  startPageNo = 0,
}) =>
  await springClient.get(
    `/store/list?pageLowCount=${pageRowCount}&startPage=${startPageNo}`,
    {
      headers: {
        Authorization: jwtToken !== 'UA' ? `Bearer ${jwtToken}` : 'UA',
      },
    }
  );
