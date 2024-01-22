import clsx from "clsx";
import { DashBoardStats } from "../models/dashboard";

interface CardProps extends React.HTMLProps<HTMLDivElement> {}

export function Card({ title, value, className: bgColor, ...rest }: CardProps) {
  return (
    <div
      {...rest}
      className={clsx(
        `flex flex-col  justify-between rounded-xl p-2 shadow-sm`,
        bgColor,
      )}
    >
      <div className="py-2">
        <h3 className="text-base font-bold uppercase tracking-wider text-white">
          {title ?? "None"}
        </h3>
      </div>
      <p
        className={`truncate rounded-md bg-white py-6 text-center text-3xl font-bold`}
      >
        {value ?? "None"}
      </p>
    </div>
  );
}

export default function CardWrapper({ data }: { data: DashBoardStats | null }) {
  return (
    <>
      <Card
        className="bg-cyan-600"
        title="Total users"
        value={data?.totalUsers}
      />
      <Card
        className="bg-emerald-600"
        title="Test assigned users"
        value={data?.totalTestAssignedUsers}
      />
      <Card
        className="bg-amber-500"
        title="Total courses"
        value={data?.totalSubjects}
      />
      <Card
        className="bg-slate-500"
        title="Completed users"
        value={data?.totalTestCompletedUsers}
      />
      <Card
        className="bg-teal-700"
        title="In-Complete users"
        value={data?.totalTestInCompleteUsers}
      />
    </>
  );
}
