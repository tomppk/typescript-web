// Extract UserProps object from constructor. Better to have separate interface
// than defining the object in one line on constructor.
// Question mark ? after property name makes a property optional, not required
interface UserProps {
  name?: string;
  age?: number;
}

// Setting up type alias for function for easier reading
// Function with no arguments and no return value
type Callback = () => void;
export class User {
  // [key: string] indicates that key names or properties are not known beforehand
  // but they will be strings
  events: { [key: string]: Callback[] } = {};

  constructor(private data: UserProps) {}

  // Get User properties name or age
  get(propName: string): number | string {
    return this.data[propName];
  }

  // Set UserProps with Object.assign(target, copyFrom). Copy object
  // properties from object to target object. Properties are overwritten
  set(update: UserProps): void {
    Object.assign(this.data, update);
  }

  // Adds event listener to User
  // Takes two arguments: name of event to listen for and callback function to run
  // this.events[eventName] is either array of callbacks  or undefined. In case
  // undefined it is set to be an empty array []
  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  // Trigger an event from the callback array. If no callbacks yet ie. undefined
  // then return early
  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach((callback) => {
      callback();
    });
  }
}
