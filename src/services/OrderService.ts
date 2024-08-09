import axios from "axios";
import { Result, ListResult, CreateOrderData } from "../types/Order";

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
 * Get all orders
 */
export const getOrders = () => {
	return get<ListResult>("/orders");
};

/**
 * Get a single order
 */
export const getOrder = (id: number) => {
	return get<Result>("/orders/" + id);
};

/**
 * Create a new order
 */
export const createOrder = (order: CreateOrderData) => {
	return post<Result>("/orders", order);
};
