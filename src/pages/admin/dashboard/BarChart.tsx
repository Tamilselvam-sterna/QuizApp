import { BarChart as MantineBarChart } from "@mantine/charts";
import { SubjectStatsRes } from "../../../models/dashboard";

function BarChart({
  barChartData,
}: {
  barChartData: SubjectStatsRes[] | undefined;
}) {
  return (
    <div className="w-full place-items-center  md:col-span-2 lg:col-span-2">
      <h1 className="mb-4 text-xl font-semibold tracking-wider md:text-2xl">
        Overall Statistics
      </h1>

      {barChartData && barChartData.length > 0 ? (
        <MantineBarChart
          h={500}
          data={barChartData}
          dataKey="subject"
          type="stacked"
          series={[
            { name: "totalUser", color: "violet.6" },
            { name: "testCompletedUser", color: "blue.6" },
            { name: "testInCompleteUser", color: "teal.6" },
          ]}
          xAxisProps={{ padding: { left: 30, right: 30 } }}
          yAxisProps={{ domain: [0, 600], padding: { top: 30, bottom: 30 } }}
          className="rounded-xl border border-solid border-gray-200"
        />
      ) : (
        <div className="flex items-center justify-center">No data found</div>
      )}
    </div>
  );
}

export default BarChart;
