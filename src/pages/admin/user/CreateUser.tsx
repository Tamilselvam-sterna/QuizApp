import { useDisclosure } from "@mantine/hooks";
import {
  Button,
  TextInput,
  Select,
  Drawer,
  Tooltip,
  NumberInput,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import "@mantine/dates/styles.css";
import { DateInput } from "@mantine/dates";
import "@mantine/core/styles/UnstyledButton.css";
import "@mantine/core/styles/Button.css";
import { useEffect, useState } from "react";
import { apiProvider } from "../../../network/apiProvider";
import { Role } from "../../../utils/enum";
import { userStore } from "../../../app/userStore";
import { positionStore } from "../../../app/positionStore";
import { roleStore } from "../../../app/roleStore";
import { IconUserPlus } from "@tabler/icons-react";
import moment from "moment";
import { CreateUserInput, createUserSchema } from "../../../models/create-user";
import { zodResolver } from "mantine-form-zod-resolver";

function CreateUser() {
  const {
    data,
    fetchData: fetchPositionData,
    setPage: setpositionPage,
    reset,
  } = positionStore();
  const { data: datas, fetchData: fetchRoleData } = roleStore();
  const { fetchData: fetchUserData } = userStore();
  const [isLoading, setIsLoading] = useState(false);

  const [opened, { open, close }] = useDisclosure(false);
  const userid = localStorage.getItem("roleId");
  const form = useForm<CreateUserInput>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      dob: new Date(),
      degree: "",
      college: "",
      specialization: "",
      roleId: Role.User || Role.Admin,
      positionId: "",
      yearsOfExperience: 1,
      isFresher: "",
    },
    validate: zodResolver(createUserSchema),
    validateInputOnChange: true,
  });

  const handleSubmit = async (values: typeof form.values) => {
    let userData;
    try {
      if (values.roleId === Role.SuperAdmin || values.roleId === Role.Admin) {
        userData = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          mobile: values.mobile,
          roleId: Number(values.roleId),
        };
      } else {
        userData = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          mobile: values.mobile,
          degree: values.degree,
          college: values.college,
          specialization: values.specialization,
          roleId: Number(values.roleId),
          dob: moment(values.dob).format("YYYY-MM-DD"),
          positionId: Number(values.positionId),
          isFresher: values.isFresher == "1" ? true : false,
          yearsOfExperience:
            values.isFresher == "2" ? values.yearsOfExperience : undefined,
        };
      }

      const response = await apiProvider.addUserData(userData);
      setIsLoading(true);
      if (response != null) {
        form.reset();
        close();
        fetchUserData();
        reset();
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (opened) {
      setpositionPage(0);
      fetchPositionData();
      fetchRoleData();
    }
  }, [opened, fetchUserData]);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title={<h2 className="text-lg font-bold">Add User</h2>}
        position="right"
        size={"md"}
        offset={16}
        radius="md"
      >
        <LoadingOverlay visible={false} />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <>
            <Select
              label="Role"
              placeholder="Select Role"
              data={
                Role.Admin == userid
                  ? [{ value: "3", label: "User" }]
                  : datas?.data.map((item) => ({
                      value: item.id.toString(),
                      label: item.role,
                    }))
              }
              className="mb-1 w-full"
              withAsterisk
              {...form.getInputProps("roleId")}
            />
            <div className="flex w-full flex-row justify-between">
              <TextInput
                label="First Name"
                placeholder="Enter First Name"
                className="mb-1 mr-2 w-full"
                withAsterisk
                {...form.getInputProps("firstName")}
              />
              <TextInput
                label="Last Name"
                placeholder="Enter Last Name"
                className="mb-1 w-full"
                withAsterisk
                {...form.getInputProps("lastName")}
              />
            </div>
            <TextInput
              mt="sm"
              label="Email"
              placeholder="Enter Email"
              className="mb-1 w-full"
              withAsterisk
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Mobile Number"
              placeholder="Enter Mobile Number"
              className="mb-1 w-full"
              withAsterisk
              {...form.getInputProps("mobile")}
            />

            {form.values.roleId == "3" ? (
              <>
                <DateInput
                  valueFormat="YYYY MMM DD"
                  label="Date of Birth"
                  placeholder="Select Date of Birth"
                  withAsterisk
                  {...form.getInputProps("dob")}
                />
                <TextInput
                  label="College"
                  placeholder="Enter College Name"
                  withAsterisk
                  {...form.getInputProps("college")}
                />
                <TextInput
                  label="Degree"
                  placeholder="Enter Degree"
                  withAsterisk
                  {...form.getInputProps("degree")}
                />
                <TextInput
                  label="Specialization"
                  placeholder="Enter Specialization"
                  withAsterisk
                  {...form.getInputProps("specialization")}
                />
                <Select
                  label="Position"
                  placeholder="Select Position"
                  data={data.data.map((item) => ({
                    value: String(item.id),
                    label: item.position,
                  }))}
                  withAsterisk
                  {...form.getInputProps("positionId")}
                />
                <Select
                  label="Work Experience"
                  placeholder="Select Work Experience"
                  data={[
                    { value: "1", label: "Fresher" },
                    { value: "2", label: "Experienced" },
                  ]}
                  className="mb-1 w-full"
                  withAsterisk
                  {...form.getInputProps("isFresher")}
                />
                {form.values.isFresher == "2" ? (
                  <>
                    <NumberInput
                      min={1}
                      max={99}
                      label="Years Of Experience"
                      placeholder="Enter Years of Experience"
                      className="mr-4 w-full"
                      withAsterisk
                      {...form.getInputProps("yearsOfExperience")}
                    />
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            <Button type="submit" color="teal" mt="sm" fullWidth>
              Add User
            </Button>
          </>
        </form>
      </Drawer>

      <Tooltip label="Add User">
        <Button onClick={open} color="teal" variant="outline">
          <IconUserPlus color="teal" />
        </Button>
      </Tooltip>
    </>
  );
}

export default CreateUser;
