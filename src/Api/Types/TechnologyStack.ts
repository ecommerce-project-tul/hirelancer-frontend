import { UserTechnologyStack } from './UserTechnologyStack';

export interface TechnologyStack {
  id: string;
  icon: string;
  name: string;
  userTechnologyStacks: UserTechnologyStack[];
}
