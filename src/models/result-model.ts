interface Position {
  id: number;
  position: string;
}

interface UserInfo {
  college: string;
  degree: string;
  dob: string;
  specialization: string;
  isFresher: boolean;
  isExperience: boolean;
  experience: string;
  position: Position;
}

interface Role {
  id: number;
  role: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  role: Role;
  userInfo: UserInfo[];
}

interface Test {
  id: number;
  subject: string;
}

interface ResultResponse {
  id: number;
  userId: number;
  subjectId: number;
  score: string;
  percentage: number;
  isStart: boolean;
  isFinish: boolean;
  reassignCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  test: Test;
  user: User;
}
