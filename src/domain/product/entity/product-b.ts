import ProductInterface from './product.interface';

export default class ProductB implements ProductInterface {
  get id(): string {
    return this._id;
  }

  constructor(
    private _id: string,
    private _name: string,
    private _price: number,
  ) {
    this.validate();
  }

  get price(): number {
    return this._price * 2;
  }

  get name(): string {
    return this._name;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required');
    }
    if (this._name.length === 0) {
      throw new Error('Name is required');
    }
    if (this._price <= 0) {
      throw new Error('Price must be greater than zero');
    }
  }

  changeName(newName: string) {
    this._name = newName;
  }

  changePrice(newPrice: number) {
    this._price = newPrice;
    this.validate();
  }
}
