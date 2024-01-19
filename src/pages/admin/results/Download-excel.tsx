import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

function DownloadExcel() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Authentication"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
      </Modal>

      <Button onClick={open} color="gray">
        Download Excel
      </Button>
    </>
  );
}
export default DownloadExcel;
