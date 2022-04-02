import Product from '../entity/product';
import RepositoryInterface from './repository-interface';

interface ProductRepository extends RepositoryInterface<Product> {}

export default ProductRepository;
