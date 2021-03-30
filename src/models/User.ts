import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

// Extract UserProps object from constructor. Better to have separate interface
// than defining the object in one line on constructor.
// Question mark ? after property name makes a property optional, not required
interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  public events: Eventing = new Eventing();

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

  // Make network get request to backend to fetch user data using id of
  // current User instance. Update all properties of current user instance
  fetch(): void {
    axios
      .get(`http://localhost:3000/users/${this.get('id')}`)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      });
  }

  // If there already exists a user with this id then update that user with put
  // otherwise post a new user to backend database
  save(): void {
    const id = this.get('id');

    if (id) {
      // put (url, new data)
      axios.put(`http://localhost:3000/users/${id}`, this.data);
    } else {
      // post (url, new data)
      axios.post('http://localhost:3000/users', this.data);
    }
  }
}
