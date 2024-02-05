import { useDisclosure } from "@mantine/hooks";
import {
  Drawer,
  NumberInput,
  Select,
  Tooltip,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { DateInput } from "@mantine/dates";
import moment from "moment";
import { apiProvider } from "../../../network/apiProvider";
import { IconUserEdit } from "@tabler/icons-react";
import { userStore } from "../../../app/userStore";
import { positionStore } from "../../../app/positionStore";
import { UserResponse } from "../../../models/user";
import { Role } from "../../../utils/enum";
import { updateUserInput, updateUserSchema } from "../../../models/update-user";
import { zodResolver } from "mantine-form-zod-resolver";

function UpdateUser({ item }: { item: UserResponse }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data, fetchData: fetchPositionData } = positionStore();
  const { fetchData: fetchUserData } = userStore();
  const roleId = localStorage.getItem("roleId");

  const form = useForm<any>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      dob: "",
      college: "",
      degree: "",
      specialization: "",
      position: "",
      isFresher: "",
      yearsOfExperience: 1,
    },

    // validate: zodResolver(updateUserSchema),
    validateInputOnChange: true,
  });

  async function UpdateUser(values: typeof form.values) {
    let data;
    try {
      if (item.role.role === "User") {
        data = {
          userId: item.id,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          mobile: values.mobileNumber,
          roleId: item?.role?.role,
          dob: moment(values.date).format("YYYY-MM-DD"),
          college: values.college,
          degree: values.degree,
          specialization: values.specialization,
          positionId: +values.position,
          isFresher: values.isFresher == "1" ? true : false,
          yearsOfExperience:
            values.isFresher == "1" ? undefined : values.yearsOfExperience,
        };
      } else {
        data = {
          userId: item.id,
          firstName: values.firstName,
          lastName: values.lastName,

          email: values.email,
          mobile: values.mobileNumber,
          roleId: item?.role?.id,
        };
      }

      const result = await apiProvider.UpdateUsers(data);
      setIsLoading(true);
      if (result != null) {
        form.reset();
        fetchUserData();
        close();
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }
  function editUserData() {
    form.setFieldValue("roleId", item?.role?.role);
    form.setFieldValue("firstName", item.firstName);
    form.setFieldValue("lastName", item.lastName);
    form.setFieldValue("mobileNumber", item.mobile);
    form.setFieldValue("email", item.email);
    form.setFieldValue("college", item.userInfo[0]?.college);
    form.setFieldValue("degree", item.userInfo[0]?.degree);
    form.setFieldValue("specialization", item?.userInfo[0]?.specialization);
    form.setFieldValue("isFresher", item?.userInfo[0]?.isFresher ? "1" : "2");
    form.setFieldValue("dob", new Date(item.userInfo[0]?.dob));

    form.setFieldValue(
      "yearsOfExperience",
      item?.userInfo[0]?.yearsOfExperience,
    );
    form.setFieldValue("position", item.userInfo[0]?.position?.id.toString());
  }

  useEffect(() => {
    if (opened) {
      editUserData();
      fetchPositionData();
    }
  }, [opened, fetchUserData]);

  return (
    <>
      <Drawer
        offset={16}
        radius="md"
        size={"md"}
        opened={opened}
        onClose={close}
        title={<div className="text-lg font-bold">Edit User</div>}
        position="right"
      >
        <LoadingOverlay visible={isLoading} />

        <form onSubmit={form.onSubmit(UpdateUser)}>
          <TextInput
            disabled
            label="Role"
            withAsterisk
            {...form.getInputProps("roleId")}
          />
          <div className="flex flex-row justify-between">
            <TextInput
              label="First Name"
              placeholder="Enter Your FirstName"
              className="w-64"
              withAsterisk
              {...form.getInputProps("firstName")}
            />
            <TextInput
              label="Last Name"
              className="w-64"
              placeholder="Enter Your LastName"
              withAsterisk
              {...form.getInputProps("lastName")}
            />
          </div>

          <TextInput
            mt="sm"
            label="Email"
            placeholder="Enter Your Email"
            withAsterisk
            {...form.getInputProps("email")}
          />
          <TextInput
            mt="sm"
            label="Mobile Number"
            placeholder="Enter Your Mobile Number"
            withAsterisk
            {...form.getInputProps("mobileNumber")}
          />
          {item.role.role == "User" ? (
            <>
              <DateInput
                valueFormat="YYYY MMM DD"
                label="Date of Birth"
                placeholder="enter your date of birth"
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
                placeholder="Enter Your Degree"
                withAsterisk
                {...form.getInputProps("degree")}
              />
              <TextInput
                label="Specialization"
                placeholder="Enter Your specialization"
                withAsterisk
                {...form.getInputProps("specialization")}
              />

              <Select
                label="Experience Level"
                placeholder="Select your experience"
                data={[
                  { value: "1", label: "Fresher" },
                  { value: "2", label: "Experienced" },
                ]}
                withAsterisk
                {...form.getInputProps("isFresher")}
              />
              {form.values.isFresher === "2" ? (
                <NumberInput
                  label="Years of Experience"
                  placeholder="Enter Your Years of experience"
                  withAsterisk
                  {...form.getInputProps("yearsOfExperience")}
                />
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}

          <Button type="submit" color="teal" mt="sm" fullWidth>
            Submit
          </Button>
        </form>
      </Drawer>
      <Tooltip label="EditUser">
        {roleId == "1" || (roleId == "2" && item.role.id == "3") ? (
          <Button color="gray" onClick={open} variant="outline">
            <IconUserEdit />
          </Button>
        ) : (
          <Button color="gray" disabled onClick={open} variant="outline">
            <IconUserEdit />
          </Button>
        )}
      </Tooltip>
    </>
  );
}

export default UpdateUser;
