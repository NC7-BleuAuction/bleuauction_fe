import {
  accessTokenRefresh,
  redirectLogin,
  isNullUndefinedOrEmpty,
  sendAxiosRequest,
} from '../common';

export const list = ({ pageRowCount, setStores }) => {
  sendAxiosRequest(
    `/api/store/list?pageLowCount=${pageRowCount}`,
    'GET',
    null,
    (response) => {
      console.log('/api/store/list => response.data: ' + response.data);
      if (isNullUndefinedOrEmpty(response.data)) {
        setStores(response.data);
      }
    },
    (error) => console.log(error),
    null,
    'UA'
  );
};
