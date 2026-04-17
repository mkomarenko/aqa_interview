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

interface ApiClient {
  request<T>(endpoint: string, params?: unknown): Promise<T>;
}

class MockClient implements ApiClient {
  async request<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = data
      ? (data as T)
      : (OrderBuilder.priorityOrder()
          .withUser(1)
          .addItem(100, 1)
          .addItem(101, 2)
          .withCurrency("EUR")
          .withDiscount(0.15)
          .withShippingAddress("NY, Oak St. 123")
          .build() as unknown as T);
    return response;
  }
}

class InvalidResponseError extends Error {
  constructor(
    message: string,
    public readonly payload: unknown,
    public readonly endpoint?: string,
  ) {
    super(message);

    this.name = "InvalidResponseError";
  }
}

function isItem(item: unknown): boolean {
  return (
    typeof item === "object" &&
    item !== null &&
    "productId" in item &&
    "quantity" in item &&
    typeof item.productId === "number" &&
    typeof item.quantity === "number"
  );
}

function isApiOrder(obj: unknown): obj is Order {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const order = obj as Order;

  return (
    "userId" in order &&
    "items" in order &&
    "currency" in order &&
    "discount" in order &&
    "shippingAddress" in order &&
    "isPriority" in order &&
    typeof order.userId === "number" &&
    Array.isArray(order.items) &&
    order.items.length > 0 &&
    order.items.every(isItem) &&
    (order.currency === "USD" || order.currency === "EUR") &&
    (order.discount === undefined || typeof order.discount === "number") &&
    typeof order.shippingAddress === "string" &&
    typeof order.isPriority === "boolean"
  );
}

class OrderService {
  constructor(
    private apiClient: ApiClient,
    private cache: Map<number, Order>,
    private builder: OrderBuilder,
  ) {}

  async createOrder(userId: number): Promise<Order> {
    const payload = this.builder
      .withUser(userId)
      .addItem(100, 1)
      .addItem(101, 2)
      .withShippingAddress("NY, Oak St. 123")
      .asPriority()
      .build();

    const raw = await this.apiClient.request(`/orders`, payload);

    if (!isApiOrder(raw)) {
      throw new InvalidResponseError(
        "Invalid API response: order is not a valid API order",
        raw,
        "/orders",
      );
    }

    return raw;
  }

  async getOrder(orderId: number): Promise<Order> {
    if (this.cache.has(orderId)) {
      return this.cache.get(orderId)!;
    }

    const raw = await this.apiClient.request(`/orders/${orderId}`);

    if (!isApiOrder(raw)) {
      throw new InvalidResponseError(
        "Invalid API response: order is not a valid API order",
        raw,
        `/orders/${orderId}`,
      );
    }

    this.cache.set(orderId, raw);

    return raw;
  }
}

async function main() {
  const apiClient = new MockClient();
  const orderCache = new Map<number, Order>();
  const orderBuilder = new OrderBuilder();

  const orderService = new OrderService(apiClient, orderCache, orderBuilder);

  let order = await orderService.createOrder(1);
  console.log(JSON.stringify(order));
  order = await orderService.getOrder(1);
  console.log(JSON.stringify(order));
}

main();
