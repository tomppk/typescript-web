// Element is a reference to any HTML element
// When creating new instance of UserForm we pass in
// reference to parent element where we want to render
// the html form
export class UserForm {
  constructor(public parent: Element) {}

  template(): string {
    return `
        <div>
            <h1>User Form</h1>
            <input />
        </div>
        `;
  }

  // <template> elements can be used to turn a string into
  // HTML element
  // append the HTML content of template element into parent
  // element
  render(): void {
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.parent.append(templateElement.content);
  }
}
