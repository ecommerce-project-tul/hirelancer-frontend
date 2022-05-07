import { Announcement } from './Announcement';

export interface Tag {
  id: string;
  name: string;
  announcements: Announcement[];
}
