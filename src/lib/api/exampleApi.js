import client from './springClient';

export const exAjaxGet = ({ arg1, arg2 }) =>
  client.get('server/controller', { arg1, arg2 });

export const exAjaxPost = ({ arg1, arg2 }) =>
  client.post('server/controller', { arg1, arg2 });
