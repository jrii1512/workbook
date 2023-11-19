import * as React from "react";
import axios from "axios";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import ConfirmationDialog from "./ConfirmationDialog";
import writeToExcel from "./WriteToExcel";
import { useWk } from "./hooks/utils";
import { Button } from "@mui/material";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    valueGetter: (params) => `${params.row.id}`,
  },
  { field: "pvm", headerName: "PVM", width: 100, sortable: true },
  { field: "poikkeama", headerName: "Poikkeama", width: 100 },
  { field: "saldo", headerName: "Saldo", width: 100 },
  { field: "selite", headerName: "Selite", width: 400 },
];

export default function DataTable(props) {
  console.log("props: ", props);
  const dataGridRef = React.useRef();
  const { rows } = props;
  const [reload, setReload] = React.useState(false);
  const wkNumber = useWk();
  const [tuho, setTuho] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const getCellValue = React.useCallback((params) => {
    // Access the value of the cell using the field name
    console.log("id = ", params.id);
    return params.getValue(params.id, params.id);
  }, []);

  const apiRef = useGridApiRef();

  const onRowEditCommit = (id, event) => {
    console.log("onRowEditCommit");
    const rowid = apiRef.getRow();
    console.log("rivi:", rowid);
  };

  const handleExport = () => {
    let newRows = [];
    //newRows.push(rows);
    //console.log("Excel rows:", newRows);
    let paiva = new Date().getDate();
    let file = "Vk " + wkNumber + "-" + paiva + "-poikkeama";
    writeToExcel(rows, file + ".xlsx");
  };

  const deleteRow = async (params) => {
    console.log("Delete row funkkari, tuhottava id ", params.id);
    if (window.confirm(`Recordi ${params.id} tuhotaan, really?`)) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/delete/${params.id}`
        );
        if (response.status === 201) {
          console.log(`Record ${params.id} tuhottu`);
          props.refreshRows(params.id);
          setTuho(true);

          //window.location.reload(true);
          //dataGridRef.current.api.forceUpdate();
        } else {
          console.log("Recordin tuhoaminen epäonnistui");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onDialogClose = () => {
    setTuho(false);
  };

  const handleSelectionModelChange = (selectionModel) => {
    console.log("handleSelectionModel");
    // 'selectionModel' is an array of selected row IDs
    setSelectedRows(selectionModel);
  };

  return (
    <div
      style={{
        height: 400,
        width: 800,
        display: "flex",
        justifyContent: "center",
        alignitems: "center",
      }}
    >
      <DataGrid
        sx={{ m: 2 }}
        rows={rows}
        columns={columns}
        autoHeight={true}
        //apiRef
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        //editable={true}
        //editMode="row"
        onRowClick={(params) => deleteRow(params)}
      />
      {rows.length > 1 && (
        <Button
          style={{ marginTop: 500, marginLeft: -100 }}
          onClick={handleExport}
        >
          Vie exceliin
        </Button>
      )}
      {tuho && (
        <ConfirmationDialog
          data="Recordi tuhottu"
          title="Tuho"
          onClose={() => onDialogClose()}
        />
      )}
    </div>
  );
}
