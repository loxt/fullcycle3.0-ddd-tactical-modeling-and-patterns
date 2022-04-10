import CustomerRepositoryInterface from '../../domain/customer/repository/customer-repository.interface';
import Customer from '../../domain/customer/entity/customer';
import CustomerModel from '../db/sequelize/model/customer.model';
import Address from '../../domain/customer/value-object/address';

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
        {
          name: entity.name,
          street: entity.address.street,
          number: entity.address.number,
          zipcode: entity.address.zip,
          city: entity.address.city,
          active: entity.isActive(),
          rewardPoints: entity.rewardPoints,
        },
        {
          where: {
            id: entity.id,
          },
        },
    );
  }

  async findById(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error('Customer not found');
    }

    return new Customer(
        customerModel.id,
        customerModel.name,
        new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zipcode,
            customerModel.city,
        ),
        customerModel.active,
        customerModel.rewardPoints,
    );
  }

  async findAll(): Promise<Customer[]> {
    const customers = await CustomerModel.findAll();

    if (!customers) {
      throw new Error('Customers not found');
    }

    return customers.map((customer) => {
      const address = new Address(
          customer.street,
          customer.number,
          customer.zipcode,
          customer.city,
      );

      return new Customer(
          customer.id,
          customer.name,
          address,
          customer.active,
          customer.rewardPoints,
      );
    });
  }
}
