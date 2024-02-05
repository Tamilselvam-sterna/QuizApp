import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Tooltip } from "@mantine/core";
import { useForm } from "@mantine/form";
import apiClient from "../../../network/apiClient";
import { zodResolver } from "mantine-form-zod-resolver";
import { positionStore } from "../../../app/positionStore";
import { z } from "zod";
import { IconEditCircle, IconPlus, IconUserEdit } from "@tabler/icons-react";
import { useEffect } from "react";

const createPositionSchema = z.object({
  positionName: z
    .string()
    .min(1, "subject name minimum one character required"),
});

function UpdatePosition({ value }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { fetchData } = positionStore();

  const form = useForm({
    initialValues: {
      positionName: "",
    },
    validate: zodResolver(createPositionSchema),
  });
  const handleSubmit = async (values: typeof form.values) => {
    try {
      const positionData = {
        positionId: +value.id,
        position: values.positionName,
      };
      const response = await apiClient.patch("/position", positionData);
      if (response != null) {
        close();
        form.reset();
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    form.setFieldValue("positionName", value.position);
  }, []);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Edit Position"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <>
            <div className="flex w-full flex-row justify-between">
              <TextInput
                label="Position Name"
                placeholder="Position Name"
                className="mb-1 mr-2 w-full"
                {...form.getInputProps("positionName")}
              />
            </div>
            <div>
              <Button type="submit" mt="sm" color="teal" fullWidth>
                Submit
              </Button>
            </div>
          </>
        </form>
      </Modal>
      {/* <Button
        onClick={open}
        variant="outline"
        color="teal"
        leftSection={<IconPlus />}
      >
        Add Position
      </Button> */}
      <Tooltip label="UpdatePosition">
        <Button color="gray" onClick={open} variant="outline">
          <IconEditCircle />
        </Button>
      </Tooltip>
    </>
  );
}
export default UpdatePosition;
