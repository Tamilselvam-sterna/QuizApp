import { useState, useEffect } from "react";
import { DashBoardStats } from "../../../models/dashboard";
import { apiProvider } from "../../../network/apiProvider";
import LatestResults from "./LatestResults";
import BarChart from "./BarChart";

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
    <main className="mb-2 ml-2 mt-5 grid gap-2  p-5 md:grid-cols-2">
      <BarChart />
      <div className="">
        {dashboardData?.lastestResults && (
          <LatestResults
            data={dashboardData?.lastestResults}
            key={dashboardData.id}
          />
        )}
      </div>
    </main>
  );
};

export default Dashboard;
