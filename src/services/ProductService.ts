import axios from "axios";
import { Result, ListResult, ProductData } from "../types/Product";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Generic get request
 */
export const get = async <T>(endpoint: string) => {
	const res = await axios.get<T>(BASE_URL + endpoint);
	return res.data;
};

/**
 * Generic post request
 */
export const post = async <T>(endpoint: string, data: any) => {
	const res = await axios.post<T>(BASE_URL + endpoint, data);
	return res.data;
};

/**
 * Get all products
 */
export const getProducts = () => {
	return get<ListResult>("/products");
};

/**
 * Get a single product
 */
export const getProduct = (id: number) => {
	return get<Result>("/products/" + id);
};

/**
 * Create a new product
 */
export const createProduct = (product: ProductData) => {
	return post<Result>("/products", product);
};
