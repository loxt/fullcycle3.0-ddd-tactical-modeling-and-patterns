import Product from './product';

describe('Product unit tests', () => {
  it('should throw an error when id is empty', function() {
    expect(() => {
      return new Product('', 'Product 1', 20);
    }).toThrowError('Id is required');
  });

  it('should throw an error when name is empty', function() {
    expect(() => {
      return new Product('1', '', 20);
    }).toThrowError('Name is required');
  });

  it('should throw an error when price is less than zero', function() {
    expect(() => {
      return new Product('1', 'Product 1', -1);
    }).toThrowError('Price must be greater than zero');
  });

  it('should change name', function() {
    const product = new Product('1', 'Product 1', 10);
    product.changeName('Product 2');
    expect(product.name).toBe('Product 2');
  });

  it('should change price', function() {
    const product = new Product('1', 'Product 1', 10);
    product.changePrice(20);
    expect(product.price).toBe(20);
  });
});
