import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { viewQuestionsStore } from "../../../../app/viewQuestionStore";
import TableHeader from "../../../../components/TableHeader";
import TableComponent from "../../../../components/Table";
import { ActionIcon, Table } from "@mantine/core";
import UpdateQuestion from "./UpdateQuestion";
import { IconArrowLeft } from "@tabler/icons-react";
import AnimatedComponent from "../../../../components/AnimatedComponent";

function Questions() {
  const {
    fetchData,
    data,
    isLoading,
    page,
    setPage,
    search,
    setSearch,
    reset,
  } = viewQuestionsStore();
  const searchRef = useRef<HTMLInputElement>(null);
  const handleSearch = () => {
    setSearch(searchRef.current!.value);
  };
  const { id } = useParams();
  const title = (
    <div className="flex w-56 space-x-24">
      <Link to={"/subjects"}>
        <ActionIcon variant="filled" aria-label="Settings">
          <IconArrowLeft
            style={{ width: "90%", height: "90%", border: 10 }}
            stroke={1.5}
          />
        </ActionIcon>
      </Link>
      <>View Questions</>
    </div>
  );

  useEffect(() => {
    fetchData(id);
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
            title={title}
            HeaderComponents={[]}
            onSubmit={handleSearch}
          />
        </div>
        <TableComponent
          isLoading={isLoading}
          columns={["S.NO", "QUESTION", "ANSWER", "ACTION"]}
          from={data?.from ?? 0}
          to={data?.to ?? 0}
          total={data?.total ?? 0}
          totalPages={data?.totalPages ?? 0}
          currentPage={page}
          onPageChanged={setPage}
        >
          {data?.data?.map((value: any, index: any) => (
            <Table.Tr key={index}>
              <Table.Td>{data.from + index}</Table.Td>
              <Table.Td>{value.question}</Table.Td>
              {value.options
                .filter((item: any) => item.isCorrect == true)
                .map((value: any) => (
                  <Table.Td>{value.option}</Table.Td>
                ))}
              <Table.Td className="flex flex-row">
                <UpdateQuestion item={value} />
              </Table.Td>
            </Table.Tr>
          ))}
        </TableComponent>
      </div>
    </AnimatedComponent>
  );
}

export default Questions;
