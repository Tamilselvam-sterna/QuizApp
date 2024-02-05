import { useEffect } from "react";
import LatestResults from "./LatestResults";
import BarChart from "./BarChart";
import CardWrapper from "../../../components/Card";
import AnimatedComponent from "../../../components/AnimatedComponent";

import DashboardFilter from "./DashboardFilter";
import { dashboardStore } from "../../../app/dashboardStore";

const Dashboard = () => {
  const { fetchData, data } = dashboardStore();
  // localStorage.removeItem("token");
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatedComponent>
      <div className="mt-3 flex w-full justify-between">
        <h1 className="mb-4 text-xl font-bold md:text-2xl">Dashboard</h1>
        <div className="relative right-10">
          <DashboardFilter />
        </div>
      </div>
      <main className="m-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <CardWrapper data={data} />
        </div>
        <div className="mt-6 grid grid-cols-1  gap-6 md:grid-cols-2 lg:grid-cols-4">
          <LatestResults data={data?.lastestResults} />
          <BarChart barChartData={data?.subjectData} />
        </div>
      </main>
    </AnimatedComponent>
  );
};

export default Dashboard;
