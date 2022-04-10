import OrderItem from './order-item';

export default class Order {
  constructor(
    private _id: string,
    private _customerId: string,
    private _items: OrderItem[],
    private total?: number,
  ) {
    this.total = this.orderTotal();
    this.validate();
  }

  get items(): OrderItem[] {
    return this._items;
  }

  get customerId(): string {
    return this._customerId;
  }

  get id(): string {
    return this._id;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required');
    }
    if (this._customerId.length === 0) {
      throw new Error('CustomerId is required');
    }
    if (this._items.length === 0) {
      throw new Error('Items are required');
    }
    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error('Item quantity must be greater than 0');
    }
  }

  orderTotal(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }
}
