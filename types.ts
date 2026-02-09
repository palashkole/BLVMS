
export interface Visitor {
  id: string;
  name: string;
  email: string;
  mobile: string;
  host: string;
  company: string;
  photo: string; // Base64 data URL
  entryTime: Date;
  exitTime: Date | null;
  expiryDate: Date;
  state: string;
  city: string;
  visitorType: string;
  notes?: string;
}

export type UserRole = 'admin' | 'security' | 'user';

export interface User {
  id: string;
  username: string;
  password; // In a real app, this would be hashed
  role: UserRole;
}