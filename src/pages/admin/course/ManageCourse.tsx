import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Tooltip, Select } from "@mantine/core";
import { testStore } from "../../../app/courseStore";
import { IconClipboardText } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { apiProvider } from "../../../network/apiProvider";
import { userStore } from "../../../app/userStore";

function ManageTest({ item }: any) {
  const [opened, { open, close }] = useDisclosure(false);
  const { data, fetchData: fetchPositionData, setPage, reset } = testStore();
  const roleId = localStorage.getItem("roleId");
  const { fetchData: fetchUserData } = userStore();
  const [assignedCourse, setAssignCourse] = useState(1);
  const { fetchData } = testStore();
  function modalClose() {
    setPage(1);
    close();
  }
  const handleSubmit = async () => {
    try {
      const assignData = {
        userId: item.id,
        subjectId: +assignedCourse,
      };
      const response = await apiProvider.assignTest(assignData);
      if (response != null) {
        close();
        fetchData();
        fetchUserData();
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (opened) {
      setPage(0);
      fetchPositionData();
    }
  }, [opened]);
  return (
    <>
      <Modal
        opened={opened}
        onClose={modalClose}
        title={<div className="text-lg font-bold">Assign Test</div>}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <>
          <div className="flex w-full flex-row justify-between">
            <Select
              className="w-full"
              required
              value={assignedCourse.toString()}
              label="Select Course"
              variant="filled"
              placeholder="Select Any One Course"
              data={data.data.map((item: any) => ({
                value: item?.id.toString(),
                label: item?.subject,
              }))}
              onChange={(value: any) => setAssignCourse(value)}
            />
          </div>
          <div className="mt-5">
            <Button onClick={handleSubmit} mt="sm" color="teal" fullWidth>
              Submit
            </Button>
          </div>
        </>
      </Modal>
      {!item.userTestDetails[0]?.test.subject && item.role.id == "3" ? (
        <Tooltip label="Manage Test">
          <Button type="submit" onClick={open} variant="outline" color="teal">
            <IconClipboardText />
          </Button>
        </Tooltip>
      ) : (
        <Tooltip label="Manage Test">
          <Button
            type="submit"
            onClick={open}
            variant="outline"
            disabled
            color="teal"
          >
            <IconClipboardText />
          </Button>
        </Tooltip>
      )}
    </>
  );
}
export default ManageTest;
