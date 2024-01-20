import { useState, useEffect } from "react";
import { DashBoardStats } from "../../../models/dashboard";
import { apiProvider } from "../../../network/apiProvider";
import LatestResults from "./LatestResults";
import BarChart from "./BarChart";
import CardWrapper from "../../../components/Card";

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
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardWrapper data={dashboardData} />
      </div>
      <div className="mt-6 grid grid-cols-1 place-items-center gap-6 md:grid-cols-2 lg:grid-cols-4">
        <LatestResults data={dashboardData?.lastestResults} />
        <BarChart barChartData={dashboardData?.subjectData} />
      </div>
    </main>
  );
};

export default Dashboard;
