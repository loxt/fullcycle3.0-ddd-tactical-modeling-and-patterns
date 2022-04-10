import Product from '../entity/product';
import RepositoryInterface from '../../@shared/repository/repository-interface';

interface ProductRepository extends RepositoryInterface<Product> {}

export default ProductRepository;
