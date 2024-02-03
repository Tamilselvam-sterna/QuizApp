interface Option {
  id: number;
  option: string;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

export interface CourseResponse {
  id: number;
  subject: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  questions: Question[];
}
