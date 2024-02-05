import { useEffect, useRef } from "react";
import TableComponent from "../../../components/Table";
import { Table } from "@mantine/core";
import TableHeader from "../../../components/TableHeader";
import AnimatedComponent from "../../../components/AnimatedComponent";
import { positionStore } from "../../../app/positionStore";
import moment from "moment";
import CreatePosition from "./CreatePosition";
import UpdatePosition from "./UpdatePosition";

function position() {
  const {
    data,
    page,
    search,
    isLoading,
    fetchData,
    setPage,
    setSearch,
    reset,
  } = positionStore();
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    setSearch(searchRef.current!.value);
    setPage(1);
  };
  useEffect(() => {
    fetchData();
  }, [page, fetchData, search]);

  useEffect(() => {
    reset();
  }, []);
  return (
    <AnimatedComponent>
      <div className="mb-2 ml-2 mt-5">
        <div>
          <TableHeader
            reference={searchRef}
            title="Positions"
            onSubmit={handleSearch}
            HeaderComponents={[<CreatePosition />]}
          />
        </div>
        <TableComponent
          isLoading={isLoading}
          columns={["S.NO", "POSITION", "CREATEDAT"]}
          from={data?.from}
          to={data?.to}
          total={data?.total}
          totalPages={data?.totalPages}
          currentPage={page}
          onPageChanged={setPage}
        >
          {data?.data?.map((value, index: number) => (
            <Table.Tr key={index}>
              <Table.Td>{data?.from + index}</Table.Td>
              <Table.Td>{value?.position}</Table.Td>
              <Table.Td>
                {moment(value.createdAt).format("MMMM Do YYYY, h:mm a")}
              </Table.Td>
              <Table.Td>{<UpdatePosition value={value} />}</Table.Td>
            </Table.Tr>
          ))}
        </TableComponent>
      </div>
    </AnimatedComponent>
  );
}

export default position;
