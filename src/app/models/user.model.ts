import { Evento } from './evento.model';

export interface User {
  _id?: string;
  username: string;
  gmail: string;
  password: string;
  birthday: Date;
  role: 'user' | 'admin'; 
  eventos?: (string | Evento)[];
}
