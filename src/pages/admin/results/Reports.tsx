import { Button } from "@mantine/core";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { resultStore } from "../../../app/resultStore";
import moment from "moment";

function ReportData() {
  const { data, fetchData } = resultStore();
  const reports = data?.data ?? [];
  const downloadPdf = (reportss: any) => {
    const doc = new jsPDF("p", "pt", "a1");
    const content: Array<any>[] = [];
    for (let index = 0; index < (reportss?.length ?? 0); index++) {
      const reports: any = (reportss ?? [])[index];
      content.push([
        index + 1,
        reports.user.firstName ?? "None",
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
    doc.text("user_results", 40, 30);
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
    doc.save("user_results.pdf");
  };

  function downloadExcel(reports: any) {
    const datas: any = [];
    for (let i = 0; i < (reports?.length ?? 0); i++) {
      const report: any = (reports ?? [])[i];
      datas.push({
        "S.NO": i + 1,
        "USER NAME": report.user.firstName ?? "None",
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
          "MMMM Do YYYY, h:mm a"
        ),
      });
    }
    const worksheet = XLSX.utils.json_to_sheet(datas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "user_results.xlsx");
  }

  const fetchreports = async (isExcel: any) => {
    isExcel ? downloadExcel(reports) : downloadPdf(reports);
  };

  return (
    <>
      <Button
        className="font-medium"
        variant="light"
        onClick={() => fetchreports(false)}
      >
        Download Pdf
      </Button>
      <Button
        className="font-medium"
        variant="light"
        color="orange"
        onClick={() => fetchreports(true)}
      >
        Download Excel
      </Button>
    </>
  );
}
export default ReportData;
