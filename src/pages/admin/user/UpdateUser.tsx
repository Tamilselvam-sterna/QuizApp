import { useDisclosure } from "@mantine/hooks";
import { Drawer, Select, Tooltip } from "@mantine/core";
import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { useEffect } from "react";
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
  const { data, fetchData: fetchPositionData } = positionStore();
  const { fetchData: fetchUserData } = userStore();

  const form = useForm<any>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      firstName: "",
      lastName: "",
      mobileNumber: "",
      position: "",
      specialization: "",
      college: "",
      dob: "",
      experience: "",
      degree: "",
      isExperience: "",
    },

    validate: zodResolver(updateUserSchema),
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
          isFresher: values.isexperience == "1" ? true : false,
          isExperience: values.isexperience == "2" ? true : false,
          experience:
            values.isexperience == "1" ? undefined : values.experience,
        };
      } else {
        data = {
          userId: item.id,
          firstName: values.firstname,
          lastName: values.lastname,
          email: values.email,
          mobile: values.mobilenumber,
          roleId: item?.role?.id,
        };
      }

      const result = await apiProvider.UpdateUsers(data);
      if (result != null) {
        form.reset();
        fetchUserData();
        close();
      }
    } catch (e) {
      console.log(e);
    }
  }
  function editUserData() {
    form.setFieldValue("roleId", item?.role?.role);
    form.setFieldValue("firstName", item.firstName);
    form.setFieldValue("lastName", item.lastName);
    form.setFieldValue("mobile", item.mobile);
    form.setFieldValue("email", item.email);
    form.setFieldValue("college", item.userInfo[0]?.college);
    form.setFieldValue("degree", item.userInfo[0]?.degree);
    form.setFieldValue("specilization", item?.userInfo[0]?.specialization);
    form.setFieldValue(
      "isexperience",
      item?.userInfo[0]?.isFresher === true ? "1" : "2",
    );
    form.setFieldValue("dob", new Date(item.userInfo[0]?.dob));

    form.setFieldValue("experience", item?.userInfo[0]?.experience);
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
        offset={8}
        radius="md"
        opened={opened}
        onClose={close}
        title="Edit User"
        position="right"
      >
        <form onSubmit={form.onSubmit(UpdateUser)}>
          <TextInput
            disabled
            label="Type of User"
            {...form.getInputProps("roleId")}
          />
          <div className="flex flex-row justify-between">
            <TextInput
              label="First Name"
              placeholder="Enter Your FirstName"
              className="w-64"
              {...form.getInputProps("firstName")}
            />
            <TextInput
              label="Last Name"
              className="w-64"
              placeholder="Enter Your LastName"
              {...form.getInputProps("lastName")}
            />
          </div>

          <TextInput
            mt="sm"
            label="Email"
            placeholder="Enter Your Email"
            {...form.getInputProps("email")}
          />
          <TextInput
            mt="sm"
            label="Mobile Number"
            placeholder="Enter Your Mobile Number"
            {...form.getInputProps("mobileNumber")}
          />
          {item.role.role == "User" ? (
            <>
              <DateInput
                valueFormat="YYYY MMM DD"
                label="Date of Birth"
                placeholder="enter your date of birth"
                {...form.getInputProps("dob")}
              />

              <TextInput
                label="College"
                placeholder="Enter College Name"
                {...form.getInputProps("college")}
              />
              <TextInput
                label="Degree"
                placeholder="Enter Your Degree"
                {...form.getInputProps("degree")}
              />
              <TextInput
                label="Specialization"
                placeholder="Enter Your specialization"
                {...form.getInputProps("specialization")}
              />

              <Select
                label="Experience Level"
                placeholder="Select your experience"
                data={[
                  { value: "1", label: "Fresher" },
                  { value: "2", label: "Experienced" },
                ]}
                {...form.getInputProps("isFresher")}
              />
              {form.values.isexperience === "2" ? (
                <TextInput
                  label="Years of Experience"
                  placeholder="Enter Your Years of experience"
                  {...form.getInputProps("experience")}
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
        <Button color="gray" onClick={open} variant="outline">
          <IconUserEdit />
        </Button>
      </Tooltip>
    </>
  );
}

export default UpdateUser;
