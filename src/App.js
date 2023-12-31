// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ExcelReader from "./ExcelReader";

import { useWk } from "./hooks/utils";
import "./App.css";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button, TextField, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";

import { useConfirm } from "material-ui-confirm";
import ConfirmationDialog from "./ConfirmationDialog";
import MuiTable from "./MuiTable";

function App() {
  /*<ExcelReader />*/

  let file = "";
  const [readToggle, setReadToggle] = useState(false);
  const [pvm, setPVM] = useState("");
  const [saldo, setSaldo] = useState(0);
  const [poikkeama, setPoikkeama] = useState(0);
  const [selite, setSelite] = useState("");
  const [alive, setAlive] = useState("");
  const [rekisteri, setRekisteri] = useState([]);
  const startDay = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const wkNumber = useWk();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3001/api/getSaldo", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("response: ", response);
          if (response.status !== 200) {
            throw new Error(`getSaldo response ${response.status}`);
          }
          if (!response.data) {
            response.data = 0;
          }
          setSaldo(parseInt(response.data));
        });
    } catch (err) {
      console.error(`getSaldo error ${err.response} ${err.message}`);
    }
  }, []);

  useEffect(() => {
    try {
      axios.get("http://localhost:3001/api/getData").then((response) => {
        if (response.status !== 200) {
          throw new Error(`getData response ${response.status}`);
        }
        setRekisteri(response.data);
      });
    } catch (err) {
      console.error(`getData catch error ${err.message}`);
    }
  }, [readToggle]);

  /*
  const arrData = [
    [],
    [],
    ["Raportointi päivämäärä: " + pvm],
    [],
    ["Työpäivän poikkeama: " + poikkeama],
    [],
    ["Työtehtävät, selite poikeamalle: " + selite],
  ];
  */

  const confirm = useConfirm();

  console.log("saldo: ", saldo + ", poikkeama: ", poikkeama)
  const newSaldo = parseInt(saldo) + parseInt(poikkeama);
  console.log("Uusi saldo: ", newSaldo)

  const data = {
    pvm,
    poikkeama,
    newSaldo,
    selite,
  };

  const handleDb = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/addDate",
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status !== 201) {
        throw new Error("Network response was not ok");
      }
      console.log(response);
    } catch (err) {
      console.log("db post requesti meni aivan vituiksi. Err: ", err);
    }
  };

  const handleChange = (event) => {
    console.log(
      "Component:",
      event.target.name + ", value:",
      event.target.value
    );

    if (event.target.name === "poikkeama") {
      setPoikkeama(parseInt(event.target.value));
    } else if (event.target.name === "selite") {
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

  const showRecordsToggle = () => {
    console.log("readToggle arvo = ", readToggle);
    setReadToggle(!readToggle);
    console.log("readToggle arvo = ", readToggle);
  };

  rekisteri.map((y) => console.log("rekkari: ", y.id));

  //Child component MuiTable delete functions use this.
  const reloadRows = (id) => {
    console.log(
      "Update rows by filterin id and resetting new array to the state. ",
      id
    );
    const idToBeRemoved = rekisteri.find((item) => item.id === id);

    if (idToBeRemoved) {
      const uusiRekkari = rekisteri.filter((item) => item !== id);
      console.log("Resetting rekkari array");
      setRekisteri(uusiRekkari);
      setReadToggle(true);
    } else {
      console.log("Taulussa ei ollut poistettavaa id:eetä");
    }
  };
  return (
    <>
      <div className="App">
        {!readToggle && <h1 className="App-title">Ylityö kirjaus systeemi</h1>}
        {!readToggle &&<h5>Listaus tietokannassa olevista päivittäisistä yli / ali tunneista. </h5>}
        {!readToggle && (
          <form className="App-form">
            <h3>Nyt saldo tunteja: {saldo}</h3>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                sx={{ width: 160 }}
                label="PVM"
                onChange={handleChangeDate}
                value={moment()}
              />
            </LocalizationProvider>

            <TextField
              sx={{ width: 60 }}
              id="outlined-basic"
              label="Poikkeama tunnit"
              variant="outlined"
              value={parseInt(poikkeama)}
              name="poikkeama"
              onChange={handleChange}
            />

            <TextField
              id="outlined-basic"
              label="Selite"
              variant="outlined"
              value="Support"
              name="selite"
              multiline
              maxRows={5}
              onChange={handleChange}
            />

            <div className="App-button">
              <Button onClick={handleDb}>Tallenna kantaan</Button>
              <Button onClick={showRecordsToggle}>Näytä recordit</Button>
              <Button onClick={testServer}>Serverin Alive - Test</Button>
            </div>
          </form>
        )}

        {alive && (
          <ConfirmationDialog
            data={alive}
            title="Alive"
            onClose={() => onDialogClosed()}
          />
        )}
      </div>
      {readToggle &&  rekisteri.length > 1 && (
        <MuiTable getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'} rows={rekisteri} refreshRows={reloadRows} />
      )}
    </>
  );
}

export default App;
