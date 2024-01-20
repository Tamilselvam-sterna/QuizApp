import { BarChart as MantineBarChart } from "@mantine/charts";
import { DashBoardStats, SubjectStatsRes } from "../../../models/dashboard";

export const data = [
  { month: "January", Smartphones: 120, Laptops: 80, Tablets: 10 },
  { month: "February", Smartphones: 90, Laptops: 120, Tablets: 40 },
  { month: "March", Smartphones: 40, Laptops: 100, Tablets: 20 },
  { month: "April", Smartphones: 100, Laptops: 20, Tablets: 80 },
  { month: "May", Smartphones: 80, Laptops: 140, Tablets: 120 },
  { month: "June", Smartphones: 75, Laptops: 60, Tablets: 100 },
];

function BarChart({
  barChartData,
}: {
  barChartData: SubjectStatsRes[] | undefined;
}) {
  return (
    barChartData && (
      <div className="md:col-span-2 lg:col-span-2">
        <MantineBarChart
          h={300}
          data={barChartData}
          dataKey="subject"
          type="stacked"
          series={[
            { name: "totalUser", color: "violet.6" },
            { name: "testCompletedUser", color: "blue.6" },
            { name: "testInCompleteUser", color: "teal.6" },
          ]}
        />
      </div>
    )
  );
}

export default BarChart;
