import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Tooltip, Select } from "@mantine/core";
import { testStore } from "../../../app/TestStore";
import { IconClipboardText } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { positionStore } from "../../../app/positionStore";
import { apiProvider } from "../../../network/apiProvider";
import { viewQuestionsStore } from "../../../app/viewQuestionStore";
import { userStore } from "../../../app/userStore";

function ManageTest({ item }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { data, fetchData: fetchPositionData } = testStore();
  const { fetchData: fetchUserData } = userStore();

  const [assignedCourse, setAssignCourse] = useState(1);

  const { fetchData } = testStore();

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (opened) {
      fetchPositionData();
    }
  }, [opened]);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Assign Test"
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
              data={data.data.map((item) => ({
                value: item.id.toString(),
                label: item.subject,
              }))}
              onChange={(value) => setAssignCourse(value)}
            />
          </div>
          <div className="mt-5">
            <Button onClick={handleSubmit} mt="sm" color="teal" fullWidth>
              Submit
            </Button>
          </div>
        </>
      </Modal>
      <Tooltip label="Manage Test">
        <Button type="submit" onClick={open} variant="outline" color="teal">
          <IconClipboardText />
        </Button>
      </Tooltip>
    </>
  );
}
export default ManageTest;