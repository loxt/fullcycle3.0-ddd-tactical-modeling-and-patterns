import Customer from './customer';
import Address from './address';

describe('Customer unit tests', () => {
  it('should throw an error when id is empty', function() {
    expect(() => {
      return new Customer('', 'John');
    }).toThrowError('Id is required');
  });

  it('should throw an error when name is empty', function() {
    expect(() => {
      return new Customer('2', '');
    }).toThrowError('Name is required');
  });

  it('should throw an error if changed name is empty', function() {
    const customer = new Customer('2', 'Emannuel');
    customer.changeName('Loxt');

    expect(customer.name).toBe('Loxt');
  });

  it('should activated customer', function() {
    const customer = new Customer('2', 'Emannuel');
    const address = new Address('Rua S', 30, '79740000', 'Ivinhema');
    customer.address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it('should deactivate customer', function() {
    const customer = new Customer('2', 'Emannuel');

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it('should throw error if address is undefined in activated customer', () => {
    expect(() => {
      const customer = new Customer('2', 'Emannuel');
      customer.activate();
    }).toThrowError('Address is mandatory to activate a customer');
  });
});
