import { User } from './User';

export interface Review {
  id: string;
  client: User;
  freelancer: User;
  score: number;
  description: string;
  creationDate: Date;
}
