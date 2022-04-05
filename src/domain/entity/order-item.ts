export default class OrderItem {
  constructor(
    private _id: string,
    private _name: string,
    private _price: number,
    private _productId: string,
    private _quantity: number,
  ) {}

  get productId(): string {
    return this._productId;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get quantity(): number {
    return this._quantity;
  }

  get price(): number {
    return this._price;
  }
}
