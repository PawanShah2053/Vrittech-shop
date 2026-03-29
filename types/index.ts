export type Rating = {
  rate: number;
  count: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

export type SortOrder = 'asc' | 'desc';

export type ProductFilters = {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  page: number;
  sort: SortOrder;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
