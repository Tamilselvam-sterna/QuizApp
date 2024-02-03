interface UserInfo {
  college: string;
  degree: string;
  specialization: string;
  isFresher: boolean;
  isExperience: boolean;
  experience: string;
  dob: string;
  position: {
    id: number;
    position: string;
  };
}

interface TestDetails {
  test: {
    id: number;
    subject: string;
  };
}

interface UserRole {
  id: number;
  role: string;
}

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  createdAt: string;
  role: UserRole;
  userInfo: UserInfo[];
  userTestDetails: TestDetails[];
}
