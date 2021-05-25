import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

function ModalForm(props) {
  const [open, setOpen] = useState(false);
  const [newPaletteName, setNewPaletteName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (evt) => {
    setNewPaletteName(evt.target.value);
  };

  const handleSubmit = () => {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
    };
    props.handleSubmit(newPalette);
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("uniquePaletteName", () =>
      props.palettes.every(({ paletteName }) => paletteName !== newPaletteName)
    );
  });

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Save
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Save Pallette</DialogTitle>
        <ValidatorForm onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Please Choose a unique name for your beautiful pallette and save
              it for future use.
            </DialogContentText>
            <TextValidator
              label="Enter your Palette Name"
              fullWidth
              onChange={handleChange}
              name="newPaletteName"
              value={newPaletteName}
              validators={["required", "uniquePaletteName"]}
              errorMessages={[
                "This field is required",
                "Palette name must be unique",
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}

export default ModalForm;
