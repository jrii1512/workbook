// App.js
import React, { useState } from "react";
import axios from "axios";
import ExcelReader from "./ExcelReader";
import writeToExcel from "./WriteToExcel";
import { useWk } from "./hooks/utils";
import "./App.css";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

import { useConfirm } from "material-ui-confirm";
import ConfirmationDialog from "./ConfirmationDialog";

function App() {
  /*<ExcelReader />*/
  const [file, setFile] = useState(null);
  const [pvm, setPVM] = useState(null);
  const [poikkeama, setPoikkeama] = useState(null);
  const [selite, setSelite] = useState(null)
  const [alive, setAlive] = useState("");

  console.log("pvm:", pvm);

  const startDay = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const wkNumber = useWk();

  const arrData = [
    [],
    [],
    ["Työtehtävät:"],
    ["Tukipyyntöjen selvittäminen"],
      ["Asennukset & päivitykset"],
      ["Dokumentointi"],
    
    [],
    [pvm],
    [],
    [poikkeama],
    [],
    [selite],
  ]
    /*
    [
      startDay + "." + month,
      new Date().getDate() + 1 + "." + month,
      new Date().getDate() + 2 + "." + month,
      new Date().getDate() + 3 + "." + month,
      new Date().getDate() + 4 + "." + month,
    ],
    */

  const confirm = useConfirm();

  const handleExport = () => {
    writeToExcel(arrData, file + ".xlsx");
  };

  const handleChange = (event) => {
    console.log(
      "Component:",
      event.target.name + ", value:",
      event.target.value
    );
    if (event.target.name === "file") {
      setFile(event.target.value);
    } else if (event.target.name === "poikkeama") {
      setPoikkeama(event.target.value);
    }
    else if (event.target.name === "selite") {
      setSelite(event.target.value);
    }
  };

  const testServer = async () => {
    const response = await axios.get("http://localhost:3001/alive");
    console.log(response.data);
    setAlive(response.data);
  };

  const onDialogClosed = () => {
    setAlive("");
  };

  const handleChangeDate = (date) => {
    const newDate = moment().format("MM/DD/YYYY");
    console.log("tanaan: ", newDate);
    setPVM(newDate);
  };

  return (
    <div className="App">
      <h1 className="App-title">Ylityö kirjaus systeemi</h1>

      <form className="App-form">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker label="PVM" onChange={handleChangeDate} />
        </LocalizationProvider>

        <TextField
          id="outlined-basic"
          label="Poikkeama tunnit"
          variant="outlined"
          value={poikkeama}
          name="poikkeama"
          onChange={handleChange}
        />

<TextField
          id="outlined-basic"
          label="Selite"
          variant="outlined"
          value={selite}
          name="selite"
          multiline
          maxRows={5}
          onChange={handleChange}
        />



        <TextField
          id="outlined-basic"
          label="File"
          variant="outlined"
          name="file"
          value={'Vk ' + wkNumber + '-' + pvm + '-poikkeama'} 
          onChange={handleChange}
        />

        <div className="App-button">
          <Button onClick={handleExport}>Vie exceliin</Button>
          <Button onClick={testServer}>Server - test</Button>
        </div>
      </form>
      {alive && (
        <ConfirmationDialog
          data={alive}
          title="Alive"
          onClose={() => onDialogClosed()}
        />
      )}
    </div>
  );
}

export default App;
