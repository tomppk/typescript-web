import { View } from './View';
import { User, UserProps } from '../models/User';
import { UserForm } from './UserForm';
import { UserShow } from './UserShow';

// Whenever UserEdit is rendered on the screen it will render its two child
// elements as well
export class UserEdit extends View<User, UserProps> {
  // Used for nesting views. UserEdit nests UserShow and UserForm classes
  // These will be added to rendered html inside View class render()
  regionsMap(): { [key: string]: string } {
    return {
      userShow: '.user-show',
      userForm: '.user-form',
    };
  }

  // Creating new instance first argument is reference to
  // the html element that acts as root/parent element.
  // Second argument is reference to User model.
  // Then call UserShow class method render() to render
  // its html template
  onRender(): void {
    new UserShow(this.regions.userShow, this.model).render();
    new UserForm(this.regions.userForm, this.model).render();
  }

  // Html template of UserEdit class
  template(): string {
    return `
        <div>
            <div class="user-show"></div>
            <div class="user-form"></div>
        </div>
        `;
  }
}
