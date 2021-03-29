import { User } from './models/User';

const user = new User({ name: 'myname', age: 20 });

// console.log(user.get('name'));
// console.log(user.get('age'));

// user.set({ name: 'johnny', age: 30 });
// console.log(user.get('name'));
// console.log(user.get('age'));

// user.set({ name: 'mickey' });

// console.log(user.get('name'));

user.on('change', () => {});
user.on('change', () => {});
user.on('click', () => {});

console.log(user);
