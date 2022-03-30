import Order from './order';
import OrderItem from './order-item';

describe('Order unit tests', () => {
  it('should throw an error when id is empty', function() {
    expect(() => {
      return new Order('', '1', []);
    }).toThrowError('Id is required');
  });

  it('should throw an error when customer id is empty', function() {
    expect(() => {
      return new Order('1', '', []);
    }).toThrowError('CustomerId is required');
  });

  it('should throw an error if item quantity is less than 0', function() {
    expect(() => {
      return new Order('1', '1', []);
    }).toThrowError('Item quantity must be greater than 0');
  });

  it('should calculate total', function() {
    const item1 = new OrderItem('1', 'Bola', 10);
    const item2 = new OrderItem('1', 'Caneta', 2);
    const order = new Order('1', '1', [item1, item2]);

    expect(order.orderTotal()).toBe(12);
  });
});
