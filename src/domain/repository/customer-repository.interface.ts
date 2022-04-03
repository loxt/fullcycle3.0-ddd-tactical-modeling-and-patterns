import RepositoryInterface from './repository-interface';
import Customer from '../entity/customer';

interface CustomerRepository extends RepositoryInterface<Customer> {}

export default CustomerRepository;
