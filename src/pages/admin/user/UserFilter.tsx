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
import { testStore } from "../../../app/courseStore";

function UserFilter() {
  const [opened, { open, close }] = useDisclosure(false);
  const { data, fetchData: fetchPositions } = positionStore();
  const { data: subjectData, fetchData: fetchSubject } = testStore();
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
    setPage,
    fetchData: fetchUsers,
    isFilterApplied,
    reset,
    setIsFilterApplied,
    setStartDate,
    setEndDate,
    roleId,
    setRoleId,
  } = userStore();

  const newData = {
    id: 0,
    position: "All",
  };

  const Alldata = [newData, ...data.data];

  const subjectNewData = {
    id: 0,
    subject: "All",
  };

  const AllSubjectData = [subjectNewData, ...subjectData.data];
  const RoleNewData = {
    id: 0,
    role: "All",
  };
  const AllRoleData = [RoleNewData, ...roleData.data];

  function changeDay(value: string | null) {
    setDateFilter(value ?? "All");
  }

  function changePosition(value: string | null) {
    setPosition(value!);
  }
  function changeRole(value: string | null) {
    setRoleId(value!);
  }
  function changeSubject(value: string | null) {
    setSubjectId(value!);
  }
  function changeExperience(value: string | null) {
    setExperienceLevel(value!);
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
      fetchSubject();
      fetchRoles();
    }
  }, [opened]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={<div className="text-lg font-bold">User Filter</div>}
        radius={"lg"}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Select
          label="Role"
          value={roleId.toString()}
          placeholder="select role"
          data={AllRoleData.map((item) => ({
            value: String(item.id),
            label: item.role,
          }))}
          onChange={changeRole}
        />

        <Select
          label="ExperienceLevel"
          value={experienceLevel.toString()}
          placeholder="select Experience"
          data={experienceLevelData?.map((item) => ({
            value: String(item.value),
            label: item.label,
          }))}
          onChange={changeExperience}
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
          placeholder="select Subject"
          data={AllSubjectData?.map((item) => ({
            value: item.id.toString(),
            label: item?.subject,
          }))}
          onChange={changeSubject}
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
        {isFilterApplied ? "Clear Filter" : "Filter"}
      </Button>
    </>
  );
}

export default UserFilter;
