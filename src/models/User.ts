import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';
import { AxiosPromise, AxiosResponse } from 'axios';

// Extract UserProps object from constructor. Better to have separate interface
// than defining the object in one line on constructor.
// Question mark ? after property name makes a property optional, not required
export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

// Use different submodules to provide functionality for User class.
// Initialize attributes property in constructor so can call
// new User({name: 'afasf'})
export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  // Implement pass-through methods with get keyword
  // Get accessor. Not calling a function but returning a
  // reference to Eventing class on() method.
  // Can be called as function also user.on('change')
  // This invokes the on() method on Eventing class not
  // the one here in User class
  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  // Update user properties. Invokes Attributes class set() method
  // Then invokes Eventing class trigger method to notify that User
  // properties were changes
  set(update: UserProps): void {
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
