import Address from './address';

class Customer {
  constructor(
    private _id: string,
    private _name: string,
    private _address: Address,
    private _active: boolean = false,
  ) {
    this.validate();
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error('Name is required');
    }

    if (this._id.length === 0) {
      throw new Error('Id is required');
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer');
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }
}
