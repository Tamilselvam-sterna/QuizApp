/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import TableHeader from "../../../components/TableHeader";
import TableComponent from "../../../components/Table";
import { Pagination, Table, Text } from "@mantine/core";
import moment from "moment";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import { userStore } from "../../../app/userStore";
import UserFilter from "./UserFilter";
import UserBulkUpload from "./userUpload";
import AnimatedComponent from "../../../components/AnimatedComponent";
import ManageTest from "../course/ManageCourse";

const HeaderComponents = [<UserBulkUpload />, <UserFilter />, <CreateUser />];

function Users() {
  const [activePage, setPages] = useState(1);

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
    <AnimatedComponent>
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
          "DATE OF BIRTH",
          "COLLEGE",
          "DEGREE",
          "SPECIALIZATION",
          "EXPERIENCE LEVEL",
          "YEARS OF EXPERIENCE",
          "TEST ASSIGNED",
          "CREATED DATE AND TIME",
          "EDIT",
        ]}
        from={data?.from ?? 0}
        to={data?.to ?? 0}
        total={data?.total ?? 0}
        totalPages={data?.totalPages ?? 0}
        currentPage={page}
        onPageChanged={setPage}
      >
        {data?.data?.map((value: any, index: any) =>
          value.role.id != 1 ? (
            <>
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
                    <Table.Td>{value?.userInfo[0]?.dob ?? "NA"}</Table.Td>
                    <Table.Td>{value?.userInfo[0]?.college ?? "NA"}</Table.Td>
                    <Table.Td>{value?.userInfo[0]?.degree ?? "NA"}</Table.Td>
                    <Table.Td>
                      {value?.userInfo[0]?.specialization ?? "NA"}
                    </Table.Td>
                    <Table.Td>
                      {value?.userInfo[0]?.isFresher
                        ? "Fresher"
                        : "Experienced"}
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
                <Table.Td>{<ManageTest item={value} />}</Table.Td>
              </Table.Tr>
            </>
          ) : (
            <></>
          ),
        )}
      </TableComponent>
    </AnimatedComponent>
  );
}

export default Users;
