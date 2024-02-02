import { Button } from "@mantine/core";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { resultStore } from "../../../app/resultStore";
import moment from "moment";
import { showNotification } from "@mantine/notifications";

function ReportData() {
  const { data } = resultStore();
  const reports = data?.data ?? [];
  const downloadPdf = (reportData: any) => {
    const doc = new jsPDF("p", "pt", "a1");
    const content: Array<any>[] = [];
    if (!reportData.length) {
      showNotification({
        color: "red",
        title: "Sorry",
        message: "no data found",
      });
    } else {
      for (let index = 0; index < (reportData?.length ?? 0); index++) {
        const reports: any = (reportData ?? [])[index];
        content.push([
          index + 1,
          (reports.user.firstName ?? "None") +
            " " +
            (reports.user.lastName ?? "None"),
          reports.user.email ?? "None",
          reports.user.mobile ?? "None",
          reports.user.role.role,
          reports.user.userInfo[0]?.position?.position,
          reports.user.userInfo[0]?.degree,
          reports.user.userInfo[0]?.specialization,
          reports.score,
          reports.percentage,
          reports.test.subject,
          moment(reports.updatedAt).format("MMMM Do YYYY, h:mm a"),
        ]);
      }
      doc.text("user-report", 40, 30);
      doc.setFontSize(36);
      autoTable(doc, {
        head: [
          [
            "S.NO",
            "USER NAME",
            "EMAIL",
            "MOBILE NUMBER",
            "ROLE",
            "POSITION",
            "DEGREE",
            "SPECIALIZATION",
            "SCORE",
            "PERCENTAGE",
            "TEST ASSIGNED",
            "UPDATED DATE AND TIME",
          ],
        ],
        body: content,
        margin: {
          top: 50,
        },
        headStyles: {
          fillColor: [211, 211, 211],
          textColor: [0, 0, 0],
          lineWidth: 0.5,
          lineColor: [231, 231, 231],
        },
        bodyStyles: {
          lineWidth: 0.5,
          lineColor: [231, 231, 231],
          fillColor: [255, 255, 255],
        },
      });
      doc.save("user-report.pdf");
    }
  };

  function downloadExcel(reports: any) {
    const dataValues = [];
    if (!reports.length) {
      showNotification({
        color: "red",
        title: "Sorry",
        message: "no data found",
      });
    } else {
      for (let i = 0; i < (reports?.length ?? 0); i++) {
        const report: any = (reports ?? [])[i];
        dataValues.push({
          "S.NO": i + 1,
          "USER NAME":
            (report.user.firstName ?? "None") +
            " " +
            (report.user.lastName ?? "None"),
          EMAIL: report.user.email ?? "None",
          "MOBILE NUMBER": report.user.mobile ?? "None",
          ROLE: report.user.role.role,
          POSITION: report.user.userInfo[0]?.position?.position,
          DEGREE: report.user.userInfo[0]?.degree,
          SPECIALIZATION: report.user.userInfo[0]?.specialization,
          SCORE: report.score,
          PERCENTAGE: report.percentage,
          "TEST ASSIGNED": report.test.subject,
          "UPDATED DATE AND TIME": moment(report.updatedAt).format(
            "MMMM Do YYYY, h:mm a",
          ),
        });
      }
      const worksheet = XLSX.utils.json_to_sheet(dataValues);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "user-report.xlsx");
    }
  }

  const fetchReports = async (isExcel: any) => {
    isExcel ? downloadExcel(reports) : downloadPdf(reports);
  };

  return (
    <div className="flex space-x-4">
      <Button
        className="font-medium"
        variant="light"
        onClick={() => fetchReports(false)}
      >
        Download PDF
      </Button>
      <Button
        className="ml-2 font-medium"
        variant="light"
        color="orange"
        onClick={() => fetchReports(true)}
      >
        Download Excel
      </Button>
    </div>
  );
}
export default ReportData;
