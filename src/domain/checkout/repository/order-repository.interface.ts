import RepositoryInterface from '../../@shared/repository/repository-interface';
import Order from '../entity/order';

interface OrderRepository extends RepositoryInterface<Order> {}

export default OrderRepository;
