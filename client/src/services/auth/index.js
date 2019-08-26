import {serverRequests} from '../axios-server';

export const Auth = {
    login: user => serverRequests.post("/login", user),
    loginGoogle: user => serverRequests.post("/login/google", user),
    register: user => serverRequests.post("/users", user)
  };
  