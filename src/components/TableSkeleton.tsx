import { Skeleton, Table } from "@mantine/core";

function TableSkeleton({ columns }: { columns: string[] }) {
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      {rows.map((rows) => (
        <Table.Tr key={rows}>
          {columns.map((column) => (
            <Table.Td key={column}>
              <div className="py-2">
                <Skeleton width={"80%"} height={8} radius="sm" />
              </div>
            </Table.Td>
          ))}
        </Table.Tr>
      ))}
    </>
  );
}

export default TableSkeleton;
