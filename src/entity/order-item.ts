export default class OrderItem {
  constructor(
    private id: string,
    private name: string,
    private _price: number,
    private productId: string,
    private _quantity: number,
  ) {}

  get quantity(): number {
    return this._quantity;
  }

  get price(): number {
    return this._price * this._quantity;
  }
}
