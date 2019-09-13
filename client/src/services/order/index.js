import { serverRequests } from "../axios-server";

export const Order = {
  getAll: () => serverRequests.get(`/orders`),
  getAllBy: query => serverRequests.get(`/orders?${query}`),
  delete: id => serverRequests.del(`/orders/${id}`),
  get: id => serverRequests.get(`/orders/${id}`),
  update: order => serverRequests.put(`/orders/${order._id}`, order),
  create: order => serverRequests.post("/orders", order),
  search: orderlook => serverRequests.get(`/orders/search/${orderlook}`)
};
