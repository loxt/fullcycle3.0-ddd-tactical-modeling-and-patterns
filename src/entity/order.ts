import OrderItem from './order-item';

export default class Order {
  constructor(
    private _id: string,
    private _customerId: string,
    private _items: OrderItem[],
  ) {}
}
