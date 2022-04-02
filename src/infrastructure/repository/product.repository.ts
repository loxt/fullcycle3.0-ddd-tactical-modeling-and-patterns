import ProductRepositoryInterface from '../../domain/repository/product-repository.interface';
import Product from '../../domain/entity/product';
import ProductModel from '../db/sequelize/model/product.model';

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async findAll(): Promise<Product[]> {
    return Promise.resolve([]);
  }

  async findById(id: string): Promise<Product> {
    return Promise.resolve(undefined);
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
        {
          name: entity.name,
          price: entity.price,
        },
        {
          where: {id: entity.id},
        },
    );
  }
}
