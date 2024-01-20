import { Pagination, ScrollArea, Table } from "@mantine/core";
import TableSkeleton from "./TableSkeleton";

interface TableProps {
  isLoading: boolean;
  columns: string[];
  from: number;
  to: number;
  total: number;
  totalPages: number;
  children: React.ReactNode;
  currentPage: number;
  onPageChanged: (page: number) => void;
}

function TableComponent({
  isLoading,
  columns,
  from,
  to,
  total,
  totalPages,
  children,
  currentPage,
  onPageChanged,
}: TableProps) {
  return (
    <section>
      <div className="m-2">
        <ScrollArea className="w-full">
          <Table
            withColumnBorders
            highlightOnHover
            withRowBorders
            withTableBorder
            stickyHeader
            horizontalSpacing="xl"
            className="w-full ml-0 mr-5 whitespace-nowrap"
          >
            <Table.Thead className="border-2 border-black">
              <Table.Tr>
                {columns.map((heading, index) => (
                  <Table.Th key={index}>{heading}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody className="border-2 border-black">
              {isLoading ? (
                <TableSkeleton columns={columns} />
              ) : (
                <>{children}</>
              )}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </div>

      {total > 0 && (
        <div className="flex items-center justify-between pt-4 m-2">
          <div className="text-gray-700 text-[15px]">
            Showing From {from} To {to} of {total} results
          </div>
          <Pagination
            radius="lg"
            total={isLoading ? 1 : totalPages}
            value={isLoading ? 0 : currentPage}
            onChange={isLoading ? () => {} : onPageChanged}
          />
        </div>
      )}
    </section>
  );
}

export default TableComponent;
