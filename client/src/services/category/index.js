import {serverRequests} from '../axios-server';

export const Category = {
    getAll: () => serverRequests.get(`/category`),
    delete: id => serverRequests.del(`/category/${id}`),
    get: id => serverRequests.get(`/category/${id}`),
    update: category => serverRequests.put(`/category/${category._id}`, category),
    create: category => serverRequests.post("/category", category)
  };


