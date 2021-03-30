import axios, { AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}
// Tell Typescript that whatever the type T is it will have an id: number
// property. Type constraint.
export class Sync<T extends HasId> {
  // http://localhost:3000/users
  constructor(public rootUrl: string) {}

  // Make network get request to backend to fetch user data using id of
  // current User instance. Update all properties of current user instance
  // Return Axios promise that resolves into fetched data object we can then
  // use to update our User class properties
  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  // If there already exists a user with this id then update that user with put
  // otherwise post a new user to backend database
  // Return AxiosPromise (same as regular Promise but used with axios) so we get
  // back an object we can use to determine whether the save to backend was
  // successful
  save(data: T): AxiosPromise {
    const { id } = data;

    if (id) {
      // put (url, new data)
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      // post (url, new data)
      return axios.post(this.rootUrl, data);
    }
  }
}
