import CustomerFactory from './customer.factory';
import Address from '../value-object/address';

describe('CustomerFactory unit tests', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('Emannuel');
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('Emannuel');
    expect(customer.address).toBeUndefined();
  });

  it('should create a customer with an address', () => {
    const address = new Address('Rua dois', 35, '7974000', 'São Paulo');
    const customer = CustomerFactory.createWithAddress('Emannuel', address);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('Emannuel');
    expect(customer.address).toBe(address);
  });
});
