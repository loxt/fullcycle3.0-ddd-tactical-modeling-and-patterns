import Customer from './entity/customer';
import Address from './entity/address';
import OrderItem from './entity/order-item';
import Order from './entity/order';

const customer = new Customer('123', 'Emannuel Matos');
const address = new Address('Rua S', 30, '79740000', 'Ivinhema');
customer.address = address;
customer.activate();

const item1 = new OrderItem('1', 'Item 1', 10);
const item2 = new OrderItem('2', 'Item 2', 20);

const order = new Order('1', customer.id, [item1, item2]);
