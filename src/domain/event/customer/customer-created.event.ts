import EventInterface from '../@shared/event.interface';

export default class CustomerCreatedEvent implements EventInterface {
  constructor(
    public eventData: any,
    public dataTimeOccurred: Date = new Date(),
  ) {}
}
