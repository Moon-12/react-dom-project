import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CardMedia from "@mui/material/CardMedia";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40em",
  p: 4,
};

const ImagePopup = ({ open, handleModal, imageURL }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CardMedia sx={{ height: "40em", width: "40em" }} image={imageURL} />
        </Box>
      </Modal>
    </div>
  );
};

export default ImagePopup;
