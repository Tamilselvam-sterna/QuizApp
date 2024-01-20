/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import TableHeader from "../../../components/TableHeader";
import TableComponent from "../../../components/Table";
import { Pagination, Table } from "@mantine/core";
import moment from "moment";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import { userStore } from "../../../app/userStore";
import UserFilter from "./UserFilter";

const HeaderComponents = [<UserFilter />, <CreateUser />];

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

function Users() {
  const { data, page, search, setPage, setSearch, isLoading, fetchData } =
    userStore();
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    console.log(data.data);
    setSearch(searchRef.current!.value);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, page, search]);

  return (
    <div className="mt-5 mb-2 ml-2">
      <div>
        <TableHeader
          reference={searchRef}
          title="Users"
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
          "ROLE",
          "POSITION",
          "COLLEGE",
          "DEGREE",
          "SPECIALIZATION",
          "EXPERIENCE LEVEL",
          "EXPERIENCE",
          "TEST ASSIGNED",
          "CREATED DATE AND TIME",
          "EDIT",
        ]}
        from={data?.from ?? 0}
        to={data?.to ?? 0}
        total={data?.total ?? 0}
        totalPages={data?.totalPages ?? 0}
        currentPage={page ?? 0}
        onPageChanged={setPage}
      >
        {data?.data?.map((value: any, index: any) => (
          <Table.Tr key={index}>
            <Table.Td>{data?.from + index}</Table.Td>
            <Table.Td>{value.firstName + " " + value.lastName}</Table.Td>
            <Table.Td>{value.email}</Table.Td>
            <Table.Td>{value.role.role}</Table.Td>
            {value.role.id == 3 ? (
              <>
                <Table.Td>
                  {value?.userInfo[0]?.position?.position ?? "NA"}
                </Table.Td>
                <Table.Td>{value?.userInfo[0]?.college ?? "NA"}</Table.Td>
                <Table.Td>{value?.userInfo[0]?.degree ?? "NA"}</Table.Td>
                <Table.Td>
                  {value?.userInfo[0]?.specialization ?? "NA"}
                </Table.Td>
                <Table.Td>
                  {value?.userInfo[0]?.isFresher ? "Fresher" : "Experienced"}
                </Table.Td>
                <Table.Td>
                  {value?.userInfo[0]?.isFresher
                    ? "NA"
                    : value?.userInfo[0]?.experience}
                </Table.Td>
                <Table.Td>
                  {value.userTestDetails[0]?.test.subject ?? "NA"}
                </Table.Td>
              </>
            ) : (
              <>
                <Table.Td>{"NA"}</Table.Td>
                <Table.Td>{"NA"}</Table.Td>
                <Table.Td>{"NA"}</Table.Td>
                <Table.Td>{"NA"}</Table.Td>
                <Table.Td>{"NA"}</Table.Td>
                <Table.Td>{"NA"}</Table.Td>
                <Table.Td>{"NA"}</Table.Td>
              </>
            )}
            <Table.Td className="min-w-max ">
              {moment(value.createdAt).format("MMMM Do YYYY, h:mm a")}
            </Table.Td>
            <Table.Td>{<UpdateUser item={value} />}</Table.Td>
          </Table.Tr>
        ))}
      </TableComponent>
    </div>
  );
}

export default Users;
