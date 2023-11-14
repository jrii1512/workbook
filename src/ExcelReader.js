// ExcelReader.js
import React, { useState } from "react";
import * as XLSX from "xlsx";
const { getJsDateFromExcel } = require("excel-date-to-js") 
   

const ExcelReader = () => {
  const [e, setE] = useState([]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      workbook.SheetNames.forEach((sheet) => {
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        console.log(sheetData);
        setE(sheetData);
      });
    };

    reader.readAsBinaryString(file);
  };

  console.log("e:");
  console.log(e);

  let sum = 0;
  let newDate = ""
  let totalSum = e.map((alco, index) => {
    newDate = new Date(alco.Päivä)
    sum += parseInt(alco.Tuntimäärä);
    console.log(sum, index);
    console.log(e.length);
    if (index === e.length - 1) {
      return sum;
    }
  });

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFile} />
      {e.map((d) => (
        <table>
          <thead>
            <tr>
              <th>Harrastus</th>
              <th>Tuntimäärä</th>
              <th>Tunnit yhteensä</th>
              <th>Päivämäärä</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{d.Harrastus}</td>
              <td>{d.Tuntimäärä}</td>
              <td>{totalSum}</td>
              <td>{getJsDateFromExcel(d.Päivä).toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default ExcelReader;
