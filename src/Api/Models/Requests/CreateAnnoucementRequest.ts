export interface CreateAnnouncementRequest {
  email: string;
  title: string;
  description: string;
  startingPrice: number;
  deadlineDate: Date;
  tagName: string;
}
