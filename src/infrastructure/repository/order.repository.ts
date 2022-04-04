import OrderRepositoryInterface from '../../domain/repository/order-repository.interface';
import Order from '../../domain/entity/order';
import OrderModel from '../db/sequelize/model/order.model';
import OrderItemModel from '../db/sequelize/model/order-item.model';

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.orderTotal(),
          items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          })),
        },
        {
          include: [
            {
              model: OrderItemModel,
              as: 'items',
            },
          ],
        },
    );
  }
}
