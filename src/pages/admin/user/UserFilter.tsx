import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";

function UserFilter() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="UserFilter"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        {/* Modal content */}
      </Modal>

      <Button leftSection={<IconFilter />} onClick={open} color="teal">
        Filter
      </Button>
    </>
  );
}

export default UserFilter;
