import { useState, useEffect } from "react";
import { DashBoardStats } from "../../../models/dashboard";
import { apiProvider } from "../../../network/apiProvider";
import LatestResults from "./LatestResults";
import BarChart from "./BarChart";
import CardWrapper from "../../../components/Card";
import AnimatedComponent from "../../../components/AnimatedComponent";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashBoardStats | null>(
    null,
  );

  async function fetchDashBoardData() {
    const response = await apiProvider.fetchDashBoardData();
    if (response?.isSuccess) {
      setDashboardData(response.data);
    }
  }

  useEffect(() => {
    fetchDashBoardData();
  }, []);

  return (
    <AnimatedComponent>
      <main className="m-5">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <CardWrapper data={dashboardData} />
        </div>
        <div className="mt-6 grid grid-cols-1  gap-6 md:grid-cols-2 lg:grid-cols-4">
          <LatestResults data={dashboardData?.lastestResults} />
          <BarChart barChartData={dashboardData?.subjectData} />
        </div>
      </main>
    </AnimatedComponent>
  );
};

export default Dashboard;
