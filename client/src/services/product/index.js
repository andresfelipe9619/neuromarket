import { serverRequests } from "../axios-server";

export const Product = {
  getAll: () => serverRequests.get(`/products`),
  getAllBy: query => serverRequests.get(`/products?${query}`),
  delete: id => serverRequests.del(`/products/${id}`),
  get: id => serverRequests.get(`/products/${id}`),
  update: product => serverRequests.put(`/products/${product._id}`, product),
  create: product => serverRequests.post("/products", product),
  search: productlook => serverRequests.get(`/products/search/${productlook}`)
};
