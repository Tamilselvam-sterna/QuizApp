import { apiProvider } from "../../../network/apiProvider";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";

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
  function reassignTest() {
    open();
  }

  return (
    <>
      <Button
        leftSection={<IconPhoto size={14} />}
        color="teal"
        onClick={reassignTest}
        variant="outline"
      >
        Reassign
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size={"sm"}
      >
        <p>Are you sure you want to reassign the test?</p>
        <div className="flex justify-between mt-7">
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
