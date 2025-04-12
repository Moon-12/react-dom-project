import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const MyResume = () => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Download Resume"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Would you like to download the resume?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <a
            href={`https://firebasestorage.googleapis.com/v0/b/ashwija-nayak.appspot.com/o/assets%2FAshwija%20Nayak%20Resume.pdf?alt=media&token=${process.env.REACT_APP_RESUME_TOKEN}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </a>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default MyResume;
