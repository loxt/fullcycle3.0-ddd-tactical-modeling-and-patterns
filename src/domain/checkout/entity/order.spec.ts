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

  it('should throw an error if order has items', function() {
    expect(() => {
      return new Order('1', '1', []);
    }).toThrowError('Items are required');
  });

  it('should calculate total', function() {
    const item1 = new OrderItem('1', 'Bola', 10, 'p1', 1);
    const item2 = new OrderItem('1', 'Caneta', 2, 'p1', 2);
    const order = new Order('1', '1', [item1, item2]);

    expect(order.orderTotal()).toBe(14);
  });

  it('should throw error if item quantity is greater than 0', function() {
    expect(() => {
      const item1 = new OrderItem('1', 'Bola', 10, 'p1', 0);
      const order = new Order('1', '1', [item1]);
    }).toThrowError('Item quantity must be greater than 0');
  });
});
