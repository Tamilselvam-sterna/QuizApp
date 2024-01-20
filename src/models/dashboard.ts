export type DashBoardStats = {
  id: number;
  userCount: number;
  positionCount: number;
  subjectCount: number;
  testAssignedCount: number;
  testCompletedCount: number;
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
