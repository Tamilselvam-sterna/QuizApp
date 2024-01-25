export interface TestDataResponse {
  id: number;
  subject: string;
  isActive: true;
  createdAt: string;
  updatedAt: string;
  questions: QuestionResponse[];
}
export interface QuestionResponse {
  id: number;
  question: string;
  options: optionResponse[];
}
export interface optionResponse {
  id: number;
  option: string;
}
[{},{},{}]