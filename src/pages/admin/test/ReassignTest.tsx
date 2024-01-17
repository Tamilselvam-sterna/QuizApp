import { useEffect, useState } from "react";
import { apiProvider } from "../../../network/apiProvider";
import TableComponent from "../../../components/Table";
import { Table } from "@mantine/core";
import Reassigned from "./Reassigned";

function ReassignTest() {
  const [data, setData] = useState(null);
  async function fetchReassign() {
    try {
      const result = await apiProvider.fetchReassignData({
        page: 1,
        search: "",
      });
      if (result !== null) {
        setData(result.data ?? []);
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchReassign();
    console.log(data);
  }, []);
  return (
    <TableComponent
      isLoading={false}
      columns={["S.NO", "EMAIL", "NAME", "MOBILE", "TEST ASSIGNED", "ACTION"]}
      from={data?.from}
      to={data?.to}
      total={data?.total}
      totalPages={data?.totalPages}
      currentPage={1}
      onPageChanged={() => {}}
    >
      {data?.data?.map((value, index) => (
        <Table.Tr key={index}>
          <Table.Td>{index + 1}</Table.Td>
          <Table.Td>{value?.user?.email}</Table.Td>
          <Table.Td>{value?.user?.firstName + value?.user?.lastName}</Table.Td>
          <Table.Td>{value?.user?.mobile}</Table.Td>
          <Table.Td>{value?.user?.userTestDetails[0].test?.subject}</Table.Td>
          <Table.Td>
            <Reassigned
              user={value.userId}
              subject={value?.user?.userTestDetails[0].test?.id}
            />
          </Table.Td>
        </Table.Tr>
      ))}
    </TableComponent>
  );
}

export default ReassignTest;
