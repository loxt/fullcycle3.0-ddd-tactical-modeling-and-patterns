import Address from './address';

export default class Customer {
  constructor(
    public id: string,
    public name: string,
    public address?: Address,
    public active: boolean = false,
  ) {
    this.validate();
  }

  validate() {
    if (this.name.length === 0) {
      throw new Error('Name is required');
    }

    if (this.id.length === 0) {
      throw new Error('Id is required');
    }
  }

  changeName(name: string) {
    this.name = name;
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
