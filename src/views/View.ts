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
  // Regions class property. Is an object with values that contain
  // an HTML Element
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  // Abstract function that child classes must implement
  // Creates HTML string template
  abstract template(): string;

  // Default implementation of regionsMap that child elements can override
  // Can return a region to bind other html elements into
  // Key is region name and value is reference to html element class or id
  // eg. UserForm: .user-form
  regionsMap(): { [key: string]: string } {
    return {};
  }

  // Default eventsMap method that child classes can overwrite
  // returns an empty object by default
  eventsMap(): { [key: string]: () => void } {
    return {};
  }

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

  // Iterate through all the regions in regionsMap. Find regions that
  // match value of regionsMap key and add them into this.regions property
  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);

      if (element) {
        this.regions[key] = element;
      }
    }
  }

  // Default implementation of view nesting that child classes implement
  // if needed
  onRender(): void {}

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
    this.mapRegions(templateElement.content);

    this.onRender();

    this.parent.append(templateElement.content);
  }
}
