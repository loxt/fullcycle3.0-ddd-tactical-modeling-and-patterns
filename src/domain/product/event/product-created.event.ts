import EventInterface from '../../@shared/event/event.interface';

export default class ProductCreatedEvent implements EventInterface {
  constructor(
    public eventData: any,
    public dataTimeOccurred: Date = new Date(),
  ) {}
}
