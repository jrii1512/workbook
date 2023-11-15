import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";


const ConfirmationDialog = (props) => {
  const {data, title, onClose} = props;
  
  return (
    <Dialog open={true}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <Typography>{data}</Typography>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
