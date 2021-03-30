export class Attributes<T> {
  constructor(private data: T) {}

  // Get User properties name, age or id
  // Type constraint limiting the different types K can be.
  // Value/type of K can ever be one of the keys of T.
  // Return value from object at key e.g. UserProps['name']
  // Use arrow function to bind 'this' to our instance of
  // attributes also called bound function
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  // Set UserProps with Object.assign(target, copyFrom). Copy object
  // properties from object to target object. Properties are overwritten
  set(update: T): void {
    Object.assign(this.data, update);
  }

  getAll(): T {
    return this.data;
  }
}
