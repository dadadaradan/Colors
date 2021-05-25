import React from "react";
import { withStyles } from "@material-ui/core";

const styles = {
  PaletteFooter: {
    height: "5vh",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: "0 1rem 0.1rem",
  },
};

function PaletteFooter(props) {
  const { paletteName, emoji, classes } = props;
  return (
    <footer className={classes.PaletteFooter}>
      {paletteName} {emoji}
    </footer>
  );
}

export default withStyles(styles)(PaletteFooter);
