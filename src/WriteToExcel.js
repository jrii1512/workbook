import * as XLSX from "xlsx";

export default function writeToExcel(data, file = "noFile.txt", wkNumber) {
  const wb = XLSX.utils.book_new();
  const wsData = XLSX.utils.json_to_sheet(data);
  //var ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, wsData, wkNumber);
  XLSX.writeFile(wb, file);
}
