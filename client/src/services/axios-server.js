import axios from "axios";
const API_ROOT = "http://localhost:4000";

const server = axios.create({
  baseURL: API_ROOT
});

let token = null;

const tokenInterceptor = config => {
  if (token) {
    config.headers["token"] = token;
  }
  return config;
};

const responseBody = response => response.data;

server.interceptors.request.use(tokenInterceptor, Promise.reject)

const serverRequests = {
  del: url => server.delete(`${url}`).then(responseBody),
  get: url => server.get(`${url}`).then(responseBody),
  put: (url, body) => server.put(`${url}`, body).then(responseBody),
  post: (url, body) => server.post(`${url}`, body).then(responseBody)
};

const setToken = _token => {
  token = _token;
};

export { serverRequests, setToken };
