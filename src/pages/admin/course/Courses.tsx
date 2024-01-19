/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import TableHeader from "../../../components/TableHeader";
import TableComponent from "../../../components/Table";
import { Button, Table } from "@mantine/core";
import CreateQuestion from "./questions/CreateQuestion";
import CreateCourse from "./CreateCourse";
import { Link } from "react-router-dom";
import { testStore } from "../../../app/TestStore";
import { IconEye } from "@tabler/icons-react";

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

function Courses() {
  const HeaderComponents = [<CreateCourse />];

  const { data, page, search, setPage, fetchData, setSearch, isLoading } =
    testStore();

  const searchRef = useRef<HTMLInputElement>(null);
  const handleSearch = () => {
    console.log("search" ?? "empty");
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
          title="Subjects"
          HeaderComponents={HeaderComponents}
          onSubmit={handleSearch}
        />
      </div>
      <TableComponent
        isLoading={isLoading}
        columns={["S.NO", "COURSE NAME", "ACTION"]}
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
            <Table.Td>{value.subject}</Table.Td>
            <Table.Td className="flex flex-row">
              <div className="mr-5">
                <CreateQuestion value={value} />
              </div>
              <div>
                <Link to={`/admin/courses/${value.id}`}>
                  <Button color="teal" variant="outline">
                    <IconEye />
                  </Button>
                </Link>
              </div>
            </Table.Td>
          </Table.Tr>
        ))}
      </TableComponent>
    </div>
  );
}

export default Courses;
