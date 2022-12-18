import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function DialogPs({ setUserPassword, checkValidPassword }) {
  return (
    <Dialog open>
      <DialogTitle>Survey for authorized users only</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To answer this survey, please enter password.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={checkValidPassword}>enter</Button>
      </DialogActions>
    </Dialog>
  );
}
