import { DashBoardStats } from "../models/dashboard";

export function Card({
  title,
  value,
}: {
  title: string;
  value: number | string | null | undefined;
}) {
  return (
    <div className="border-primary-500 bg-primary-500 rounded-xl border border-solid p-2 shadow-sm">
      <div className="flex p-4">
        <h3 className="ml-2 text-sm font-medium text-white">
          {title ?? "None"}
        </h3>
      </div>
      <p
        className={`border-primary-500 truncate rounded-xl border border-solid  bg-white px-4 py-8 text-center text-2xl`}
      >
        {value ?? "None"}
      </p>
    </div>
  );
}

export default function CardWrapper({ data }: { data: DashBoardStats | null }) {
  return (
    <>
      <Card title="Total users" value={data?.totalUsers} />
      <Card title="Total courses" value={data?.totalSubjects} />
      <Card title="Completed users" value={data?.totalTestCompletedUsers} />
      <Card title="In-Complete users" value={data?.totalTestInCompleteUsers} />
    </>
  );
}
