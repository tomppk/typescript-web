import { Model } from './Model';
import { Attributes } from './Attributes';
import { ApiSync } from './ApiSync';
import { Eventing } from './Eventing';
import { Collection } from './Collection';

// Extract UserProps object from constructor. Better to have separate interface
// than defining the object in one line on constructor.
// Question mark ? after property name makes a property optional, not required
export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000/users';

// Class User is child class of Model. User class is build
// using composition that is build from other classes to
// give it its functionality.
// Use different submodules to provide functionality for User class.
// Use static method buildUser() to pass in starting
// attributes and initialize all the submodules or
// components to create a new User instance
export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    );
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, (json: UserProps) =>
      User.buildUser(json)
    );
  }

  // Sets new random age to user age property
  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age });
  }
}
