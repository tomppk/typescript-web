import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

// Collection class to hold all Users or any generic
// type. When create instance of Collection we are going to
// pass two types, T and K. T will be used for models array
// T[] and K will be the type that specifies the structure
// of JSON data we get back e.g. UserProps {name, id, age}
export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  // Deserialize property to make this class more usable.
  // Takes in JSON formatted according to type K
  // eg. {name, id, age} and transforms it into type T and
  // returns it eg. User{name, id, age}
  // So take in JSON and return a model of type T and push
  // it to our models array
  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.models.push(this.deserialize(value));
      });

      this.trigger('change');
    });
  }
}
