/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import TableHeader from "../../../components/TableHeader";
import TableComponent from "../../../components/Table";
import { Button, Table } from "@mantine/core";
import apiClient from "../../../network/apiClient";
import CreateUser from "../user/CreateUser";
import CreateQuestion from "./questions/CreateQuestion";
import CreateCourse from "./CreateCourse";
import Questions from "./questions/Questions";
import { Link } from "react-router-dom";

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

function Courses() {
  const HeaderComponents = [<CreateCourse />];
  const [userData, setUserData] = useState<userDetailType>();

  const [page, setPage] = useState(1);
  const isLoading = false;
  const searchRef = useRef<HTMLInputElement>(null);
  const handleSearch = () => {
    console.log("search" ?? "empty");
  };
  const fetchAllUser = async () => {
    try {
      const params = {
        page: 1,
        search: "",
      };
      const response = await apiClient.get("/test", { params: params });
      if (response.data != null) {
        setUserData(response.data.data);
        console.log(userData);
      }
      console.log(userData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllUser();
  }, [page]);
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
        from={userData?.from ?? 0}
        to={userData?.to ?? 0}
        total={userData?.total ?? 0}
        totalPages={userData?.totalPages ?? 0}
        currentPage={page}
        onPageChanged={setPage}
      >
        {userData?.data?.map((value: any, index: any) => (
          <Table.Tr key={index}>
            <Table.Td>{index + 1}</Table.Td>
            <Table.Td>{value.subject}</Table.Td>
            <Table.Td className="flex flex-row">
              <div className="mr-5">
                <CreateQuestion value={value} />
              </div>
              <div>
                <Link to={`/admin/courses/${value.id}`}>
                  <Button>View QUestion</Button>
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
