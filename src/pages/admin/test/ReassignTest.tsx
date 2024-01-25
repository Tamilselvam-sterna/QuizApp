import { useEffect, useRef } from "react";
import TableComponent from "../../../components/Table";
import { Table } from "@mantine/core";
import Reassigned from "./Reassigned";
import { reassignStore } from "../../../app/reassignStore";
import TableHeader from "../../../components/TableHeader";
import ReassignFilter from "./ReassignFilter";

function ReassignTest() {
  const { data, page, search, isLoading, fetchData, setPage, setSearch } =
    reassignStore();
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    setSearch(searchRef.current!.value);
  };
  useEffect(() => {
    fetchData();
  }, [page, fetchData, search]);
  return (
    <div className="mb-2 ml-2 mt-5">
      <div>
        <TableHeader
          HeaderComponents={[<ReassignFilter />]}
          reference={searchRef}
          title="Re-Assign Test"
          onSubmit={handleSearch}
        />
      </div>
      <TableComponent
        isLoading={isLoading}
        columns={[
          "S.NO",
          "USER NAME",
          "EMAIL",
          "MOBILE",
          "POSITION",
          "TEST ASSIGNED",
          "ACTION",
        ]}
        from={data?.from}
        to={data?.to}
        total={data?.total}
        totalPages={data?.totalPages}
        currentPage={page}
        onPageChanged={setPage}
      >
        {data?.data?.map((value: any, index: any) => (
          <Table.Tr key={index}>
            <Table.Td>{data?.from + index}</Table.Td>
            <Table.Td>
              {value?.user?.firstName + " " + value?.user?.lastName}
            </Table.Td>
            <Table.Td>{value?.user?.email}</Table.Td>
            <Table.Td>{value?.user?.mobile}</Table.Td>
            <Table.Td>{value?.user?.userInfo[0].position?.position}</Table.Td>
            <Table.Td>
              {value?.user?.userTestDetails[0]?.test?.subject}
            </Table.Td>

            <Table.Td>
              <Reassigned
                user={value.userId}
                subject={value?.user?.userTestDetails[0].test?.id}
              />
            </Table.Td>
          </Table.Tr>
        ))}
      </TableComponent>
    </div>
  );
}

export default ReassignTest;
