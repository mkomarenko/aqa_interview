interface Order {
  userId: number;
  items: Array<{
    productId: number;
    quantity: number;
  }>;
  currency: "USD" | "EUR";
  discount?: number;
  shippingAddress: string;
  isPriority: boolean;
}

class OrderBuilder {
  private order: Partial<Order> = {
    items: [],
    currency: "USD",
    discount: 0,
    isPriority: false,
  };

  withUser(userId: number): this {
    this.order.userId = userId;
    return this;
  }

  addItem(productId: number, quantity: number): this {
    if (!this.order.items) {
      this.order.items = [];
    }

    this.order.items.push({ productId, quantity });
    return this;
  }

  withCurrency(currency: "USD" | "EUR"): this {
    this.order.currency = currency;
    return this;
  }

  withDiscount(discount: number): this {
    this.order.discount = discount;
    return this;
  }

  withShippingAddress(address: string): this {
    this.order.shippingAddress = address;
    return this;
  }

  asPriority(): this {
    this.order.isPriority = true;
    return this;
  }

  build(): Order {
    // 🔥 validation (centralized!)
    if (!this.order.userId) {
      throw new Error("userId is required");
    }

    if (!this.order.items || this.order.items.length === 0) {
      throw new Error("Order must contain at least one item");
    }

    if (!this.order.shippingAddress) {
      throw new Error("shippingAddress is required");
    }

    return {
      userId: this.order.userId,
      items: this.order.items,
      currency: this.order.currency!,
      discount: this.order.discount!,
      shippingAddress: this.order.shippingAddress,
      isPriority: this.order.isPriority!,
    };
  }

  // 🔥 preset (дуже важливо)
  static priorityOrder(): OrderBuilder {
    return new OrderBuilder().asPriority();
  }
}

const order = OrderBuilder.priorityOrder()
  .withUser(1)
  .addItem(100, 1)
  .addItem(101, 2)
  .withCurrency("EUR")
  .withDiscount(0.15)
  .withShippingAddress("NY, Oak St. 123")
  .build();

console.log(JSON.stringify(order));
