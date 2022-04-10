import EventDispatcher from './event-dispatcher';
import SendEmailWhenProductIsCreatedHandler from '../../product/event/handler/send-email-when-product-is-created.handler';
import ProductCreatedEvent from '../../product/event/product-created.event';
import SendLogWhenCustomerIsCreatedHandler from '../../customer/event/handler/send-log-when-customer-is-created.handler';
import SendSecondLogWhenCustomerIsCreatedHandler from '../../customer/event/handler/send-second-log-when-customer-is-created.handler';
import CustomerCreatedEvent from '../../customer/event/customer-created.event';
import SendLogWhenCustomerAddressIsChangedHandler from '../../customer/event/handler/send-log-when-customer-address-is-changed.handler';
import CustomerAddressChangedEvent from '../../customer/event/customer-address-changed.event';
import Address from '../../customer/value-object/address';
import Customer from '../../customer/entity/customer';

describe('Product domain events tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'],
    ).toBeDefined();

    expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'],
    ).toHaveLength(1);

    expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'][0],
    ).toMatchObject(eventHandler);
  });

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'][0],
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

    expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'],
    ).toBeDefined();

    expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'],
    ).toHaveLength(0);
  });

  it('should unresgister all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'][0],
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'],
    ).toBeUndefined();
  });

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'][0],
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      id: 1,
      name: 'Product 1',
      description: 'Product 1 description',
      price: 10,
      createdAt: new Date(),
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});

describe('Customer domain events tests', () => {
  it('should register multiples event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendLogWhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendSecondLogWhenCustomerIsCreatedHandler();

    eventDispatcher.register('CustomerCreatedEvent', eventHandler);
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

    expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'],
    ).toBeDefined();

    expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'],
    ).toHaveLength(2);
  });

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendLogWhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendSecondLogWhenCustomerIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('CustomerCreatedEvent', eventHandler);
    eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

    expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0],
    ).toMatchObject(eventHandler);

    expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1],
    ).toMatchObject(eventHandler2);

    new CustomerCreatedEvent({
      id: 1,
      name: 'Customer 1',
    });

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: 2,
      name: 'Customer 2',
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it('should notify event handler when address is changed', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendLogWhenCustomerAddressIsChangedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

    expect(
        eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'][0],
    ).toMatchObject(eventHandler);

    const customerAddress = new Address('Rua S', 30, '7974000', 'Ivinhema');

    const customer = new Customer('1', 'Customer 1', customerAddress, true);

    const customerNewAddress = new Address('Rua Y', 500, '7974000', 'Ivinhema');

    customer.changeAddress(customerNewAddress);
    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: 1,
      name: 'Customer 1',
      address: customerNewAddress,
    });

    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
