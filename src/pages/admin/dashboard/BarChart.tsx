import { BarChart, Card, Title } from "@tremor/react";

const chartdata2 = [
  {
    name: "Javascript",
    "Total users": 890,
    "Completed users": 338,
    "In-complete users": 538,
  },
  {
    name: "Flutter",
    "Total users": 890,
    "Completed users": 338,
    "In-complete users": 538,
  },
  {
    name: "Embedded",
    "Total users": 890,
    "Completed users": 338,
    "In-complete users": 538,
  },
];

const valueFormatter = (number: any) =>
  `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

export default () => (
  <Card>
    <Title>Overall statistics</Title>
    <BarChart
      className="mt-6"
      data={chartdata2}
      index="name"
      categories={["Total users", "Completed users", "In-complete users"]}
      colors={["blue", "teal", "amber", "rose", "indigo", "emerald"]}
      valueFormatter={valueFormatter}
      yAxisWidth={70}
      layout="vertical"
      showAnimation
    />
  </Card>
);
