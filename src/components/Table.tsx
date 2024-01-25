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
  isLoading = true,
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
            className="ml-0 mr-5 w-full whitespace-nowrap"
          >
            <Table.Thead className="border border-primary-400">
              <Table.Tr>
                {columns.map((heading, index) => (
                  <Table.Th key={index}>{heading}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody className="border border-primary-400">
              {isLoading ? (
                <TableSkeleton columns={columns} />
              ) : from > 0 ? (
                <>{children}</>
              ) : (
                <Table.Tr className="w-full">
                  <Table.Td colSpan={columns.length}>
                    <h3 className="mt-5 flex justify-center">No Data Found</h3>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </div>

      {total > 0 && (
        <div className="m-2 flex items-center justify-between pt-4">
          <div className="text-[15px] text-gray-700">
            Showing From {from} To {to} of {total} results
          </div>
          <Pagination
            radius="lg"
            color="gray"
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
