// App.js
import React, { useState } from "react";
import axios from "axios";
import ExcelReader from "./ExcelReader";
import writeToExcel from "./WriteToExcel";
import { useWk } from "./hooks/utils";

function App() {
  /*<ExcelReader />*/
  const [file, setFile] = useState("");
  const startDay = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const wkNumber = useWk();

  const arrData = [
    [],
    [],
    ["Työtehtävät:"],
    [
      "Tukipyyntöjen selvittäminen",
      "Asennukset & päivitykset",
      "Dokumentointi",
    ],
    [],
    ["Viikko numero " + wkNumber],
    [
      startDay + "." + month,
      new Date().getDate() + 1 + "." + month,
      new Date().getDate() + 2 + "." + month,
      new Date().getDate() + 3 + "." + month,
      new Date().getDate() + 4 + "." + month,
    ],
    [],
    ["Poikkeama 7.5 tunnista: "],
    [0, 0, 0, 0, 0],
  ];

  const handleExport = () => {
    writeToExcel(arrData, file, wkNumber);
  };

  const handleChange = (event) => {
    console.log("filename:", event.target.value);
    setFile(event.target.value);
  };

  const testServer = async () => {
    const response = await axios.get("http://localhost:3001/alive");
    console.log(response);
  };

  return (
    <div className="App">
      <h1>Excel generaattori</h1>

      <form onSubmit={handleExport}>
        <label>File</label>
        <input type="text" name="file" onChange={handleChange}></input>
      </form>

      <button onClick={handleExport}>Export</button>
      <p></p>
      <button onClick={testServer}>Server - test</button>
    </div>
  );
}

export default App;
