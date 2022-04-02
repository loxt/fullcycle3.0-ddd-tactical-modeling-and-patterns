export default class Address {
  constructor(
    private _street: string,
    private _number: number,
    private _zip: string,
    private _city: string,
  ) {
    this.validate();
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error('Street is required');
    }
    if (this._number === 0) {
      throw new Error('Number is required');
    }
    if (this._zip.length === 0) {
      throw new Error('Zip is required');
    }
    if (this._city.length === 0) {
      throw new Error('City is required');
    }
  }
}
