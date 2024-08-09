export type ProductData = {
	name: string;
	description: string;
	price: number;
	images: object;
	stock_status: string;
	stock_quantity: number;
	on_sale: boolean;
};

export type Product = ProductData & {
	id: number;
};

export type ListResult = {
	status: string;
	data: Product[];
};

export type Result = {
	status: string;
	data: Product;
};
