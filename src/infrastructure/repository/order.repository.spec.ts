import {Sequelize} from 'sequelize-typescript';
import CustomerModel from '../db/sequelize/model/customer.model';
import OrderModel from '../db/sequelize/model/order.model';
import OrderItemModel from '../db/sequelize/model/order-item.model';
import ProductModel from '../db/sequelize/model/product.model';
import CustomerRepository from './customer.repository';
import Customer from '../../domain/customer/entity/customer';
import Address from '../../domain/customer/value-object/address';
import ProductRepository from './product.repository';
import Product from '../../domain/product/entity/product';
import OrderItem from '../../domain/checkout/entity/order-item';
import Order from '../../domain/checkout/entity/order';
import OrderRepository from './order.repository';

describe('Order repository unit tests', function() {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: {force: true},
    });
    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    const address = new Address('1', 1, 'Street 1', 'City 1');

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
        '1',
        product.name,
        product.price,
        product.id,
        2,
    );

    const order = new Order('1', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: {id: order.id},
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: '1',
      customer_id: '1',
      total: order.orderTotal(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          product_id: orderItem.productId,
          quantity: orderItem.quantity,
          order_id: '1',
        },
      ],
    });
  });

  it('should find an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    const address = new Address('1', 1, 'Street 1', 'City 1');

    customer.changeAddress(address);

    await customerRepository.create(customer);
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
        '1',
        product.name,
        product.price,
        product.id,
        1,
    );

    const order = new Order('1', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderFound = await orderRepository.findById('1');

    expect({
      id: order.id,
      customer_id: order.customerId,
      total: order.orderTotal(),
      items: order.items,
    }).toStrictEqual({
      id: '1',
      customer_id: '1',
      total: orderFound.orderTotal(),
      items: orderFound.items,
    });
  });

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    const address = new Address('1', 1, 'Street 1', 'City 1');

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 10);
    await productRepository.create(product);

    const product2 = new Product('2', 'Product 2', 20);
    await productRepository.create(product2);

    const orderItem = new OrderItem(
        '1',
        product.name,
        product.price,
        product.id,
        1,
    );

    const orderItem2 = new OrderItem(
        '2',
        product.name,
        product.price,
        product.id,
        1,
    );

    const order = new Order('1', customer.id, [orderItem]);
    const order2 = new Order('2', customer.id, [orderItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    await orderRepository.create(order2);

    const orderModel = await orderRepository.findAll();

    expect(orderModel.length).toBe(2);
    expect([order, order2]).toEqual(orderModel);
  });

  it('should update an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    const address = new Address('1', 1, 'Street 1', 'City 1');

    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
        '1',
        product.name,
        product.price,
        product.id,
        2,
    );

    const order = new Order('1', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: {id: order.id},
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: '1',
      customer_id: '1',
      total: order.orderTotal(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          product_id: orderItem.productId,
          quantity: orderItem.quantity,
          order_id: '1',
        },
      ],
    });

    const orderItem2 = new OrderItem(
        '1',
        product.name,
        product.price,
        product.id,
        2,
    );

    const order2 = new Order('1', customer.id, [orderItem2]);

    await orderRepository.update(order2);

    const orderModel2 = await OrderModel.findOne({
      where: {id: order.id},
      include: ['items'],
    });

    expect(orderModel2.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      items: [
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          product_id: orderItem2.productId,
          quantity: orderItem2.quantity,
          order_id: order.id,
        },
      ],
      total: order2.orderTotal(),
    });
  });
});
