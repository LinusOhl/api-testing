import { describe, it, expect } from "vitest";
import * as OrderService from "../services/OrderService";
import { CreateOrderData } from "../types/Order";

const newOrder: CreateOrderData = {
	customer_first_name: "Kalle",
	customer_last_name: "Anka",
	customer_address: "Anke 16",
	customer_city: "Ankeborg",
	customer_postcode: "12345",
	customer_email: "kalle@anka.se",
	customer_phone: "040556677",
	order_total: 9,
	order_items: [
		{
			product_id: 1,
			qty: 3,
			item_price: 3,
			item_total: 9,
		},
	],
};

describe("Order Service", () => {
	it("should return a list", async () => {
		const orders = await OrderService.getOrders();

		expect(orders.status).toBe("success");
		expect(Array.isArray(orders.data)).toBe(true);
	});

	it("should create a new order", async () => {
		const order = await OrderService.createOrder(newOrder);

		expect(order.status).toBe("success");
		expect(order.data).toMatchObject({
			id: expect.any(Number),
			customer_first_name: newOrder.customer_first_name,
			customer_last_name: newOrder.customer_last_name,
			customer_address: newOrder.customer_address,
			customer_city: newOrder.customer_city,
			customer_postcode: newOrder.customer_postcode,
			customer_email: newOrder.customer_email,
			customer_phone: newOrder.customer_phone,
			order_total: newOrder.order_total,
			OrderItems: expect.any(Array),
		});
	});

	it("should get the created order", async () => {
		const createdOrder = await OrderService.createOrder(newOrder);
		const order = await OrderService.getOrder(createdOrder.data.id);

		expect(order.status).toBe("success");
		expect(order.data).toStrictEqual(createdOrder.data);
	});
});
