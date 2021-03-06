import Customer from './domain/customer/entity/customer';
import Address from './domain/customer/value-object/address';
import OrderItem from './domain/checkout/entity/order-item';
import Order from './domain/checkout/entity/order';

const customer = new Customer('123', 'Emannuel Matos');
const address = new Address('Rua S', 30, '79740000', 'Ivinhema');
customer.address = address;
customer.activate();

const item1 = new OrderItem('1', 'Item 1', 10, 'p1', 1);
const item2 = new OrderItem('2', 'Item 2', 20, 'p2', 2);

const order = new Order('1', customer.id, [item1, item2]);
