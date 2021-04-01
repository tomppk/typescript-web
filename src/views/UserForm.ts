import { User, UserProps } from '../models/User';
import { View } from './View';

export class UserForm extends View<User, UserProps> {
  // Connects the event we want to watch for and function to run for that event.
  // event we want to listen for and element we are adding the event listener.
  // Returns an object with a key of type string and value of type function that
  // does not return anything
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick,
    };
  }

  // Save user into database
  onSaveClick = (): void => {
    this.model.save();
  };

  // Select <input> tag from parent DOM element.
  // Access input property value which is the text inside input field
  // Use User model set() method to set new name as the input
  // Set type guard to check that input is not null
  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input');

    if (input) {
      const name = input.value;

      this.model.set({ name });
    }
  };

  // Function we want to run when event handler is triggered
  // Call User class setRandomAge() method
  // Defined as arrow function to refer to User instance of model
  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  // Returns string of HTML we want to render
  // Use model property's ie. User class method get() to get 'name' property
  // of User
  template(): string {
    return `
        <div>
            <input placeholder="${this.model.get('name')}" />
            <button class="set-name">Change Name</button>
            <button class="set-age">Set Random Age</button>
            <button class="save-model">Save User</button>
        </div>
        `;
  }
}
