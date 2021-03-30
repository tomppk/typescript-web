import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attributes } from './Attributes';

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
}
