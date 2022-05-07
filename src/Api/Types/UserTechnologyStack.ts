import { User } from './User';
import { TechnologyStack } from './TechnologyStack';

export interface UserTechnologyStack {
  id: string;
  user: User;
  technologyStack: TechnologyStack;
  score: number;
}
