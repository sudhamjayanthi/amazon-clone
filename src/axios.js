import axios from 'axios';

const instance = axios.create({
  baseURL: "https://flaskapi.sudhamjayanthi1.repl.co",
});

export default instance;