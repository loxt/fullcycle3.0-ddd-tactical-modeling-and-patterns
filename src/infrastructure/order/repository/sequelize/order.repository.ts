import OrderRepositoryInterface from '../../../../domain/checkout/repository/order-repository.interface';
import Order from '../../../../domain/checkout/entity/order';
import OrderModel from './order.model';
import OrderItemModel from './order-item.model';
import OrderItem from '../../../../domain/checkout/entity/order-item';

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

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
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
          where: {
            id: entity.id,
          },
        },
    );
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: [
        {
          model: OrderItemModel,
          as: 'items',
        },
      ],
    });

    return orders.map((order) => {
      const orderItems = order.items.map((item) => {
        return new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity,
        );
      });

      return new Order(order.id, order.customer_id, orderItems, order.total);
    });
  }

  async findById(id: string): Promise<Order> {
    const order = await OrderModel.findOne({
      where: {id},
      include: ['items'],
    });

    const orderItems: OrderItem[] = order.items.map((item) => {
      return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity,
      );
    });
    return new Order(order.id, order.customer_id, orderItems, order.total);
  }
}
