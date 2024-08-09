import { rest } from "msw";
import { Product, ProductData } from "../types/Product";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const dummyProducts: Product[] = [
	{
		id: 1,
		name: "Super-Choco",
		description: "It's super tasty!",
		price: 10,
		images: {
			thumbnail: "#thumbnail_image",
			large: "#large_image",
		},
		stock_status: "instock",
		stock_quantity: 15,
		on_sale: false,
	},
	{
		id: 2,
		name: "Super-Cola",
		description: "It's super-duper tasty!",
		price: 7,
		images: {
			thumbnail: "#thumbnail_image",
			large: "#large_image",
		},
		stock_status: "instock",
		stock_quantity: 9,
		on_sale: false,
	},
];

export const handlers = [
	// Mock get all products
	// GET http://localhost:3000/products
	rest.get(BASE_URL + "/products", (_req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				status: "success",
				data: dummyProducts,
			})
		);
	}),

	// Mock get a single product
	// GET http://localhost:3000/products/:productId
	rest.get(BASE_URL + "/products/:productId", (req, res, ctx) => {
		const productId = Number(req.params.productId);
		const product = dummyProducts.find(
			(product) => product.id === productId
		);

		if (!product) {
			return res(ctx.status(404));
		}

		return res(ctx.status(200), ctx.json(product));
	}),

	// Mock create a product
	// POST http://localhost:3000/products
	rest.post(BASE_URL + "/products", async (req, res, ctx) => {
		const payload = await req.json<ProductData>();
		const id =
			Math.max(0, ...dummyProducts.map((product) => product.id)) + 1;
		const product: Product = {
			id: id,
			name: payload.name,
			description: payload.description,
			price: payload.price,
			images: payload.images,
			stock_status: payload.stock_status,
			stock_quantity: payload.stock_quantity,
			on_sale: payload.on_sale,
		};

		dummyProducts.push(product);

		return res(ctx.status(201), ctx.json(product));
	}),
];
