import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

export default function Modal(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.openModal}
        onClose={props.toggleModal}
        aria-labelledby="responsive-dialog-title"
        scroll='body'
      >
        <DialogTitle id="responsive-dialog-title">
          {props.dialogTitle}
        </DialogTitle>
        <DialogContent dividers={true}>
          {props.bodyContent()}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.toggleModal} color="primary">
            Cancel
          </Button>
          <Button onClick={props.toggleModal} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
