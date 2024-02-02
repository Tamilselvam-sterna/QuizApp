import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Select } from "@mantine/core";
import { IconFilterStar } from "@tabler/icons-react";
import { positionStore } from "../../../app/positionStore";
import { DatePickerInput } from "@mantine/dates";
import { userStore } from "../../../app/userStore";
import { useEffect, useState } from "react";
import moment from "moment";
import { roleStore } from "../../../app/roleStore";
import { dateValue, experienceLevelData } from "../../../utils/constant";

function UserFilter() {
  const [opened, { open, close }] = useDisclosure(false);
  const { data, fetchData: fetchPositions } = positionStore();
  const { fetchData: fetchRoles, data: roleData } = roleStore();
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const startDates =
    value[0] != null ? moment(value[0]).format("YYYY-MM-DD") : undefined;
  const endDates =
    value[0] != null ? moment(value[1]).format("YYYY-MM-DD") : undefined;

  const {
    dateFilter,
    setDateFilter,
    setPosition,
    setExperienceLevel,
    positionId,
    experienceLevel,
    subjectId,
    setSubjectId,
    roleId,
    setRoleId,
    setPage,
    fetchData: fetchUsers,
    isFilterApplied,
    reset,
    setIsFilterApplied,
    setStartDate,
    setEndDate,
  } = userStore();

  const newData = {
    id: 0,
    position: "All",
  };

  const Alldata = [newData, ...data.data];

  const roleNewData = {
    id: 0,
    role: "All",
  };

  const AllRoleData = [roleNewData, ...roleData.data];

  function changeDay(value: string | null) {
    setDateFilter(value ?? "All");
  }

  function changePosition(value: string | null) {
    setPosition(value!);
  }
  function changeSubject(value: string | null) {
    setPosition(value!);
  }
  function changeExperience(value: string | null) {
    setPosition(value!);
  }

  function changeRole(value: string | null) {
    setRoleId(value!);
  }

  function filterApplied() {
    setStartDate(startDates);
    setEndDate(endDates);
    setPage(1);
    setIsFilterApplied(true);
    fetchUsers();
    close();
  }

  function clearFilter() {
    reset();
    setValue([null, null]);
    fetchUsers();
    close();
  }

  useEffect(() => {
    if (opened) {
      fetchPositions();
      fetchRoles();
    }
  }, [opened]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="UserFilter"
        radius={"lg"}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
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
          placeholder="select Subject"
          data={Alldata.map((item) => ({
            value: String(item.id),
            label: item.position,
          }))}
          onChange={changeSubject}
        />
        <Select
          label="ExperienceLevel"
          value={experienceLevel.toString()}
          placeholder="select Experience"
          data={experienceLevelData?.map((item) => ({
            value: String(item.id),
            label: item.experience,
          }))}
          onChange={changeExperience}
        />
        <Select
          label="Role"
          value={roleId.toString()}
          placeholder="select Role"
          data={AllRoleData.map((item) => ({
            value: String(item.id),
            label: item?.role,
          }))}
          onChange={changeRole}
        />
        <Select
          label="DateFilter"
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

        <div className="flex flex-col items-center justify-center w-full gap-4 py-3 mt-2">
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
        {isFilterApplied ? "Clear Filter" : "Filter"}
      </Button>
    </>
  );
}

export default UserFilter;
