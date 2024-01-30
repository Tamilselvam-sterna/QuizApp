import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import apiClient from "../../../network/apiClient";
import { zodResolver } from "mantine-form-zod-resolver";
import { positionStore } from "../../../app/positionStore";
import { z } from "zod";
import { IconPlus } from "@tabler/icons-react";

const createPositionSchema = z.object({
  positionName: z
    .string()
    .min(1, "subject name minimum one character required"),
});

function CreatePosition() {
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
        position: values.positionName,
      };
      const response = await apiClient.post("/position", positionData);
      if (response != null) {
        close();
        form.reset();
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Add Position"
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
      <Button
        onClick={open}
        variant="outline"
        color="teal"
        leftSection={<IconPlus />}
      >
        Add Position
      </Button>
    </>
  );
}
export default CreatePosition;
