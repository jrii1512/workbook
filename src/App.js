// App.js
import React, { useState } from "react";
import axios from "axios";
import ExcelReader from "./ExcelReader";
import writeToExcel from "./WriteToExcel";
import { useWk } from "./hooks/utils";
import "./App.css";
import Button from "@mui/material/Button";
import { useConfirm } from "material-ui-confirm";
import ConfirmationDialog from "./ConfirmationDialog";

function App() {
  /*<ExcelReader />*/
  const [file, setFile] = useState("");
  const [objective, setObjective] = useState("") 
  const [secondObjective, setSecondObjective] = useState("")
  const [alive, setAlive] = useState("")

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

  const confirm = useConfirm()

  const handleExport = () => {
    writeToExcel(arrData, file + ".xlsx", wkNumber);
  };

  const handleChange = (event) => {
    console.log("filename:", event.target.value);
    event.target.name === "file" ? setFile(event.target.value) : setFile("");
  };

  const testServer = async () => {
    const response = await axios.get("http://localhost:3001/alive");
    console.log(response.data);
    setAlive(response.data)
  };

  const onDialogClosed = () => {
    setAlive("")
  }

  return (
    <div className="App">

      <h1 className="App-title">Ylityö kirjaus systeemi</h1>

      <form className="App-form">
        <input
          type="text"
          placeholder="Exporttava fileen nimi"
          name="file"
          onChange={handleChange}
          value={file}
        ></input>

        <input
          type="text"
          placeholder="1. tavoite"
          name="tavoite"
          onChange={handleChange}
        ></input>

        <input
          type="text"
          placeholder="2. tavoite"
          name="file"
          onChange={handleChange}
        ></input>

        <div className="App-button">
          <Button onClick={handleExport}>Export</Button>
          <Button onClick={testServer}>Server - test</Button>
        </div>
      </form>
      {alive && <ConfirmationDialog data = {alive} title = "Alive" onClose={() => onDialogClosed()}/>}
    </div>
  );
}

export default App;
