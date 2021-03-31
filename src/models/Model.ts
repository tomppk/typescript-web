import { AxiosPromise, AxiosResponse } from 'axios';

interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}
interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  // Implement pass-through methods with get keyword
  // Get accessor. Not calling a function but returning a
  // reference to Eventing class on() method.
  // Can be called as function also user.on('change')
  // This invokes the on() method on Eventing class not
  // the one here in User class

  // get on() {
  //   return this.events.on;
  // }

  // get trigger() {
  //   return this.events.trigger;
  // }

  // get get() {
  //   return this.attributes.get;
  // }

  // Instead of get keyword, we use class properties and
  // assign reference to function to them.
  // Can only be used if events, attributes are defined
  // as constructor arguments, not inside constructor or
  // class properties.
  // If defined inside constructor these class properties
  // below will be initialized first, before events and
  // attributes exists. So eg. this.events will refer to
  // undefined.
  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

  // Update user properties. Invokes Attributes class set() method
  // Then invokes Eventing class trigger method to notify that User
  // properties were changes
  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  // Check whether this User instance has an id or undefined
  // if id then invoke Sync class fetch() method with the id of current User
  // instance. Fetch() method returns an AxiosPromise so we chain on .then for
  // promise to resolve. The resolved promise value (response.data) is then used
  // as argument to set/update user properties and trigger change notification
  fetch(): void {
    const id = this.attributes.get('id');

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  // Call Sync class save method and pass in as argument
  // Attributes class getAll() call which returns all
  // properties as UserProps object.
  // After successful save chain on .then to wait for
  // AxiosResponse and then trigger 'save' event.
  // If errors then trigger 'error' event
  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}
