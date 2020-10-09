export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  phone?: string;
  role: string;
  bio?: string;
}
