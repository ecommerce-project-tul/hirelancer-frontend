import { EUserRole } from './EUserRole';
import { Review } from './Review';
import { Announcement } from './Announcement';
import { UserTechnologyStack } from './UserTechnologyStack';
import { Offer } from './Offer';

export interface User {
  id: string;
  photo: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: EUserRole;
  linkedInToken: string;
  githubLink: string;
  linkedInLink: string;
  description: string;
  reviews: Review[];
  announcements: Announcement[];
  offers: Offer[];
  userTechnologyStacks: UserTechnologyStack[];
}
