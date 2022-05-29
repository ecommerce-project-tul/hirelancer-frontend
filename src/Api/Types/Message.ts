import { Announcement } from './Announcement';
import { EMessageType } from './EMessageType';
import { User } from './User';

export interface Message {
  id: string;
  announcement: Announcement;
  message?: Message;
  messageId?: string;
  content: string;
  isAnonymous: boolean;
  parent: Message;
  messageType: EMessageType;
  user: User;
}
