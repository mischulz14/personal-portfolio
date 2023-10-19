export interface CreateFeedbackInput {
  feedback: string;
}

export interface Feedback {
  id: string;
  title: string;
  content: string;
  icon?: string;
  author: string;
  stars?: number;
}

export interface GetFeedback {
  getFeedback: Feedback[];
}
