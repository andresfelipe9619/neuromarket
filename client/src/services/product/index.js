import { serverRequests } from '../axios-server';

// export const getProducts = (limit = 6) => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve({
//         products: products.slice(0, limit),
//         productsTotal: products.length
//       });
//     }, 700);
//   });
// };


export const Product = {
    getAll: () => serverRequests.get(`/products`),
    delete: id => serverRequests.del(`/products/${id}`),
    get: id => serverRequests.get(`/products/${id}`),
    update: product => serverRequests.put(`/products/${product._id}`, product),
    create: product => serverRequests.post("/products", product),
    search: productlook => serverRequests.get(`/products/search/${productlook}`)
};