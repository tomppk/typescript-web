import { User } from '../models/User';

// Element is a reference to any HTML element
// When creating new instance of UserForm we pass in
// reference to parent element where we want to render
// the html form.
// Take in model of User class
export class UserForm {
  constructor(public parent: Element, public model: User) {}

  // Connects the event we want to watch for and function to run for that event.
  // event we want to listen for and element we are adding the event listener.
  // Returns an object with a key of type string and value of type function that
  // does not return anything
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:button': this.onButtonClick,
      'mouseenter:h1': this.onHeaderHover,
    };
  }

  onHeaderHover(): void {
    console.log('h1 was hovered over');
  }

  // Function we want to run when event handler is triggered
  onButtonClick(): void {
    console.log('hi there');
  }

  // Returns string of HTML we want to render
  // Use model property's ie. User class method get() to get 'name' property
  // of User
  template(): string {
    return `
        <div>
            <h1>User Form</h1>
            <div>User name: ${this.model.get('name')}</div>
            <div>User age: ${this.model.get('age')}</div>
            <input />
            <button>Click Me</button>
        </div>
        `;
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
  render(): void {
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);

    this.parent.append(templateElement.content);
  }
}
