import OrderItem from './order-item';

export default class Order {
  constructor(
    private id: string,
    private customerId: string,
    private items: OrderItem[],
    private total?: number,
  ) {
    this.total = this.orderTotal();
    this.validate();
  }

  validate() {
    if (this.id.length === 0) {
      throw new Error('Id is required');
    }
    if (this.customerId.length === 0) {
      throw new Error('CustomerId is required');
    }
    if (this.items.length === 0) {
      throw new Error('Items are required');
    }
    if (this.items.some((item) => item.quantity <= 0)) {
      throw new Error('Item quantity must be greater than 0');
    }
  }

  orderTotal(): number {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }
}
