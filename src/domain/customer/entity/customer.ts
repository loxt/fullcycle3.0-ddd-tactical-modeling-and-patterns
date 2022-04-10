import Address from '../value-object/address';

export default class Customer {
  constructor(
    private _id: string,
    private _name: string,
    public address?: Address,
    private active: boolean = false,
    private _rewardPoints: number = 0,
  ) {
    this.validate();
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  changeAddress(address: Address): void {
    this.address = address;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  isActive(): boolean {
    return this.active;
  }

  validate() {
    if (this._id.length === 0) {
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

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}
