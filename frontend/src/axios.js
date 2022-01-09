import axios from 'axios';

const instance = axios.create({
  baseURL: "https://amzn.deta.dev/", // stripe wrapper flask api 
});

export default instance;