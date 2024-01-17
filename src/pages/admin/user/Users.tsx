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

interface userDetailType {
  from: number;
  to: number;
  total: number;
  totalPages: number;
  data: userType[];
}
interface userType {
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
}

function Users() {
  const [userData, setUserData] = useState<any>();
  const Alluserdata = userStore();
  const [page, setPage] = useState(1);
  const isLoading = false;
  const searchRef = useRef<HTMLInputElement>(null);
  const handleSearch = () => {
    Alluserdata.setSearch(searchRef.current?.value);
  };

  useEffect(() => {
    Alluserdata.fetchAlluser();
  }, [Alluserdata.page, Alluserdata.search]);

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
          "TEST ASSIGNED",
          "CREATED DATE AND TIME",
          "EDIT",
        ]}
        from={Alluserdata?.AlluserData?.from ?? 0}
        to={Alluserdata?.AlluserData?.to ?? 0}
        total={Alluserdata?.AlluserData?.total ?? 0}
        totalPages={Alluserdata?.AlluserData?.totalPages ?? 0}
        currentPage={page}
        onPageChanged={Alluserdata.setPage}
      >
        {Alluserdata?.AlluserData?.data?.map((value: any, index: any) =>
          value?.role?.id == 1 ? (
            <></>
          ) : (
            <>
              <Table.Tr key={index}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{value.firstName + " " + value.lastName}</Table.Td>
                <Table.Td>{value.email}</Table.Td>
                <Table.Td>{value.role.role}</Table.Td>
                <Table.Td>
                  {value?.userInfo[0]?.position?.position ?? "NA"}
                </Table.Td>
                <Table.Td>{value?.userInfo[0]?.college ?? "NA"}</Table.Td>
                <Table.Td>{value?.userInfo[0]?.degree ?? "NA"}</Table.Td>
                <Table.Td>
                  {value?.userInfo[0]?.specialization ?? "NA"}
                </Table.Td>
                <Table.Td>{value?.userInfo[0]?.experience ?? "NA"}</Table.Td>
                <Table.Td>{value.userTestDetails[0]?.subject ?? "NA"}</Table.Td>
                <Table.Td>
                  {moment(value.createdAt).format("MMMM Do YYYY, h:mm a")}
                </Table.Td>
                <Table.Td>{<UpdateUser item={value} />}</Table.Td>
              </Table.Tr>
            </>
          )
        )}
      </TableComponent>
    </div>
  );
}

export default Users;
