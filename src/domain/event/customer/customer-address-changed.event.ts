import EventInterface from '../@shared/event.interface';

export default class CustomerAddressChangedEvent implements EventInterface {
  constructor(
    public eventData: any,
    public dataTimeOccurred: Date = new Date(),
  ) {}
}
