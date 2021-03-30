import { Eventing } from './Eventing';
import { Sync } from './Sync';

// Extract UserProps object from constructor. Better to have separate interface
// than defining the object in one line on constructor.
// Question mark ? after property name makes a property optional, not required
export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';
export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);

  constructor(private data: UserProps) {}

  // Get User properties name, age or id
  get(propName: string): number | string {
    return this.data[propName];
  }

  // Set UserProps with Object.assign(target, copyFrom). Copy object
  // properties from object to target object. Properties are overwritten
  set(update: UserProps): void {
    Object.assign(this.data, update);
  }
}
