import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, FileButton, Select, ScrollArea } from "@mantine/core";
import * as XLSX from "xlsx";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { apiProvider } from "../../../network/apiProvider";
import { Group } from "@mantine/core";
import { userStore } from "../../../app/userStore";
import { showNotification } from "@mantine/notifications";

function UserBulkUpload() {
  const [opened, { open, close }] = useDisclosure(false);
  const [courseData, setCourseData] = useState("");
  const [position, setPosition] = useState("");
  const [file, setFile] = useState("");
  const { fetchData: fetchUser } = userStore();

  const form = useForm({
    initialValues: {
      courseName: "",
      positionName: "",
    },
  });
  const changeCourse = (val: any) => {
    form.setFieldValue("courseName", val);
  };
  const changePosition = (val: any) => {
    form.setFieldValue("positionName", val);
  };
  const fetchCourse = async () => {
    const data = {
      search: "",
      page: 0,
    };
    const result = await apiProvider.fetchAllCourses(data);
    if (result !== null) {
      console.log(result?.data.data);
      setCourseData(result?.data?.data ?? null);
    }
  };
  const fetchPosition = async () => {
    const data = {
      search: "",
      page: 0,
    };
    const result = await apiProvider.fetchAllPosition(data);
    if (result !== null) {
      console.log(result);
      setPosition(result?.data?.data ?? null);
    }
  };
  // async function onSubmit(values: typeof form.values) {
  //   const formData: any = new FormData();

  //   formData.append("file", file);
  //   formData.append("subjectId", +values.courseName);
  //   formData.append("positionId", +values.positionName);
  //   const result = await apiProvider.addUserUpload(formData);
  //   if (result !== null) {
  //     await fetchUser();
  //     close();
  //   }
  // }
  // Email validation function

  // Your component continues...

  async function onSubmit(values: typeof form.values) {
    const formData: any = new FormData();
    formData.append("file", file);
    formData.append("subjectId", +values.courseName);
    formData.append("positionId", +values.positionName);

    try {
      const readExcelFile = (file: any) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            try {
              const data = new Uint8Array(e.target.result);
              const workbook = XLSX.read(data, { type: "array" });
              resolve(workbook);
            } catch (error) {
              reject(error);
            }
          };
          reader.readAsArrayBuffer(file);
        });
      };
      const workbook: any = await readExcelFile(file);

      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      const validateEmail = (email: any) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      const validateMobile = (mobile: any) => {
        const mobileRegex = /^\d{10}$/;
        return mobileRegex.test(mobile);
      };
      console.log(sheetData);

      const invalidRows = [];
      for (let i = 0; i < sheetData.length; i++) {
        const row: any = sheetData[i];
        console.log(row);
        if (!validateEmail(row?.Email) || !validateMobile(row.Mobile)) {
          invalidRows.push(row?.Email);
        }
      }

      if (invalidRows.length) {
        showNotification({
          color: "red",
          title: "Incorrect format",
          message: `Email or mobile is not in correct format ${invalidRows.map((item: any) => item?.email)} `,
        });
        return;
      }

      const result = await apiProvider.addUserUpload(formData);
      if (result !== null) {
        await fetchUser();
        close();
      }
    } catch (error) {
      console.error("Error reading or validating Excel file:", error);
    }
  }

  function downloadExcel() {
    const report = [
      {
        FirstName: "Karthi",
        LastName: "K",
        Email: "user1@gmail.com",
        Mobile: "9003349165",
        DOB: "2000-01-21",
        College: "NGP",
        Degree: "B.E.",
        Specialization: "E.C.E",
      },
    ];
    const data: any = [];
    for (let i = 0; i < report?.length; i++) {
      const reports: any = report[i];
      data.push({
        FirstName: reports.FirstName ?? "None",
        LastName: reports.LastName ?? "None",
        Email: reports.Email ?? "None",
        Mobile: reports.Mobile ?? "None",
        DOB: reports.DOB,
        College: reports.College,
        Degree: reports.Degree,
        Specialization: reports.Specialization,
      });
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "demo_format.xlsx");
    }
  }

  useEffect(() => {
    (async function init() {
      if (opened) {
        await fetchCourse();
        await fetchPosition();
      }
    })();
  }, [opened]);

  return (
    <>
      <ScrollArea>
        <Modal
          opened={opened}
          onClose={close}
          size="lg"
          title="User upload"
          className="flex pl-5"
        >
          <form onSubmit={form.onSubmit(onSubmit)}>
            <div className="w-full">
              <Select
                label="Select Course"
                searchable
                {...form.getInputProps("courseName")}
                onChange={changeCourse}
                variant="filled"
                className="mb-5"
                placeholder="Select Course"
                data={
                  Array.isArray(courseData)
                    ? courseData.map((item: any) => ({
                        value: item.id.toString(),
                        label: item.subject || "",
                      }))
                    : []
                }
                withAsterisk
              />
              <Select
                label="Select Position"
                searchable
                {...form.getInputProps("positionName")}
                onChange={changePosition}
                variant="filled"
                className="mb-8"
                placeholder="Select Position"
                data={
                  Array.isArray(position)
                    ? position.map((item: any) => ({
                        value: item.id.toString(),
                        label: item.position || "",
                      }))
                    : []
                }
                withAsterisk
              />
              <Button
                className="mb-5 text-center font-medium"
                variant="filled"
                color="green"
                onClick={downloadExcel}
                fullWidth
              >
                Demo format
              </Button>
              <Group justify="center">
                <FileButton
                  onChange={(e: any) => setFile(e)}
                  accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                >
                  {(props) => <Button {...props}>UserBulkUpload</Button>}
                </FileButton>
              </Group>
              <div>
                <Button
                  type="submit"
                  fullWidth
                  className="mt-5"
                  color="grey"
                  variant="filled"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Modal>
      </ScrollArea>

      <Button onClick={open}>User Upload</Button>
    </>
  );
}
export default UserBulkUpload;
