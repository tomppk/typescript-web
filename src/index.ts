import { UserList } from './views/UserList';
import { Collection } from './models/Collection';
import { User, UserProps } from './models/User';

// Define our new Collection. First argument is url to find our users
// Our response gets back as json in the format of UserProps
// We create new User instances with this returned json
const users = new Collection(
  'http://localhost:3000/users',
  (json: UserProps) => {
    return User.buildUser(json);
  }
);

// Set up event handler to listen for 'change' event
// When our users list changes we want to render it onto screen.
// Get reference to our index.html <div> with id of 'root'
// Then create a new UserList with reference to root element and our list
// of users and render it
users.on('change', () => {
  const root = document.getElementById('root');

  if (root) {
    new UserList(root, users).render();
  }
});

// Fetch our list of users from backend server
users.fetch();
