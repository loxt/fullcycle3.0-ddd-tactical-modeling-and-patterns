import OrderItem from './order-item';

export default class Order {
  constructor(
    public id: string,
    public customerId: string,
    public items: OrderItem[],
    public total: number,
  ) {
    this.total = this.orderTotal();
  }

  orderTotal(): number {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }
}
