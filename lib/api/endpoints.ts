export const API_BASE_URL = 'https://fakestoreapi.com';

export const API_ENDPOINTS = {
  products: '/products',
  productById: (id: number | string) => `/products/${id}`,
  categories: '/products/categories',
  login: '/auth/login'
};
