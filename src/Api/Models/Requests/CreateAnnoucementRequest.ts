export interface CreateAnnouncementRequest {
  email: string;
  description: string;
  startingPrice: number;
  deadlineDate: Date;
  tagName: string;
}
