import clsx from "clsx";
import { LastestResultsRes } from "../../../models/dashboard";

function LatestResults({ data }: { data: LastestResultsRes[] | undefined }) {
  const now = new Date();

  return (
    <div className="flex w-full flex-col md:col-span-2 lg:col-span-2">
      <h1 className="mb-4 text-xl md:text-2xl">Latest Results</h1>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {data?.map((result, i) => {
            return (
              <div
                key={result.id}
                className={clsx(
                  "flex flex-row items-center justify-evenly py-4",
                  {
                    "border-t": i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {`${result.user.firstName} ${result.user.lastName}`}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {result.user.email}
                    </p>
                  </div>
                </div>

                <p className="truncate text-sm font-medium md:text-base">
                  {`${result.percentage}/100`}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <h3 className="ml-2 text-sm text-gray-500 ">{`Update at- ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`}</h3>
        </div>
      </div>
    </div>
  );
}

export default LatestResults;
