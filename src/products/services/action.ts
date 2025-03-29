import { productsApi } from "../api/productsApi";
import { Product } from "../interfaces/product";

interface GetProductsOptions {
  filterkey?: string;
}

const sleep = (seconds: number = 2):Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  })
}

export const getProducts = async ({ filterkey }: GetProductsOptions):Promise<Product[]> => {

  sleep();

  const filterUrl = ( filterkey ) ? `category=${filterkey}` : '';

  const { data } = await productsApi.get<Product[]>(`/products?${ filterUrl }`);
  return data;
};

export const getProductById = async (id: number):Promise<Product> => {

  // sleep();
  // const filterUrl = ( filterkey ) ? `category=${filterkey}` : '';
  const { data } = await productsApi.get<Product>(`/products/${ id }`);
  return data;
};
