import { User } from './models/User';

const user = new User({ name: 'myname', age: 20 });

// console.log(user.get('name'));
// console.log(user.get('age'));

// user.set({ name: 'johnny', age: 30 });
// console.log(user.get('name'));
// console.log(user.get('age'));

// user.set({ name: 'mickey' });

// console.log(user.get('name'));

user.on('change', () => {
  console.log('change #1');
});
user.on('change', () => {
  console.log('change #2');
});
user.on('save', () => {
  console.log('save was triggered');
});

user.trigger('change');
user.trigger('save');
user.trigger('random');
