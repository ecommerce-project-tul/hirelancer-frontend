import { Announcement } from './Announcement';
import { EMessageType } from './EMessageType';

export interface Message {
  id: string;
  announcement: Announcement;
  message?: Message;
  messageId?: string;
  content: string;
  isAnonymous: boolean;
  messageType: EMessageType;
}
