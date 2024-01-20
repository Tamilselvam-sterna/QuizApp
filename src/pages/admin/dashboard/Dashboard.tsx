import { Variants, motion } from "framer-motion";
import CardWrapper from "../../../components/Card";
import { useState, useEffect } from "react";
import { DashBoardStats } from "../../../models/dashboard";
import { apiProvider } from "../../../network/apiProvider";
import LatestResults from "./LatestResults";
import BarChart from "./BarChart";

const childrenVariant: Variants = {
  initial: {
    x: -100,
  },
  animate: {
    x: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.3,
    },
  },
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashBoardStats | null>(
    null
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
    // <motion.main
    //   variants={childrenVariant}
    //   initial="intial"
    //   animate="animate"
    //   className="mt-5 mb-2 ml-2"
    // >
    //   <motion.div
    //     variants={childrenVariant}
    //     className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
    //   >
    //     <CardWrapper />
    //   </motion.div>
    //   <motion.div
    //     variants={childrenVariant}
    //     className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"
    //   >
    //     <motion.div variants={childrenVariant}>Latest test results</motion.div>

    //     <motion.div variants={childrenVariant}>Pie chart</motion.div>
    //   </motion.div>
    // </motion.main>
    <main className="grid gap-2 md:grid-cols-2 mt-5 mb-2 ml-2 p-5">
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
