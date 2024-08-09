export type OrderProduct = {
	product_id: number;
	qty: number;
	item_price: number;
	item_total: number;
};

export type CreateOrderData = {
	customer_first_name: string;
	customer_last_name: string;
	customer_address: string;
	customer_postcode: string;
	customer_city: string;
	customer_email: string;
	customer_phone: string;
	order_total: number;
	order_items: OrderProduct[];
};

export type OrderData = {
	customer_first_name: string;
	customer_last_name: string;
	customer_address: string;
	customer_postcode: string;
	customer_city: string;
	customer_email: string;
	customer_phone: string;
	order_total: number;
};

export type Orders = OrderData & {
	id: number;
};

export type Order = CreateOrderData & {
	id: number;
};

export type ListResult = {
	status: string;
	data: Orders[];
};

export type Result = {
	status: string;
	data: Order;
};
