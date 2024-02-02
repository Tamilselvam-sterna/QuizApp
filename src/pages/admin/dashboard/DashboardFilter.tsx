import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Select } from "@mantine/core";
import { IconFilterStar } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import moment from "moment";
import { dateValue } from "../../../utils/constant";
import { dashboardStore } from "../../../app/dashboardStore";

function DashboardFilter() {
  const [opened, { open, close }] = useDisclosure(false);

  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const startDates =
    value[0] != null ? moment(value[0]).format("YYYY-MM-DD") : undefined;
  const endDates =
    value[0] != null ? moment(value[1]).format("YYYY-MM-DD") : undefined;

  const {
    dateFilter,
    setDateFilter,
    isFilterApplied,
    reset,
    setIsFilterApplied,
    setStartDate,
    setEndDate,
    fetchData,
  } = dashboardStore();

  function changeDay(value: string | null) {
    setDateFilter(value ?? "All");
  }

  function filterApplied() {
    setStartDate(startDates);
    setEndDate(endDates);
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

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Dashboard Filter"
        radius={"lg"}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
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

        <div className="mt-2 flex w-full flex-col items-center justify-center gap-4 py-3">
          <div className="flex gap-10">
            <Button
              onClick={clearFilter}
              color="gray"
              variant="outline"
              radius="md"
            >
              Clear Filter
            </Button>
            <Button
              onClick={filterApplied}
              color="gray"
              variant="filled"
              radius="md"
            >
              Apply Filter
            </Button>
          </div>
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

export default DashboardFilter;
