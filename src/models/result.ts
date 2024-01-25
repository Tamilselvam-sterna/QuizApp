import { GetReq } from "./common-models";

export interface ResultDataType {
  id: number;
  userId: number;
  subjectId: number;
  score: string;
  percentage: number;
  isStart: boolean;
  isFinish: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  test: {
    id: number;
    subject: string;
  };
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
  };
  role: {
    id: number;
    role: string;
  };
  userInfo: userInfoType[];
}

export interface userInfoType {
  college: string;
  degree: string;
  dob: string;
  specialization: string;
  isFresher: boolean;
  isExperience: boolean;
  experience: null;
  position: {
    id: number;
    position: string;
  };
}

export interface GetResult extends GetReq {
  positionId: number;
  subjectId: number;
  percentage: string;
  dateFilter: string;
  startDate: string | undefined;
  endDate: string | undefined;
}
