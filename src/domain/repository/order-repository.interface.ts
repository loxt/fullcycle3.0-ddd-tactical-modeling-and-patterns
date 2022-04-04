import RepositoryInterface from './repository-interface';
import Order from '../entity/order';

interface OrderRepository extends RepositoryInterface<Order> {}

export default OrderRepository;
