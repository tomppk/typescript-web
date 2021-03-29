import axios from 'axios';
import { User } from './models/User';

// axios.post('http://localhost:3000/users', {
//   name: 'myname',
//   age: 20,
// });

// axios.get('http://localhost:3000/users/1');

const user = new User({ id: 1 });

user.set({ name: 'STEVE', age: 40 });
user.save();

const userTwo = new User({ name: 'Bobby', age: 60 });
userTwo.save();

// console.log(user.get('name'));
// console.log(user.get('age'));

// user.set({ name: 'johnny', age: 30 });
// console.log(user.get('name'));
// console.log(user.get('age'));

// user.set({ name: 'mickey' });

// console.log(user.get('name'));

// user.on('change', () => {
//   console.log('change #1');
// });
// user.on('change', () => {
//   console.log('change #2');
// });
// user.on('save', () => {
//   console.log('save was triggered');
// });

// user.trigger('change');
// user.trigger('save');
// user.trigger('random');
