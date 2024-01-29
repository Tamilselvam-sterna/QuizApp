import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Select } from "@mantine/core";
import { IconFilterStar } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import moment from "moment";
import { dateValue } from "../../../utils/constant";
import { percentageValue } from "../../../utils/constant";
import { resultStore } from "../../../app/resultStore";
import { positionStore } from "../../../app/positionStore";
import { testStore } from "../../../app/TestStore";

function ResultFilter() {
  const [opened, { open, close }] = useDisclosure(false);
  const {
    data,
    fetchData: fetchPositions,
    setPage: setPositionPage,
    reset: positionReset,
  } = positionStore();
  const { positionId, subjectId } = resultStore();
  const {
    data: subjectData,
    fetchData: fetchTestData,
    page: subjectPage,
    setPage: setSubjectPage,
    reset: subjectReset,
  } = testStore();

  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const startDates =
    value[0] != null ? moment(value[0]).format("YYYY-MM-DD") : undefined;
  const endDates =
    value[0] != null ? moment(value[1]).format("YYYY-MM-DD") : undefined;

  const {
    dateFilter,
    setDateFilter,
    percentage,
    setPage,
    isFilterApplied,
    reset,
    setIsFilterApplied,
    setStartDate,
    setEndDate,
    setPercentage,
    fetchData,
    setPosition,
    setSubject,
  } = resultStore();
  const newData = {
    id: 0,
    position: "All",
  };

  const Alldata = [newData, ...data.data];

  const subjectDatas = [{ id: 0, subject: "All" }, ...subjectData.data];

  function changeResultValue(value: string | null) {
    setPercentage(value ?? "All");
  }

  function changeDay(value: string | null) {
    setDateFilter(value ?? "All");
  }
  function changePosition(value: string | null) {
    setPosition(value!);
  }
  function changeSubject(value: string | null) {
    setSubject(value!);
  }
  function filterApplied() {
    setStartDate(startDates);
    setEndDate(endDates);
    setPage(1);
    fetchData();
    setIsFilterApplied(true);

    close();
  }

  function clearFilter() {
    reset();
    setValue([null, null]);
    fetchData();
    close();
  }

  useEffect(() => {
    if (opened) {
      setPositionPage(0);
      fetchPositions();
      positionReset();
      setSubjectPage(0);
      fetchTestData();
      subjectReset();
    }
  }, [opened]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Result Filter"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Select
          label="Percentage"
          value={percentage}
          data={percentageValue.map((day) => ({
            value: day.value,
            label: day.label,
          }))}
          onChange={changeResultValue}
        />
        <Select
          label="Position"
          value={positionId.toString()}
          placeholder="select position"
          data={Alldata.map((item) => ({
            value: String(item.id),
            label: item.position,
          }))}
          onChange={changePosition}
        />
        <Select
          label="Subject"
          value={subjectId.toString()}
          placeholder="select subject"
          data={subjectDatas.map((item) => ({
            value: String(item.id),
            label: item.subject,
          }))}
          onChange={changeSubject}
        />
        <Select
          label="Date Filter"
          value={dateFilter}
          data={dateValue.map((day) => ({
            value: day,
            label: day,
          }))}
          onChange={changeDay}
        />
        {dateFilter == "DateRange" ? (
          <DatePickerInput
            type="range"
            label="Pick dates range"
            placeholder="Pick dates range"
            value={value}
            onChange={(value) => setValue(value)}
          />
        ) : (
          <></>
        )}
        <div className="flex space-x-8">
          <Button className="mt-5" onClick={clearFilter} color="red">
            Clear Filter
          </Button>
          <Button className="mt-5" onClick={filterApplied} color="teal">
            Apply Filter
          </Button>
        </div>
      </Modal>

      <Button
        leftSection={<IconFilterStar />}
        onClick={open}
        variant="outline"
        color={isFilterApplied ? "gray" : "teal"}
      >
        {isFilterApplied ? "ClearFilter" : "Filter"}
      </Button>
    </>
  );
}

export default ResultFilter;
