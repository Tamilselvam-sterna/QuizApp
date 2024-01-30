import { apiProvider } from "../../../network/apiProvider";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Tooltip } from "@mantine/core";
import { FiRefreshCcw } from "react-icons/fi";
import { reassignStore } from "../../../app/reassignStore";

function Reassigned({ subject, user }: { subject: string; user: string }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { fetchData } = reassignStore();

  async function reassignTest1() {
    const data = {
      userId: user,
      subjectId: subject,
    };

    const result = await apiProvider.reassignTest(data);
    if (result) {
      fetchData();
      close();
    }
  }

  return (
    <>
      <Tooltip label="Reassign Test">
        <Button onClick={open} color="teal" variant="outline">
          <FiRefreshCcw color="teal" className="h-5 w-5" />
        </Button>
      </Tooltip>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        size={"sm"}
      >
        <div className="flex w-full flex-col items-center justify-center gap-4 py-2">
          <div>Are you sure do you want to reassign test?</div>
          <div className="flex gap-4">
            <Button onClick={close} color="gray" variant="outline" radius="md">
              cancel
            </Button>
            <Button
              onClick={reassignTest1}
              color="gray"
              variant="filled"
              radius="md"
            >
              reassign
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Reassigned;
