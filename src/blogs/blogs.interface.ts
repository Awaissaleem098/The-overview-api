export interface Blog {
  title: string;
  description: string;
  content: string;
  image: string;
  date: Date;
  feedbacks?: FeedBack[];
}

export interface FeedBack {
  name: string;
  message: string;
}
