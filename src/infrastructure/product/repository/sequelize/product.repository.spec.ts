import {Sequelize} from 'sequelize-typescript';
import ProductModel from './product.model';
import Product from '../../../../domain/product/entity/product';
import ProductRepository from './product.repository';

describe('Product repository unit tests', function() {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: {force: true},
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepository.create(product);

    const productFromDb = await ProductModel.findOne({where: {id: '1'}});
    expect(productFromDb.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 1',
      price: 100,
    });
  });

  it('should update a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepository.create(product);

    const productFromDb = await ProductModel.findOne({where: {id: '1'}});
    expect(productFromDb.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 1',
      price: 100,
    });

    product.changeName('Product 2');
    product.changePrice(200);

    await productRepository.update(product);

    const productFromDb2 = await ProductModel.findOne({where: {id: '1'}});
    expect(productFromDb2.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 2',
      price: 200,
    });
  });

  it('should find a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);
    await productRepository.create(product);

    const productFoundFromDb = await ProductModel.findOne({
      where: {id: '1'},
    });

    const productFoundFromRepository = await productRepository.findById('1');

    expect(productFoundFromDb.toJSON()).toStrictEqual({
      id: productFoundFromRepository.id,
      name: productFoundFromRepository.name,
      price: productFoundFromRepository.price,
    });
  });

  it('should find all products', async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product('1', 'Product 1', 100);
    const product2 = new Product('2', 'Product 2', 200);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const products = [product1, product2];
    const productsFoundFromRepository = await productRepository.findAll();

    expect(products).toEqual(productsFoundFromRepository);
    expect(products.length).toBe(2);
    expect(productsFoundFromRepository.length).toBe(2);
  });
});
