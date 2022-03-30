import Address from './address';

export default class Customer {
  constructor(
    private id: string,
    private _name: string,
    public address?: Address,
    private active: boolean = false,
  ) {
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  isActive(): boolean {
    return this.active;
  }

  validate() {
    if (this.id.length === 0) {
      throw new Error('Id is required');
    }
    if (this.name.length === 0) {
      throw new Error('Name is required');
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (this.address === undefined) {
      throw new Error('Address is mandatory to activate a customer');
    }
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }
}
