import axios from 'axios';

const cookies = document.cookie.split(';');

const springClient = axios.create();
springClient.defaults.baseURL = '/api/';
springClient.defaults.timeout = 5000;
springClient.defaults.withCredentials = true;

export default springClient;
