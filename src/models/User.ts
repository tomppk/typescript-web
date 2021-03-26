// Extract UserProps object from constructor. Better to have separate interface
// than defining the object in one line on constructor
interface UserProps {
  name: string;
  age: number;
}

export class User {
  constructor(private data: UserProps) {}
}
