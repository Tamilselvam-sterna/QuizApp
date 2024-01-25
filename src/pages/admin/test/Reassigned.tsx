import { apiProvider } from "../../../network/apiProvider";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Tooltip } from "@mantine/core";
import { FiRefreshCcw } from "react-icons/fi";

function Reassigned({ subject, user }: { subject: string; user: string }) {
  const [opened, { open, close }] = useDisclosure(false);

  async function reassignTest1() {
    const data = {
      userId: user,
      subjectId: subject,
    };

    const result = await apiProvider.reassignTest(data);
    if (result) {
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
        size={"sm"}
      >
        <p>Are you sure you want to reassign the test?</p>
        <div className="mt-7 flex justify-between">
          <Button color="red" onClick={close}>
            Cancel
          </Button>
          <Button color="teal" onClick={reassignTest1}>
            Yes
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default Reassigned;
