import { User } from './User';
import { Announcement } from './Announcement';

export interface Payment {
  id: string;
  userFrom: User;
  userTo: User;
  announcment: Announcement;
  date: Date;
  price: number;
}
