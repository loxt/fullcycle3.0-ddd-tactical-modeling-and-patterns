import {Sequelize} from 'sequelize-typescript';
import CustomerModel from '../db/sequelize/model/customer.model';
import CustomerRepository from './customer.repository';
import Customer from '../../domain/entity/customer';
import Address from '../../domain/entity/address';

describe('Customer repository unit tests', function() {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: {force: true},
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'John');
    const address = new Address('Rua S', 30, '79740000', 'Ivinhema');
    customer.address = address;
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({where: {id: '123'}});

    expect(customerModel.toJSON()).toStrictEqual({
      id: '123',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    });
  });

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'John');
    const address = new Address('Rua S', 30, '79740000', 'Ivinhema');
    customer.address = address;
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({where: {id: '123'}});

    expect(customerModel.toJSON()).toStrictEqual({
      id: '123',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    });

    customer.changeName('John Doe');
    customer.changeAddress(new Address('Rua T', 30, '79740000', 'Ivinhema'));
    await customerRepository.update(customer);

    const customerModelUpdated = await CustomerModel.findOne({
      where: {id: '123'},
    });

    expect(customerModelUpdated.toJSON()).toStrictEqual({
      id: '123',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zip,
      city: customer.address.city,
    });
  });

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'John');
    const address = new Address('Rua S', 30, '79740000', 'Ivinhema');
    customer.address = address;
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({where: {id: '123'}});

    expect(customerModel.toJSON()).toStrictEqual({
      id: '123',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    });

    const customerFound = await customerRepository.findById('123');

    expect(customer).toStrictEqual(customerFound);
  });

  it('should throw an error when customer not found', async () => {
    const customerRepository = new CustomerRepository();

    await expect(async () => {
      await customerRepository.findById('1234');
    }).rejects.toThrow('Customer not found');
  });

  it('should find all customers', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'John');
    const address = new Address('Rua S', 30, '79740000', 'Ivinhema');
    customer.address = address;
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({where: {id: '123'}});

    expect(customerModel.toJSON()).toStrictEqual({
      id: '123',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    });

    const customers = await customerRepository.findAll();

    expect(customers).toEqual([customer]);
  });
});
