import EventDispatcherInterface from './event-dispatcher.interface';
import EventHandlerInterface from './event-handler.interface';
import EventInterface from './event.interface';

export default class EventDispatcher implements EventDispatcherInterface {
  notify(event: EventInterface): void {
    console.log(`Event: ${event}`);
  }

  register(event: string, eventHandler: EventHandlerInterface): void {}

  unregister(event: string, eventHandler: EventHandlerInterface): void {}

  unregisterAll(): void {}
}
