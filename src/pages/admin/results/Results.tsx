/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import TableHeader from "../../../components/TableHeader";
import TableComponent from "../../../components/Table";
import { Table } from "@mantine/core";
import moment from "moment";
import { resultStore } from "../../../app/resultStore";
import ReportData from "./Reports";

const HeaderComponents = [<ReportData />];
// interface userDetailType {
//   from: number;
//   to: number;
//   total: number;
//   totalPages: number;
//   data: userType[];
// }
// interface userType {
//   createdAt: string;
//   email: string;
//   firstName: string;
//   id: string;
//   lastName: string;
// }

function Results() {
  const { data, page, search, fetchData, setPage, setSearch, isLoading } =
    resultStore();

  const searchRef = useRef<HTMLInputElement>(null);
  const handleSearch = () => {
    setSearch(searchRef.current!.value);
  };

  useEffect(() => {
    fetchData();
  }, [page, fetchData, search]);
  return (
    <div className="mt-5 mb-2 ml-2 ">
      <div>
        <TableHeader
          reference={searchRef}
          title="Result"
          HeaderComponents={HeaderComponents}
          onSubmit={handleSearch}
        />
      </div>
      <TableComponent
        isLoading={isLoading}
        columns={[
          "S.NO",
          "USER NAME",
          "EMAIL",
          "MOBILE NUMBER",
          "ROLE",
          "POSITION",
          "DEGREE",
          "SPECIALIZATION",
          "SCORE",
          "PERCENTAGE",
          "TEST ASSIGNED",
          "UPDATED DATE AND TIME",
        ]}
        from={data?.from ?? 0}
        to={data?.to ?? 0}
        total={data?.total ?? 0}
        totalPages={data?.totalPages ?? 0}
        currentPage={page}
        onPageChanged={setPage}
      >
        {data?.data?.map((value: any, index: any) => (
          <Table.Tr key={index}>
            <Table.Td>{index + 1}</Table.Td>
            <Table.Td>{value.user.firstName}</Table.Td>
            <Table.Td>{value.user.email}</Table.Td>
            <Table.Td>{value.user.mobile}</Table.Td>
            <Table.Td>{value.user.role.role}</Table.Td>
            <Table.Td>
              {value.user.userInfo[0]?.position?.position ?? "NA"}
            </Table.Td>
            <Table.Td>{value.user.userInfo[0]?.degree ?? "NA"}</Table.Td>
            <Table.Td>
              {value.user.userInfo[0]?.specialization ?? "NA"}
            </Table.Td>
            <Table.Td>{value.score}</Table.Td>
            <Table.Td>{value.percentage}</Table.Td>
            <Table.Td>{value.test.subject}</Table.Td>
            <Table.Td>
              {moment(value.updatedAt).format("MMMM Do YYYY, h:mm a")}
            </Table.Td>
          </Table.Tr>
        ))}
      </TableComponent>
    </div>
  );
}

export default Results;
