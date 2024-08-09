import { beforeAll, afterEach, afterAll, describe, it, expect } from "vitest";
import { server } from "../mocks/server";
import * as ProductService from "../services/ProductService";
import { ProductData } from "../types/Product";

beforeAll(() => {
	server.listen();
});

afterEach(() => {
	server.resetHandlers();
});

afterAll(() => {
	server.close();
});

const newProduct: ProductData = {
	name: "Super-Choco",
	description: "It is super tasty!",
	price: 18,
	images: {
		thumbnail: "#thumbnail_image",
		large: "#large_image",
	},
	stock_status: "instock",
	stock_quantity: 10,
	on_sale: false,
};

describe("ProductService", () => {
	it.only("should return a list", async () => {
		const products = await ProductService.getProducts();

		expect(products.status).toBe("success");
		expect(Array.isArray(products.data)).toBe(true);
	});

	it("should create a product", async () => {
		const product = await ProductService.createProduct(newProduct);

		expect(product.status).toBe("success");
		expect(product.data).toMatchObject({
			id: expect.any(Number),
			...newProduct,
		});
	});

	it("should return the created product", async () => {
		const product = await ProductService.createProduct(newProduct);
		const createProduct = await ProductService.getProduct(product.data.id);

		expect(createProduct.status).toBe("success");
		expect(createProduct.data).toMatchObject({
			...product.data,
		});
	});
});
