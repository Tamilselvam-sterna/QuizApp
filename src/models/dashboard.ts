export type DashBoardStats = {
  totalUsers: number;
  totalTestAssignedUsers: number;
  totalTestCompletedUsers: number;
  totalTestInCompleteUsers: number;
  totalSubjects: number;
  subjectData: SubjectStatsRes[];
  lastestResults: LastestResultsRes[];
};

export type LastestResultsRes = {
  id: number;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    updatedAt: string;
  };
  test: {
    subject: string;
  };
  score: string;
  percentage: number;
};

export type SubjectStatsRes = {
  subject: string;
  totalUser: number;
  testCompletedUser: number;
  testInCompleteUser: number;
};
