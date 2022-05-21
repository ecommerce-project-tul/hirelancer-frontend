import { User } from './User';
import { Announcement } from './Announcement';

export interface Offer {
  id: string;
  freelancer: User;
  announcement: Announcement;
  price: number;
}
