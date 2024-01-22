import { BarChart as MantineBarChart } from "@mantine/charts";
import { SubjectStatsRes } from "../../../models/dashboard";

function BarChart({
  barChartData,
}: {
  barChartData: SubjectStatsRes[] | undefined;
}) {
  return (
    barChartData && (
      <div className="w-full md:col-span-2 lg:col-span-2">
        <h1 className="mb-4 text-xl md:text-2xl">Latest Results</h1>
        <MantineBarChart
          h={400}
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
