import { Skeleton } from "@mantine/core";

function TableSkeleton({ columns }: { columns: string[] }) {
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      {rows.map((rows) => (
        <tr key={rows}>
          {columns.map((column) => (
            <td key={column}>
              <Skeleton width={"100%"} height={10} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default TableSkeleton;
