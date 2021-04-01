import { CollectionView } from './CollectionView';
import { User, UserProps } from '../models/User';
import { UserShow } from './UserShow';

export class UserList extends CollectionView<User, UserProps> {
  // For every user we fetch from our backend server
  // we are going to render UserShow template.
  // When we call render() we are going to render
  // html template and append that template into parent element
  renderItem(model: User, itemParent: Element): void {
    new UserShow(itemParent, model).render();
  }
}
