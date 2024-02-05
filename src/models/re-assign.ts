interface Test {
  id: number;
  subject: string;
}

interface Position {
  id: number;
  position: string;
}

interface UserInfo {
  position: Position;
}

interface User {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  userInfo: UserInfo[];
  userTestDetails: { test: Test }[];
}

export interface ReassignDetails {
  id: number;
  userId: number | string;
  subjectId: number | string;
  score: string;
  percentage: number;
  isStart: boolean;
  isFinish: boolean;
  reassignCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: User;
}

export interface ReassignData {
  userid: string;
  subjectId: string;
}
