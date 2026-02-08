export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'collaborator';
  created_at: string;
}
