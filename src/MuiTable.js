import * as React from "react";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";

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
  const { rows } = props;

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

  const deleteRow = (params) => {
    console.log(params.id);
  };

  const handleSelectionModelChange = (selectionModel) => {
    console.log("handleSelectionModel");
    // 'selectionModel' is an array of selected row IDs
    setSelectedRows(selectionModel);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
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

        autoHeight={true}
        onRowClick={(params) => deleteRow(params)}
      />
    </div>
  );
}
