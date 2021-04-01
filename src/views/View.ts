import { Model } from '../models/Model';

// Element is a reference to any HTML element
// When creating new instance of UserForm we pass in
// reference to parent element where we want to render
// the html form.
// Take in model of User class
// T is going to have all the same properties as type Model with type K loaded into it
// View defines two types T, and for the Model class to use K
// We pass in T the type of Model we want to use, and type K a set of attributes
// we want our Model to have (id, name age etc.)
// eg. View(User extends Model<UserProps>, UserProps) -> View(User, UserProps)
export abstract class View<T extends Model<K>, K> {
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract eventsMap(): { [key: string]: () => void };
  abstract template(): string;

  // Adds event listener to User model that listens for
  // 'change' event and calls this.render() when there is
  // change in User model
  bindModel(): void {
    this.model.on('change', () => {
      this.render();
    });
  }

  // Takes in a fragment of HTML which is defined in template()
  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    // For each key: value pair in eventsMap object
    // create two new variables eventName and selector by splitting
    // eventKey at :
    // Split returns an array of split elements
    // eventName is 'click' and selector 'button'
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      // Select all HTML fragments that match selector eg. 'button'
      // For each such element addEventlistener for eventName eg. 'click'
      // and the callback function to run in case of event is found at the
      // value of eventsMap at key eventKey eg. 'click:button'
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  // <template> elements can be used to turn a string into
  // HTML element
  // append the HTML content of template element into parent element
  // .content property is a reference to the actual HTML inside template element
  // .content is a type of DocumentFragment. This is an object that holds the
  // HTML in memory before it is inserted into the DOM
  // bindEvents() looks through templateElement HTML content if there is matching
  // element name in there and eventsMap. Then it adds event listener to that
  // element and a callback to run as defined in eventsMap
  // Before each re-render empty the parent elements html content.
  render(): void {
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);

    this.parent.append(templateElement.content);
  }
}
