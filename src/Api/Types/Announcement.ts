import { Offer } from './Offer';
import { User } from './User';
import { Message } from './Message';
import { Tag } from './Tag';

export interface Announcement {
  id: string;
  client: User;
  chosenOffer: Offer;
  description: string;
  startingPrice: number;
  deadlineDate: Date;
  creationDate: Date;
  isActive: boolean;
  messages: Message[];
  tags: Tag[];
}
