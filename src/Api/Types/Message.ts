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
  messageType: EMessageType;
  user: User;
}
